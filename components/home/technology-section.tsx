import React from "react";
import SageLogo from "@/ui/logo/sage";
import QuickBooksLogo from "@/ui/logo/intuit-quickbooks";
import XeroLogo from "@/ui/logo/xero";

const technologies = [
  { name: "Sage", component: SageLogo },
  { name: "QuickBooks", component: QuickBooksLogo },
  { name: "Xero", component: XeroLogo },
];

export default function TechnologySection() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-600">
        At the helm of latest technology.
      </h2>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center justify-center border rounded-lg bg-gray-50 px-10 py-6 min-w-[180px] min-h-[100px] shadow-sm"
          >
            <div className="mb-2 opacity-80" aria-hidden>
              <tech.component className="h-10 w-auto" />
            </div>
            <span className="text-gray-400 text-lg font-semibold">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
