// /marketplace/products/page.js
"use client";

import { useSearchParams } from "next/navigation";

export default function SearchQ() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  // Example rendering based on query
  return (
   query
  );
}
