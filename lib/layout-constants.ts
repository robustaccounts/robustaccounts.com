import type { MegaMenuItem, NavLink } from "./types";

/**
 * Main navigation links used in header
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
];

/**
 * Services mega-menu content (header dropdown)
 */
export const SERVICES_MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/services",
    description:
      "Full-service finance operations for growing businesses-bookkeeping, payroll, and advisory delivered by a dedicated team.",
    highlights: [
      "Monthly close + reconciliations",
      "Payroll processing + compliance",
      "Reporting + advisory to guide decisions",
    ],
  },
  {
    id: "bookkeeping",
    label: "Bookkeeping",
    href: "/services/bookkeeping",
    description:
      "Stay on top of your numbers with accurate transaction categorization, reconciliations, and monthly financial reporting.",
    highlights: [
      "Daily transaction categorization",
      "Monthly bank reconciliation",
      "Profit & Loss, Balance Sheet, Cash Flow",
    ],
  },
  {
    id: "payroll",
    label: "Payroll",
    href: "/services/payroll",
    description:
      "Reliable payroll processing with filings and compliance handled-so your team gets paid on time, every time.",
    highlights: [
      "On-time payroll runs + direct deposit",
      "Tax withholdings + filings",
      "Employee onboarding support",
    ],
  },
  {
    id: "financial-advisory",
    label: "Financial Advisory",
    href: "/services/financial-advisory",
    description:
      "CFO-style support for forecasting, budgeting, and reporting-turning financial data into clear, actionable insights.",
    highlights: [
      "Budgeting + cash flow forecasting",
      "Performance reporting + analysis",
      "Growth and profitability planning",
    ],
  },
];

/**
 * Stats for StatsSection
 */
export const STATS = [
  { number: 500, suffix: "+", label: "Clients Served" },
  { number: 98, suffix: "%", label: "Retention Rate" },
  { number: 24, suffix: "h", label: "Response Time" },
  { number: 15, suffix: "+", label: "Years Experience" },
];

/**
 * Footer quick links
 */
export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "Bookkeeping", href: "/services/bookkeeping" },
  { label: "Payroll", href: "/services/payroll" },
  { label: "Tax Services", href: "/services/tax" },
  { label: "CFO Services", href: "/services/cfo" },
  { label: "Pricing", href: "/pricing" },
];

/**
 * Footer legal links
 */
export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

/**
 * Contact information
 */
export const CONTACT_INFO = {
  phone: "+1 (555) 123-4567",
  email: "hello@robustaccounts.com",
  address: "123 Business Street, Suite 100, New York, NY 10001",
};

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/robustaccounts",
  twitter: "https://twitter.com/robustaccounts",
};

