import React from "react";

const technologies = [
  { name: "Sage", logo: "/assets/images/placeholder-sage.png" },
  { name: "QuickBooks", logo: "/assets/images/placeholder-quickbooks.png" },
  { name: "Xero", logo: "/assets/images/placeholder-xero.png" },
  {
    name: "Accounting Power",
    logo: "/assets/images/placeholder-accountingpower.png",
  },
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
            <img
              src={tech.logo}
              alt={tech.name + " logo"}
              className="h-10 mb-2 object-contain opacity-60"
              style={{ filter: "grayscale(1)" }}
            />
            <span className="text-gray-400 text-lg font-semibold">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
