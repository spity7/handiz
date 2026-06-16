const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "";

export function buildDashboardAuthUrl(path: string, returnUrl?: string) {
  const base = `${dashboardUrl}${path}`;

  if (!returnUrl) return base;

  return `${base}?redirectTo=${encodeURIComponent(returnUrl)}`;
}

export function getCurrentReturnUrl() {
  if (typeof window === "undefined") return undefined;
  return window.location.href;
}
