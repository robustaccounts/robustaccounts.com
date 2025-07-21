"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

import { ArrowForward, Check } from "@/ui/icons/google-icons";
import cn from "@/utils/cn";
import SchedulingModal from "../scheduling-modal";

// Animation variants and speed matching the reference
const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parallax state
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Only update if the hero is in the viewport
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax factors for each layer
  const bgParallax = scrollY * 0.3;
  const overlayParallax = scrollY * 0.18;
  const contentParallax = scrollY * 0.08;
  const badgeParallax = scrollY * 0.13;
  const trustParallax = scrollY * 0.18;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden aspect-[16/9] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
      )}
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: "url('/assets/images/hero-section-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `translateY(${bgParallax}px) scale(1.08)`,
        }}
        aria-hidden="true"
      />
      {/* Parallax Overlay for better text contrast */}
      <motion.div
        className="absolute inset-0 z-10 bg-black/80 pointer-events-none will-change-transform"
        style={{
          transform: `translateY(${overlayParallax}px)`,
        }}
        aria-hidden="true"
      />
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative z-20 flex w-full flex-col items-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-0 md:px-12 lg:px-16 h-full justify-center will-change-transform"
        style={{
          transform: `translateY(-${contentParallax}px)`,
        }}
      >
        {/* Badge */}
        <motion.div
          variants={heroItem}
          className="mt-8 inline-flex w-max items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium backdrop-blur-sm bg-white/10 will-change-transform"
          style={{
            transform: `translateY(-${badgeParallax}px)`,
          }}
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="text-white">Trusted by Growing Businesses</span>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={heroItem}
          className="flex flex-col items-center justify-center space-y-6 text-center sm:space-y-8 max-w-4xl"
        >
          {/* Main Headline */}
          <motion.h1
            variants={heroItem}
            className="text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl text-white"
            transition={{ duration: 0.5 }}
          >
            Transform Your <span className="text-white">Business</span> with{" "}
            <span className="text-white">Expert Accounting</span> Solutions.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroItem}
            className="text-center text-base leading-relaxed sm:text-lg lg:text-xl text-gray-200"
            transition={{ duration: 0.5 }}
          >
            Save 40+ hours monthly and reduce costs by 60% with our
            comprehensive accounting outsourcing services. Focus on growth while
            we handle your finances.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroItem}
            className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6"
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={handleOpenModal}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white backdrop-blur-2xl transition-all hover:bg-accent/80 sm:w-auto"
                )}
              >
                <div className={cn("rounded-full bg-white p-1.5")}>
                  <ArrowForward className="h-5 w-5 fill-accent" />
                </div>
                <span className="text-base">Schedule My Free Consultation</span>
              </button>
              <p className="text-center text-sm text-gray-300 sm:text-left">
                No credit card required • 30-minute call
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={heroItem}
          className="flex flex-col items-center gap-4 px-4 py-12 will-change-transform"
          transition={{ duration: 0.5 }}
          style={{
            transform: `translateY(-${trustParallax}px)`,
          }}
        >
          <div className="flex items-center gap-x-4 text-sm text-gray-200">
            <Check className="h-4 w-4 fill-accent" />
            <span>No setup fees</span>
            <Check className="h-4 w-4 fill-accent" />
            <span>Cancel anytime</span>
            <Check className="h-4 w-4 fill-accent" />
            <span>24/7 support</span>
          </div>
        </motion.div>
      </motion.div>
      <SchedulingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
