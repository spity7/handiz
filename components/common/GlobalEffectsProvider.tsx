"use client";

import { useEffect } from "react";

export default function GlobalEffectsProvider() {
  // Load Bootstrap JS only once on client
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.esm").catch((err) =>
      console.error("Failed to load Bootstrap:", err)
    );
  }, []);

  return null;
}
