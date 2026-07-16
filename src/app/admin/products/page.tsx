import React from "react";
import { getProductsAdmin } from "@/app/actions/products";
import ProductsPageClient from "./ProductsPageClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const result = await getProductsAdmin();
  const products = result.success ? result.products || [] : [];

  return <ProductsPageClient initialProducts={products} />;
}
