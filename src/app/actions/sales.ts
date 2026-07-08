"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

// ==========================================
// 1. DASHBOARD ANALYTICS ACTIONS
// ==========================================

export async function getDashboardStats() {
  try {
    // Total Revenue (Total amount of confirmed/processing/delivered orders)
    const orders = await prisma.order.findMany({
      where: {
        status: { notIn: ["CANCELLED"] },
      },
      select: {
        totalAmount: true,
        paymentStatus: true,
      },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const paidRevenue = orders
      .filter((o) => o.paymentStatus === "PAID")
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const totalOrdersCount = orders.length;

    // Customers stats
    const totalCustomers = await prisma.customer.count();
    const activeCustomers = await prisma.customer.count({
      where: { status: "ACTIVE" },
    });
    const leadsCount = await prisma.customer.count({
      where: { status: "LEAD" },
    });

    // Recent Orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { orderDate: "desc" },
      include: {
        customer: true,
      },
    });

    // Customer Type Distribution (SPA, HOTEL, VILLA, RESTO)
    const customers = await prisma.customer.findMany({
      select: { type: true },
    });
    
    const typeDistribution = customers.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      success: true,
      stats: {
        totalRevenue,
        paidRevenue,
        totalOrdersCount,
        totalCustomers,
        activeCustomers,
        leadsCount,
        recentOrders,
        typeDistribution,
      },
    };
  } catch (error: any) {
    console.error("Failed to fetch dashboard stats:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// 2. CUSTOMER ACTIONS
// ==========================================

export async function getCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { name: "asc" },
      include: {
        orders: true,
      },
    });
    return { success: true, customers };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createCustomer(data: {
  name: string;
  type: string;
  picName: string;
  whatsappNumber: string;
  email?: string;
  address: string;
  status: string;
}) {
  try {
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        type: data.type.toUpperCase(),
        picName: data.picName,
        whatsappNumber: data.whatsappNumber,
        email: data.email,
        address: data.address,
        status: data.status.toUpperCase(),
      },
    });
    revalidatePath("/admin/customers");
    return { success: true, customer };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCustomerStatus(id: string, status: string) {
  try {
    const customer = await prisma.customer.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });
    revalidatePath("/admin/customers");
    return { success: true, customer };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// 3. PRODUCT ACTIONS
// ==========================================

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { size: "asc" },
    });
    return { success: true, products };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createProduct(data: {
  name: string;
  sku: string;
  size: string;
  basePrice: number;
  stock: number;
}) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        size: data.size,
        basePrice: data.basePrice,
        stock: data.stock,
      },
    });
    revalidatePath("/admin");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// 4. ORDER ACTIONS
// ==========================================

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { orderDate: "desc" },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
          },
        },
        payments: true,
        shipments: true,
      },
    });
    return { success: true, orders };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createOrder(data: {
  customerId: string;
  items: { productId: string; quantity: number; unitPrice: number }[];
  notes?: string;
}) {
  try {
    // Generate Invoice Number (Format: INV-YYYYMMDD-XXXX)
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const countToday = await prisma.order.count({
      where: {
        invoiceNumber: {
          startsWith: `INV-${todayStr}-`,
        },
      },
    });
    const seqNum = String(countToday + 1).padStart(3, "0");
    const invoiceNumber = `INV-${todayStr}-${seqNum}`;

    // Calculate subtotal and verify stock
    let totalAmount = 0;
    const itemsData: { productId: string; quantity: number; unitPrice: number; subtotal: number }[] = [];

    for (const item of data.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name} (Available: ${product.stock}, Ordered: ${item.quantity})`);
      }

      const subtotal = item.quantity * item.unitPrice;
      totalAmount += subtotal;

      itemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal,
      });
    }

    // Run in transaction to reduce stock and create order
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const newOrder = await tx.order.create({
        data: {
          invoiceNumber,
          customerId: data.customerId,
          status: "PENDING",
          totalAmount,
          paymentStatus: "UNPAID",
          notes: data.notes,
          orderItems: {
            create: itemsData,
          },
        },
      });

      // 2. Decrement stocks
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    revalidatePath("/admin/orders");
    return { success: true, order };
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return { success: false, error: error.message };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: status.toUpperCase() },
    });
    revalidatePath("/admin/orders");
    return { success: true, order };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addPayment(data: {
  orderId: string;
  amount: number;
  paymentMethod: string;
  proofPath?: string;
}) {
  try {
    const payment = await prisma.payment.create({
      data: {
        orderId: data.orderId,
        amount: data.amount,
        paymentMethod: data.paymentMethod.toUpperCase(),
        proofPath: data.proofPath,
      },
    });

    // Update order payment status
    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
      include: { payments: true },
    });

    if (order) {
      const totalPaid = order.payments.reduce((sum, p) => sum + p.amount, 0);
      let paymentStatus = "UNPAID";
      
      if (totalPaid >= order.totalAmount) {
        paymentStatus = "PAID";
      } else if (totalPaid > 0) {
        paymentStatus = "PARTIAL";
      }

      await prisma.order.update({
        where: { id: data.orderId },
        data: { paymentStatus },
      });
    }

    revalidatePath("/admin/orders");
    return { success: true, payment };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addShipment(data: {
  orderId: string;
  courierName?: string;
  trackingNumber?: string;
}) {
  try {
    const shipment = await prisma.shipment.create({
      data: {
        orderId: data.orderId,
        courierName: data.courierName,
        trackingNumber: data.trackingNumber,
        deliveryStatus: "IN_TRANSIT",
      },
    });

    // Update order status to SHIPPED
    await prisma.order.update({
      where: { id: data.orderId },
      data: { status: "SHIPPED" },
    });

    revalidatePath("/admin/orders");
    return { success: true, shipment };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
