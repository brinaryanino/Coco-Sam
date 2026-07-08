import React from "react";
import { getCustomers } from "@/app/actions/sales";
import CustomersPageClient from "./CustomersPageClient";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const result = await getCustomers();
  const customers = result.success ? result.customers || [] : [];

  return <CustomersPageClient initialCustomers={customers} />;
}
