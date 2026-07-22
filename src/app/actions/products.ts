"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

// Verify and create storage bucket in Supabase via database SQL execution
export async function verifyStorageBucket() {
  try {
    await prisma.$executeRawUnsafe(`
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES (
        'product-images', 
        'product-images', 
        true, 
        5242880, 
        '{"image/jpeg","image/png","image/gif","image/webp","image/svg+xml"}'
      )
      ON CONFLICT (id) DO NOTHING;
    `);
    return { success: true };
  } catch (error: any) {
    console.error("verifyStorageBucket error:", error);
    return { success: false, error: error.message };
  }
}

// Upload a product image (base64) directly to Supabase Storage using service role key
export async function uploadProductImage(
  fileName: string,
  base64Data: string,
  mimeType: string
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        "Kredensial Supabase tidak lengkap. Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY dikonfigurasi di file .env."
      );
    }

    // Ensure storage bucket is created
    await verifyStorageBucket();

    // Clean base64 prefix if present
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const fileBuffer = Buffer.from(cleanBase64, "base64");
    
    // Clean filename to prevent path injection
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}_${cleanFileName}`;

    const uploadUrl = `${supabaseUrl}/storage/v1/object/product-images/${uniqueFileName}`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`,
        apikey: supabaseServiceKey,
        "Content-Type": mimeType,
        "x-upsert": "true",
      },
      body: fileBuffer,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Gagal mengunggah gambar ke Supabase Storage."
      );
    }

    // Public URL to access the image
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${uniqueFileName}`;
    return { success: true, publicUrl };
  } catch (error: any) {
    console.error("uploadProductImage error:", error);
    return { success: false, error: error.message };
  }
}

// CRUD: Get all products
export async function getProductsAdmin(category?: string) {
  try {
    const whereClause = category && category !== "ALL" ? { category } : {};
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
    return { success: true, products };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// CRUD: Create a new product
export async function createProductAdmin(data: {
  name: string;
  sku: string;
  size: string;
  basePrice: number;
  stock: number;
  category: string;
  imageUrl?: string;
}) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        size: data.size,
        basePrice: data.basePrice,
        stock: data.stock,
        category: data.category,
        imageUrl: data.imageUrl || null,
      },
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, product };
  } catch (error: any) {
    console.error("createProductAdmin error:", error);
    return { success: false, error: error.message };
  }
}

// CRUD: Update an existing product
export async function updateProductAdmin(
  id: string,
  data: {
    name: string;
    sku: string;
    size: string;
    basePrice: number;
    stock: number;
    category: string;
    imageUrl?: string;
  }
) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        sku: data.sku,
        size: data.size,
        basePrice: data.basePrice,
        stock: data.stock,
        category: data.category,
        imageUrl: data.imageUrl !== undefined ? data.imageUrl : undefined,
      },
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, product };
  } catch (error: any) {
    console.error("updateProductAdmin error:", error);
    return { success: false, error: error.message };
  }
}

// CRUD: Delete a product
export async function deleteProductAdmin(id: string) {
  try {
    const product = await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, product };
  } catch (error: any) {
    console.error("deleteProductAdmin error:", error);
    return { success: false, error: error.message };
  }
}

// Fetch stats for the landing page counter
export async function getLandingStats() {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    const dbActiveMitra = await prisma.customer.count({
      where: { status: "ACTIVE" },
    });

    const sumResult = await prisma.orderItem.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        order: {
          status: { notIn: ["CANCELLED"] },
        },
      },
    });

    const dbTotalSold = sumResult._sum.quantity || 0;

    const activeMitra = settingsMap["stats_mitra_count"]
      ? parseInt(settingsMap["stats_mitra_count"], 10)
      : 42 + dbActiveMitra;

    const totalSold = settingsMap["stats_sold_count"]
      ? parseInt(settingsMap["stats_sold_count"], 10)
      : 1420 + dbTotalSold;

    const satisfactionRate = settingsMap["stats_satisfaction"] || "99.4%";
    const productionCapacity = settingsMap["stats_capacity"] || "5.000 L / bln";

    return {
      success: true,
      activeMitra,
      totalSold,
      satisfactionRate,
      productionCapacity,
    };
  } catch (error: any) {
    console.error("getLandingStats error:", error);
    return {
      success: false,
      activeMitra: 42,
      totalSold: 1420,
      satisfactionRate: "99.4%",
      productionCapacity: "5.000 L / bln",
    };
  }
}

export async function updateSiteStats(data: {
  mitraCount: string;
  soldCount: string;
  satisfactionRate: string;
  productionCapacity: string;
}) {
  try {
    const items = [
      { key: "stats_mitra_count", value: data.mitraCount },
      { key: "stats_sold_count", value: data.soldCount },
      { key: "stats_satisfaction", value: data.satisfactionRate },
      { key: "stats_capacity", value: data.productionCapacity },
    ];

    for (const item of items) {
      await prisma.setting.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: { key: item.key, value: item.value },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("updateSiteStats error:", error);
    return { success: false, error: error.message };
  }
}

export async function getSiteStatsSettings() {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return {
      success: true,
      data: {
        mitraCount: settingsMap["stats_mitra_count"] || "42",
        soldCount: settingsMap["stats_sold_count"] || "1420",
        satisfactionRate: settingsMap["stats_satisfaction"] || "99.4%",
        productionCapacity: settingsMap["stats_capacity"] || "5.000 L / bln",
      },
    };
  } catch (error: any) {
    return {
      success: false,
      data: {
        mitraCount: "42",
        soldCount: "1420",
        satisfactionRate: "99.4%",
        productionCapacity: "5.000 L / bln",
      },
    };
  }
}
