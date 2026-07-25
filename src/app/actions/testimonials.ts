"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

const initialTestimonials = [
  {
    category: "MITRA",
    categoryLabel: "Mitra Bisnis",
    author: "Matcha Spa Kuta",
    role: "Mitra Bisnis B2B",
    quote: "Kami membeli produk Cocosam ini untuk dijual kembali. Kualitas produknya konsisten, kemasan bagus, dan respon penjual sangat baik. Semoga kualitasnya selalu terjaga.✨✨",
    highlight: false,
  },
  {
    category: "MITRA",
    categoryLabel: "Mitra Bisnis",
    author: "Nusa Tenggara for Nusantara Foundation",
    role: "Yayasan / Mitra Kerjasama",
    quote: "Cocosam memberikan pelayanan kerja sama yang ramah dan nyaman. Great product!\n\nSaya selalu tertarik dengan produk lokal. Produk yang bahan bakunya berasal dari daerah sendiri, diolah oleh masyarakat lokal, dan turut memberdayakan komunitas di sekitarnya. CocoSam adalah salah satunya. Keren banget!\n\nSelain berkualitas, CocoSam juga bisa menjadi pilihan hadiah atau oleh-oleh yang berkesan untuk membawa sedikit cerita tentang Lombok. Saya sudah beberapa kali menghadiahkan produk CocoSam kepada teman-teman dari luar negeri, dan mereka semua suka. Bravo, CocoSam! 👏",
    highlight: true,
  },
  {
    category: "KONSUMEN",
    categoryLabel: "Konsumen",
    author: "Ayu",
    role: "Konsumen Setia",
    quote: "Setelah saya rutin pakai VCO dari CocoSam, rambut saya jadi tidak rontok banget lagi.",
    highlight: false,
  },
  {
    category: "KONSUMEN",
    categoryLabel: "Konsumen",
    author: "Esti",
    role: "Konsumen Setia",
    quote: "Karena saya rutin pakai VCO CocoSam rambut saya jadi jauh lebih lembut dan tebal.",
    highlight: false,
  },
  {
    category: "KONSUMEN",
    categoryLabel: "Konsumen",
    author: "Zakuan",
    role: "Konsumen Setia",
    quote: "Review jujur, ini botol ke-3 VCO CocoSam yang telah saya pakai. Saya biasa pakai untuk sunscreen wajah atau kumur. Manfaatnya melembabkan kulit dan menyehatkan. Saya akan tetap berlangganan dengan VCO CocoSam 👍🏻",
    highlight: false,
  },
];

export async function getTestimonialsList() {
  try {
    let list = await prisma.testimonial.findMany({
      orderBy: { createdAt: "asc" },
    });

    if (list.length === 0) {
      // Seed default testimonials if empty
      for (const item of initialTestimonials) {
        await prisma.testimonial.create({ data: item });
      }
      list = await prisma.testimonial.findMany({
        orderBy: { createdAt: "asc" },
      });
    }

    return { success: true, data: list };
  } catch (error: any) {
    console.error("getTestimonialsList error:", error);
    return { success: false, data: [] };
  }
}

export async function createTestimonialAction(data: {
  category: string;
  categoryLabel: string;
  author: string;
  role: string;
  quote: string;
  highlight?: boolean;
}) {
  try {
    await prisma.testimonial.create({
      data: {
        category: data.category,
        categoryLabel: data.categoryLabel || (data.category === "MITRA" ? "Mitra Bisnis" : "Konsumen"),
        author: data.author,
        role: data.role,
        quote: data.quote,
        highlight: data.highlight || false,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error: any) {
    console.error("createTestimonialAction error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTestimonialAction(
  id: string,
  data: {
    category: string;
    categoryLabel: string;
    author: string;
    role: string;
    quote: string;
    highlight?: boolean;
  }
) {
  try {
    await prisma.testimonial.update({
      where: { id },
      data: {
        category: data.category,
        categoryLabel: data.categoryLabel || (data.category === "MITRA" ? "Mitra Bisnis" : "Konsumen"),
        author: data.author,
        role: data.role,
        quote: data.quote,
        highlight: data.highlight || false,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error: any) {
    console.error("updateTestimonialAction error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTestimonialAction(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error: any) {
    console.error("deleteTestimonialAction error:", error);
    return { success: false, error: error.message };
  }
}
