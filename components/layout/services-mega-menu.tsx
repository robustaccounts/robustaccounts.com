"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ArrowIcon } from "@/lib/icons";
import { SERVICES_MEGA_MENU_ITEMS } from "@/lib/layout-constants";
import usePrefersReducedMotion from "@/lib/hooks/use-prefers-reduced-motion";

type ServicesMegaMenuProps = {
  onNavigate?: () => void;
};

export default function ServicesMegaMenu({ onNavigate }: ServicesMegaMenuProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeId, setActiveId] = useState(
    () => SERVICES_MEGA_MENU_ITEMS[0]?.id ?? "overview"
  );
  const didInitRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeItem = useMemo(() => {
    return (
      SERVICES_MEGA_MENU_ITEMS.find((item) => item.id === activeId) ??
      SERVICES_MEGA_MENU_ITEMS[0]!
    );
  }, [activeId]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      if (!didInitRef.current) {
        didInitRef.current = true;
        return;
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          }
        );
      }
    },
    { dependencies: [activeId, prefersReducedMotion] }
  );

  return (
    <div className="cust-container py-12">
      <div className="grid grid-cols-12 items-stretch gap-10">
        {/* Left: Navigation List */}
        <div className="col-span-4 xl:col-span-3">
          <ul className="divide-y divide-gray-200 border border-gray-200 bg-white">
            {SERVICES_MEGA_MENU_ITEMS.map((item) => {
              const isActive = item.id === activeId;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`group flex items-center justify-between gap-4 border-l-4 border-transparent py-4 pl-6 pr-6 text-sm font-bold tracking-wide uppercase transition-colors ${
                      isActive
                        ? "border-primary bg-theme-offwhite text-primary"
                        : "text-theme-black hover:bg-theme-offwhite hover:text-primary"
                    }`}
                    onMouseEnter={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    onClick={onNavigate}
                  >
                    <span>{item.label}</span>
                    <ArrowIcon
                      size={14}
                      className="text-current opacity-60 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Description + CTA */}
        <div className="col-span-8 xl:col-span-9 flex flex-col justify-center">
          <div className="flex h-full items-center border-l border-gray-100 pl-10">
            <div ref={contentRef} className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold tracking-wider text-primary uppercase">
                Services
              </p>
              <h3 className="mb-5 text-3xl font-semibold text-theme-black md:text-4xl">
                {activeItem.label}
              </h3>
              <p className="mb-7 leading-relaxed text-theme-darkgray">
                {activeItem.description}
              </p>
              <ul className="mb-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {activeItem.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-theme-black/80"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-primary"
                      aria-hidden="true"
                    />
                    <span className="text-base leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={activeItem.href}
                className="inline-flex items-center gap-3 font-medium text-theme-black transition-colors hover:text-primary"
                onClick={onNavigate}
              >
                Know More
                <span className="flex h-9 w-9 items-center justify-center bg-primary">
                  <ArrowIcon size={12} className="text-white" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


