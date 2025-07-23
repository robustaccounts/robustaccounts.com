import React from "react";

import { ArrowForward } from "@/ui/icons/google-icons";

import ScheduleMyCallButton from "@/components/ui/schedule-my-call-button";

const steps = [
  {
    step: "01",
    title: "Fill Out Form",
    description: "Tell us about your business and accounting needs",
  },
  {
    step: "02",
    title: "Free Consultation",
    description: "We analyze your requirements and discuss solutions",
  },
  {
    step: "03",
    title: "Custom Proposal",
    description: "Receive a tailored service package and pricing",
  },
  {
    step: "04",
    title: "Get Started",
    description: "Begin your accounting transformation journey",
  },
];

export default function ProcessStepsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get your accounting outsourced
            </p>
          </div>

          {/* Steps Grid */}
          <div className="relative mx-auto grid max-w-2xl grid-cols-2 grid-rows-2 gap-x-16 gap-y-16 md:gap-x-24 md:gap-y-20">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                {steps[0].step}
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                {steps[0].title}
              </h3>
              <p className="text-lg text-gray-600">{steps[0].description}</p>
              {/* Arrow to Step 2 (right) */}
              <div className="absolute top-1/2 right-[-44px] z-10 hidden md:block">
                <ArrowForward className="h-10 w-10 text-accent" />
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                {steps[1].step}
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                {steps[1].title}
              </h3>
              <p className="text-lg text-gray-600">{steps[1].description}</p>
              {/* Arrow to Step 3 (down) */}
              <div className="absolute left-1/2 bottom-[-44px] z-10 hidden md:block -translate-x-1/2">
                <ArrowForward className="h-10 w-10 text-accent rotate-90" />
              </div>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                {steps[3].step}
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                {steps[3].title}
              </h3>
              <p className="text-lg text-gray-600">{steps[3].description}</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                {steps[2].step}
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                {steps[2].title}
              </h3>
              <p className="text-lg text-gray-600">{steps[2].description}</p>
              {/* Arrow to Step 4 (left) */}
              <div className="absolute top-1/2 left-[-44px] z-10 hidden md:block -translate-y-1/2">
                <ArrowForward className="h-10 w-10 text-accent rotate-180" />
              </div>
            </div>
          </div>

          {/* Mobile Steps & CTA */}
          <div className="mt-16 md:hidden">
            <div className="relative flex flex-col gap-12">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step Circle */}
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white shadow-lg ring-4 ring-accent/10">
                    {item.step}
                  </div>
                  {/* Step Title */}
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  {/* Step Description */}
                  <p className="px-2 text-base text-gray-600">
                    {item.description}
                  </p>
                  {/* Arrow (mobile, below step, except last) */}
                  {index < steps.length - 1 && (
                    <div className="mt-6 mb-2 block">
                      <ArrowForward className="mx-auto h-6 w-6 rotate-90 text-accent" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* CTA Button */}
            <div className="mt-14 flex justify-center">
              <ScheduleMyCallButton size="lg" showSubtext={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
