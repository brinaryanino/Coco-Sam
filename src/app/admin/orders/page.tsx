import React from "react";
import { getOrders, getCustomers, getProducts } from "@/app/actions/sales";
import OrdersPageClient from "./OrdersPageClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const [ordersRes, customersRes, productsRes] = await Promise.all([
    getOrders(),
    getCustomers(),
    getProducts(),
  ]);

  const orders = ordersRes.success ? ordersRes.orders || [] : [];
  const customers = customersRes.success ? customersRes.customers || [] : [];
  const products = productsRes.success ? productsRes.products || [] : [];

  return (
    <OrdersPageClient
      initialOrders={orders}
      customers={customers}
      products={products}
    />
  );
}
