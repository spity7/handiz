"use client";

import { HomeProjectFiltersProvider } from "@/components/providers/HomeProjectFiltersProvider";
import { Suspense, type ReactNode } from "react";

export default function HomeProjectFiltersShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <HomeProjectFiltersProvider>{children}</HomeProjectFiltersProvider>
    </Suspense>
  );
}
