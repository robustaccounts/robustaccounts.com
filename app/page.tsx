import React from "react";

import FAQSection from "@/components/home/faq-section";
import HeroSection from "@/components/home/hero-section";
import ServicesSection from "@/components/home/services-section";
import WhyChooseUsSection from "@/components/home/why-choose-us-section";
import TestimonialsSection from "@/components/pricing/testimonials-section";
import ProcessStepsSection from "@/components/home/process-steps-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessStepsSection />
      <FAQSection />
      <TestimonialsSection />
    </main>
  );
}
