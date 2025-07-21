import React from "react";

import { ArrowForward, Check } from "@/ui/icons/google-icons";
import Link from "@/ui/link";
import cn from "@/utils/cn";

const benefits = [
  {
    title: "Cost-Effective Solutions",
    description:
      "Reduce overhead costs by up to 60% with our scalable outsourcing services, tailored to your budget and business size.",
  },
  {
    title: "Expert Team",
    description:
      "Access a global team of certified public accountants and financial experts with 10+ years of experience.",
  },
  {
    title: "Time Savings",
    description:
      "Free up 40+ hours monthly to focus on core business activities while we handle your complete financial operations.",
  },
  {
    title: "Advanced Security",
    description:
      "Bank-grade security with end-to-end encryption, ensuring your financial data is protected at all times.",
  },
];

function WhyChooseUsCard({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <div className={cn("flex items-start gap-4")}>
      <div className="mt-1 flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-colors group-hover:bg-secondary/80">
          <Check className="h-6 w-6 fill-accent" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold sm:text-2xl text-white">
          {title}
        </h3>
        <p className="text-base leading-relaxed sm:text-lg text-gray-200">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 sm:px-8 md:px-16 lg:px-24 xl:py-32 overflow-hidden"
      )}
    >
      {/* Full-width Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/images/hero-section-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      {/* Overlay for better text contrast */}
      <div
        className="absolute inset-0 z-10 bg-black/70 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20 flex w-full max-w-6xl flex-col gap-16 lg:flex-row lg:items-center lg:justify-center">
        {/* Left: Heading and Description */}
        <div className="flex flex-col items-center lg:items-start justify-center gap-8 text-center lg:text-left sm:gap-10 w-full lg:w-1/2">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-white">
            Why Choose Our Accounting Services
          </h2>
          <p className="max-w-3xl text-lg sm:text-xl text-gray-200">
            Transform your financial operations with efficiency and expertise.
            Join hundreds of successful businesses who trust us.
          </p>
          <div className="flex flex-col items-center lg:items-start gap-8 mt-4 w-full">
            <p className="text-lg sm:text-xl text-gray-200">
              Ready to transform your business finances?
            </p>
            <Link
              href="/contact"
              className="flex transform cursor-pointer items-center justify-center gap-2 rounded-full bg-accent pl-1 pr-4 py-1 font-semibold text-white backdrop-blur-2xl transition-all hover:bg-accent/80 sm:w-auto"
            >
              <div className={cn("rounded-full bg-white p-3")}>
                <ArrowForward className="h-5 w-5 fill-accent" />
              </div>
              Get Started
            </Link>
          </div>
        </div>
        {/* Right: Benefits List */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 gap-10 lg:gap-12">
          {benefits.map((benefit, index) => (
            <WhyChooseUsCard
              key={index}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
