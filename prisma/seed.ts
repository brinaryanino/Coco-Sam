import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up database...");
  await prisma.shipment.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.customer.deleteMany({});

  console.log("Seeding products...");
  const p100ml = await prisma.product.create({
    data: {
      name: "Virgin Coconut Oil (VCO)",
      sku: "VCO-100ML",
      size: "100ml",
      basePrice: 35000,
      stock: 150,
      category: "VCO",
    },
  });

  const p1l = await prisma.product.create({
    data: {
      name: "Virgin Coconut Oil (VCO)",
      sku: "VCO-1L",
      size: "1L",
      basePrice: 180000,
      stock: 50,
      category: "VCO",
    },
  });

  const p5l = await prisma.product.create({
    data: {
      name: "Virgin Coconut Oil (VCO)",
      sku: "VCO-5L",
      size: "5L",
      basePrice: 750000,
      stock: 20,
      category: "VCO",
    },
  });

  const p20l = await prisma.product.create({
    data: {
      name: "Virgin Coconut Oil (VCO)",
      sku: "VCO-20L",
      size: "20L",
      basePrice: 2800000,
      stock: 10,
      category: "VCO",
    },
  });

  console.log("Seeding customers...");
  const c1 = await prisma.customer.create({
    data: {
      name: "Lombok Oasis Wellness Spa",
      type: "SPA",
      picName: "Ni Wayan S.",
      whatsappNumber: "6285337280512",
      email: "spa@lombokoasis.com",
      address: "Jl. Raya Senggigi No. 12, Senggigi, Lombok",
      status: "ACTIVE",
    },
  });

  const c2 = await prisma.customer.create({
    data: {
      name: "Senggigi Sanctuary Villas",
      type: "VILLA",
      picName: "David Miller",
      whatsappNumber: "628190000001",
      email: "manager@senggigisanctuary.com",
      address: "Bukit Senggigi, Senggigi, Lombok",
      status: "ACTIVE",
    },
  });

  const c3 = await prisma.customer.create({
    data: {
      name: "The Green Garden Restaurant Kuta",
      type: "RESTO",
      picName: "Chef Gede",
      whatsappNumber: "628190000002",
      email: "contact@greengardenkuta.com",
      address: "Jl. Pariwisata Pantai Kuta, Kuta Lombok",
      status: "ACTIVE",
    },
  });

  const c4 = await prisma.customer.create({
    data: {
      name: "Sheraton Senggigi Beach Resort",
      type: "HOTEL",
      picName: "Putu Ari",
      whatsappNumber: "628190000003",
      email: "purchasing@sheratonsenggigi.com",
      address: "Jl. Raya Senggigi Km. 8, Senggigi, Lombok",
      status: "LEAD",
    },
  });

  console.log("Seeding orders...");
  // Order 1: Completed, Paid, Delivered (c1)
  const o1 = await prisma.order.create({
    data: {
      invoiceNumber: "INV-20260701-001",
      customerId: c1.id,
      orderDate: new Date("2026-07-01T10:00:00Z"),
      status: "DELIVERED",
      totalAmount: 1100000,
      paymentStatus: "PAID",
      notes: "Custom labeling: 'Oasis Spa Special Label'. Repack size: 100ml (10 pcs). Bulk size: 5L (1 pc).",
      orderItems: {
        create: [
          { productId: p100ml.id, quantity: 10, unitPrice: 35000, subtotal: 350000 },
          { productId: p5l.id, quantity: 1, unitPrice: 750000, subtotal: 750000 },
        ],
      },
    },
  });

  await prisma.payment.create({
    data: {
      orderId: o1.id,
      paymentDate: new Date("2026-07-01T11:00:00Z"),
      amount: 1100000,
      paymentMethod: "BANK_TRANSFER",
      proofPath: "/proofs/receipt-001.pdf",
    },
  });

  await prisma.shipment.create({
    data: {
      orderId: o1.id,
      shipmentDate: new Date("2026-07-02T09:00:00Z"),
      deliveryStatus: "DELIVERED",
      courierName: "Supir Internal (Pak Budi)",
      receivedBy: "Receptionist (Lia)",
    },
  });

  // Order 2: Processing, Partially Paid, Shipment Pending (c2)
  const o2 = await prisma.order.create({
    data: {
      invoiceNumber: "INV-20260706-001",
      customerId: c2.id,
      orderDate: new Date("2026-07-06T14:30:00Z"),
      status: "PROCESSING",
      totalAmount: 3500000,
      paymentStatus: "PARTIAL",
      notes: "DP 50% paid via bank transfer. Items: 1L (5 pcs), 5L (2 pcs), 100ml (30 pcs).",
      orderItems: {
        create: [
          { productId: p100ml.id, quantity: 30, unitPrice: 35000, subtotal: 1050000 },
          { productId: p1l.id, quantity: 5, unitPrice: 180000, subtotal: 900000 },
          { productId: p5l.id, quantity: 2, unitPrice: 775000, subtotal: 1550000 },
        ],
      },
    },
  });

  await prisma.payment.create({
    data: {
      orderId: o2.id,
      paymentDate: new Date("2026-07-06T15:00:00Z"),
      amount: 1750000,
      paymentMethod: "BANK_TRANSFER",
      proofPath: "/proofs/receipt-002.png",
    },
  });

  // Order 3: Pending, Unpaid (c3)
  await prisma.order.create({
    data: {
      invoiceNumber: "INV-20260708-001",
      customerId: c3.id,
      orderDate: new Date("2026-07-08T08:15:00Z"),
      status: "PENDING",
      totalAmount: 180000,
      paymentStatus: "UNPAID",
      notes: "Ordered 1L VCO for kitchen testing. COD preferred.",
      orderItems: {
        create: [
          { productId: p1l.id, quantity: 1, unitPrice: 180000, subtotal: 180000 },
        ],
      },
    },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
