import React from "react";
import { getTestimonialsList } from "@/app/actions/testimonials";
import TestimonialsPageClient from "./TestimonialsPageClient";

export const revalidate = 0;

export default async function TestimonialsAdminPage() {
  const result = await getTestimonialsList();
  return <TestimonialsPageClient initialData={result.data || []} />;
}
