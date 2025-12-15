"use client";

import { createContext, useContext, useEffect, useRef, type MutableRefObject, type ReactNode, type RefObject } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePrefersReducedMotion from "@/lib/hooks/use-prefers-reduced-motion";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

const LenisContext = createContext<MutableRefObject<Lenis | null> | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  const lenisRef = useRef<Lenis | null>(null);
  const animationsContextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);

    gsap.ticker.lagSmoothing(0);

    animationsContextRef.current?.revert();
    animationsContextRef.current = gsap.context(() => {
      setupScrollAnimations();
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      scrollToHash(lenisRef.current);
    });

    return () => {
      animationsContextRef.current?.revert();
      animationsContextRef.current = null;
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!lenisRef.current) return;

    animationsContextRef.current?.revert();
    animationsContextRef.current = gsap.context(() => {
      setupScrollAnimations();
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      scrollToHash(lenisRef.current);
    });
  }, [pathname, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!lenisRef.current) return;

    const handleHashChange = () => scrollToHash(lenisRef.current);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      if (!lenisRef.current) return;

      const id = decodeURIComponent(href.replace(/^#/, ""));
      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      history.pushState({}, "", href);
      scrollToHash(lenisRef.current);
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [prefersReducedMotion]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

function setupScrollAnimations() {
  // Batch fade-up animations for elements with data-animate="fade-up"
  const fadeUpElements = gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']");
  gsap.set(fadeUpElements, { autoAlpha: 0, y: 24 });
  ScrollTrigger.batch(fadeUpElements, {
    start: "top 98%",
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      });
    },
    once: true,
  });

  // Image reveal (clip + gentle zoom) for elements with data-animate="image-reveal"
  gsap.utils.toArray<HTMLElement>("[data-animate='image-reveal']").forEach((container) => {
    const image = container.querySelector("img");

    gsap.set(container, { clipPath: "inset(0 0 100% 0)" });
    if (image) gsap.set(image, { scale: 1.06 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 98%",
        once: true,
      },
    });

    tl.to(
      container,
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power3.out",
      },
      0
    );

    if (image) {
      tl.to(
        image,
        {
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        0
      );
    }
  });

  // Stagger animations for card grids
  gsap.utils.toArray<HTMLElement>("[data-animate='stagger']").forEach((container) => {
    const children = container.children;
    gsap.fromTo(
      children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Scale animations
  gsap.utils.toArray<HTMLElement>("[data-animate='scale']").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 98%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Parallax effect for backgrounds
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || "0.5");
    gsap.to(el, {
      yPercent: speed * 30,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Text reveal animations
  gsap.utils.toArray<HTMLElement>("[data-animate='text-reveal']").forEach((el) => {
    if (el.dataset.textReveal === "done") return;
    el.dataset.textReveal = "done";

    const chars = el.innerText.split("");
    el.innerHTML = chars
      .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    gsap.fromTo(
      el.querySelectorAll(".char"),
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.015,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 98%",
          toggleActions: "play none none none",
        },
      }
    );
  });
}

function scrollToHash(lenis: Lenis | null) {
  if (!lenis) return;

  const hash = window.location.hash;
  if (!hash) return;

  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(id);
  if (!target) return;

  const header = document.getElementById("site-header");
  const offset = header ? -(header.getBoundingClientRect().height + 12) : -96;

  lenis.scrollTo(target, {
    offset,
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
}

// Utility hook for magnetic effect on buttons
export function useMagneticEffect(ref: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion, ref]);
}
