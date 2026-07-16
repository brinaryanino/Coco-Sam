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
    const activeMitra = await prisma.customer.count({
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

    const totalSold = sumResult._sum.quantity || 0;

    return {
      success: true,
      activeMitra,
      totalSold,
    };
  } catch (error: any) {
    console.error("getLandingStats error:", error);
    return {
      success: false,
      activeMitra: 0,
      totalSold: 0,
    };
  }
}
