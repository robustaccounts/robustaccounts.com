"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { Close, Menu } from "@/ui/icons/google-icons";
import Link from "@/ui/link";
import Image from "next/image";
import cn from "@/utils/cn";

const mobileMenuLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Expertise", href: "/our-expertise" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

const menuVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: { opacity: 0, y: 16, transition: { duration: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22 },
  },
  exit: { opacity: 0, x: 24, transition: { duration: 0.12 } },
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-8 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-[100vw] -translate-x-1/2 transform rounded-full px-4 py-3 text-primary transition-all duration-300 md:container md:mx-auto md:w-full md:px-8 md:py-4",
          isScrolled ? "bg-white backdrop-blur-sm" : "bg-white"
        )}
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 justify-between"
            >
              <Image
                src="/assets/logo.png"
                alt="Robust Accounts Logo"
                width={48}
                height={48}
              />
              {/* <span className="text-lg font-bold sm:text-xl">
                  robustaccounts.com
                </span> */}
              <span className="text-xl font-bold sm:text-xl">
                Robust Accounts
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
              {[
                { name: "Services", href: "/services" },
                { name: "About", href: "/about" },
                {
                  name: "Our Expertise",
                  href: "/our-expertise",
                },
                { name: "How It Works", href: "/how-it-works" },
                { name: "Pricing", href: "/pricing" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium transition-all hover:text-primary/60"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <Link
              href="tel:+18133370109"
              className="text-lg font-semibold text-primary "
            >
              +1 (813) 337-0109
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors hover:text-primary/60 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <Close className="h-7 w-7 fill-primary transition-transform duration-200" />
              ) : (
                <Menu className="h-7 w-7 fill-primary transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-0 z-40 h-screen w-screen bg-secondary/95 p-4 backdrop-blur-sm lg:hidden"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-6 z-50 rounded-full bg-white/80 p-2 text-primary shadow-md transition hover:bg-white"
              aria-label="Close mobile menu"
            >
              <Close className="h-7 w-7 fill-primary" />
            </motion.button>
            {/* Header space */}
            <div className="h-24"></div>
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-1 flex-col px-4"
            >
              <nav className="flex w-full flex-col gap-1">
                {mobileMenuLinks.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className="flex w-full items-center rounded-lg px-2 py-3 text-2xl font-bold text-primary transition-all hover:bg-primary/10 focus:bg-primary/10"
                      style={{
                        justifyContent: "flex-start",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ delay: 0.18, duration: 0.22 }}
              className="fixed right-0 bottom-0 left-0 z-50 flex w-full justify-center bg-secondary/95 px-4 pt-4 pb-8"
            >
              <Link
                href="tel:+18133370109"
                className="text-primary text-2xl font-bold"
              >
                +1 (813) 337-0109
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
