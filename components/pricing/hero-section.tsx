"use client";
import React from "react";

import PricingTiersSection from "./pricing-tiers-section";

export default function HeroSection() {
  return (
    <section className="relative flex h-full min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-12">
      <div className="container mx-auto flex h-auto w-full flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 lg:px-12 lg:py-16">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Simple, <span className="text-accent">Transparent</span> Pricing
          </h1>
          <p className="max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
            Choose the plan that fits your business needs. No hidden fees, no
            surprises. All plans include our core accounting services with
            transparent pricing you can count on.
          </p>
        </div>
      </div>
      <PricingTiersSection />
    </section>
  );
}
