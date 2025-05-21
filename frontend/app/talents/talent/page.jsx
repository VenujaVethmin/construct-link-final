import { Suspense } from "react";

import LoadingScreen from "@/components/LoadingScreen";
import TalentSearchPage from "@/components/TalentClinet";

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <TalentSearchPage />
    </Suspense>
  );
}
