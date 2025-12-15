"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import usePrefersReducedMotion from "@/lib/hooks/use-prefers-reduced-motion";


const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    role: "CEO",
    quote:
      "The Professional plan has been perfect for our growing startup. The dedicated account manager and tax preparation services have saved us countless hours.",
  },
  {
    name: "Michael Chen",
    company: "Manufacturing Solutions",
    role: "CFO",
    quote:
      "The custom reporting and CFO advisory services have transformed how we make financial decisions. The ROI has been incredible.",
  },
  {
    name: "Lisa Rodriguez",
    company: "Local Retail Shop",
    role: "Owner",
    quote:
      "As a small business owner, I get everything I need at a price I can afford. The monthly reports are clear and helpful.",
  },
];

const TestimonialsSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      if (!quoteRef.current) return;

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    },
    { dependencies: [currentIndex, prefersReducedMotion] }
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white text-theme-black">
      <div className="cust-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Header */}
          <div>
            <span
              className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block"
              data-animate="fade-up"
            >
              Testimonials
            </span>
            <h2
              className="text-4xl md:text-5xl font-light text-theme-black leading-[1.1] tracking-tight mb-6"
              data-animate="fade-up"
            >
              What Our
              <br />
              Clients Say.
            </h2>
            <p
              className="text-base text-gray-600 max-w-md leading-relaxed"
              data-animate="fade-up"
            >
              See how our services have helped businesses like yours succeed.
            </p>

            {/* Navigation */}
            <div className="flex gap-2 mt-8" data-animate="fade-up">
              <button
                onClick={prevSlide}
                className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-6">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Quote */}
          <div className="flex items-center">
            <div ref={quoteRef} className="bg-theme-offwhite border border-gray-200 p-8 lg:p-12">
              {/* Quote Mark */}
              <div className="text-6xl lg:text-8xl text-primary/20 font-serif leading-none mb-6">
                "
              </div>

              {/* Quote Text */}
              <p className="text-lg lg:text-xl text-theme-black leading-relaxed mb-8">
                {current.quote}
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <p className="font-semibold text-theme-black">{current.name}</p>
                <p className="text-sm text-gray-600">
                  {current.role}, {current.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
