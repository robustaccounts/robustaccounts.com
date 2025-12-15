"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/layout-constants";
import usePrefersReducedMotion from "@/lib/hooks/use-prefers-reduced-motion";


// Icons for each stat
const StatIcons = {
  "Clients Served": (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="24" cy="16" r="8" />
      <path d="M12 40c0-8 6-12 12-12s12 4 12 12" strokeLinecap="round" />
    </svg>
  ),
  "Retention Rate": (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="24" cy="24" r="18" />
      <path d="M24 12V24L32 28" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Response Time": (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="24" cy="24" r="18" />
      <path d="M24 12V24L32 28" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 12L40 8M40 8L44 12M40 8V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Years Experience": (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="8" y="16" width="32" height="24" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 16L24 8L40 16" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="28" width="6" height="12" />
      <rect x="28" y="24" width="6" height="8" />
    </svg>
  ),
};

const StatsSection = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const container = sectionRef.current;
    if (!container) return;

    const counters = container.querySelectorAll<HTMLElement>(".stat-number");

    if (prefersReducedMotion) {
      counters.forEach((counter) => {
        counter.textContent = counter.dataset.target ?? "0";
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 95%",
        end: "bottom center",
        toggleActions: "play none none none",
        once: true,
      },
    });

    tl.from(".stat-item", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power3.out",
    });

    // Counter Animation
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.dataset.target || "0", 10);
      const proxy = { value: 0 };

      gsap.to(proxy, {
        value: target,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 95%",
          once: true,
        },
        onUpdate: () => {
          counter.textContent = Math.round(proxy.value).toString();
        },
      });
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-white text-theme-black">
      <div className="cust-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((stat, index) => (
            <div 
              key={index} 
              className="stat-item bg-white border border-gray-200 p-6 lg:p-8 flex flex-col"
            >
              {/* Icon */}
              <div className="text-primary mb-8">
                {StatIcons[stat.label as keyof typeof StatIcons]}
              </div>
              
              {/* Number */}
              <div className="flex items-baseline mb-2">
                <span 
                  className="stat-number text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-theme-black"
                  data-target={stat.number}
                >
                  0
                </span>
                <span className="text-3xl md:text-4xl lg:text-5xl font-light text-theme-black">{stat.suffix}</span>
              </div>
              
              {/* Label */}
              <p className="text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
