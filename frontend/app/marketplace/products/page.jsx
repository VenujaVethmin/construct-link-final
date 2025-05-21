import { Suspense } from "react";

import LoadingScreen from "@/components/LoadingScreen";
import SearchPage from "@/components/ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SearchPage />
    </Suspense>
  );
}
