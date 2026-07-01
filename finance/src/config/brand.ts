// ============================================================
// BRAND CONFIGURATION — VGot You Finance
// Edit this file to white-label the product for any client.
// ============================================================

export const BRAND = {
  name: "VGot You Finance",
  shortName: "VYFL",
  tagline: "Intelligent Lending. Trusted Collections.",
  description:
    "Enterprise-grade loan management and financial ledger platform for microfinance institutions, NBFCs, and community lenders.",
  version: "2.0.0",
  buildYear: "2025",
  primaryColor: "#DC2626",
  primaryColorLight: "#FEF2F2",
  primaryColorDark: "#B91C1C",
  accentColor: "#0F172A",
  supportEmail: "support@vgotyoufinance.com",
  website: "https://vgotyoufinance.com",
  featureList: [
    "Multi-branch loan origination & EMI engine",
    "Real-time amortization schedule calculation",
    "RBAC with 5 role tiers & immutable audit trail",
    "Collateral & guarantor management",
    "Cash book, ledger & daily closing",
    "Offline-capable PWA — works without internet",
  ],
} as const;

export type BrandConfig = typeof BRAND;
