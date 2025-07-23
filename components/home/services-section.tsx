import React from "react";

import Accounts from "@/ui/icons/accounts";
import BusinessAdvisory from "@/ui/icons/business-advisory";
import FinancialAdvisory from "@/ui/icons/financial-advisory";
import Payroll from "@/ui/icons/payroll";
import Link from "@/ui/link";

import cn from "@/utils/cn";

import LearnMoreButton from "../common/learn-more-button";

const services = [
  {
    id: 1,
    icon: <Accounts className="h-6 w-6 fill-accent" />,
    title: "Bookkeeping & Accounting",
    description:
      "Comprehensive bookkeeping services including accounts payable/receivable, general ledger maintenance, and monthly financial statements.",
    features: [
      "Daily transaction recording",
      "Bank reconciliation",
      "Financial statements",
    ],
    href: "/services/bookkeeping",
  },
  {
    id: 2,
    icon: <Payroll className="h-6 w-6 fill-accent" />,
    title: "Payroll Management",
    description:
      "End-to-end payroll processing including employee payments, tax withholdings, and regulatory compliance reporting.",
    features: ["Employee payments", "Tax filings", "Compliance reporting"],
    href: "/services/payroll",
  },
  {
    id: 3,
    icon: <FinancialAdvisory className="h-6 w-6 fill-accent" />,
    title: "Financial Advisory",
    description:
      "Strategic financial insights and advisory services to support budgeting, forecasting, and long-term business growth.",
    features: ["Budget planning", "Cash flow analysis", "Growth strategies"],
    href: "/services/financial-advisory",
  },
  {
    id: 4,
    icon: <BusinessAdvisory className="h-6 w-6 fill-accent" />,
    title: "Business Advisory",
    description:
      "Strategic business consulting to help you make informed decisions and drive sustainable growth.",
    features: [
      "Strategic planning",
      "Performance analysis",
      "Growth consulting",
    ],
    href: "/services/business-advisory",
  },
];

function ServicesCard({
  title,
  description,
  className,
  href,
  icon,
}: Readonly<{
  title: string;
  description: string;
  className?: string;
  href: string;
  icon: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-secondary p-6 transition-all duration-300 sm:p-8",
        className
      )}
    >
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold sm:text-xl lg:text-2xl">
              {icon} {title}
            </h3>
          </div>
          <p className="text-sm sm:text-base lg:text-lg">{description}</p>
        </div>
        <LearnMoreButton href={href} />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      className={cn(
        "min-h-screen container mx-auto flex h-full w-full flex-col items-center justify-center gap-12 px-4 py-16 sm:px-6 md:px-12 lg:px-16 lg:py-24 xl:min-h-screen"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          Our Expert Accounting and Outsourcing Services
        </h2>
        <p className="text-base lg:text-lg">
          Tailored accounting solutions crafted to optimize your business
          operations with precision.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
        {services.map((service) => (
          <ServicesCard
            key={service.id}
            title={service.title}
            description={service.description}
            href={service.href}
            icon={service.icon}
          />
        ))}
      </div>

      {/* Simplified CTA Section */}
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-base text-gray-600 sm:text-lg">
          Ready to transform your business finances?
        </p>
        <Link
          href="/services"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-accent/80 sm:px-8 sm:text-lg"
        >
          Explore All Services
        </Link>
      </div>
    </section>
  );
}
