"use client";

import Link from "next/link";
import { useState } from "react";

export default function StickyCTA() {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <>
      {/* Desktop / Tablet sticky banner */}
      <div className="fixed bottom-1 right-0 xl:p-8 xl:pr-16 p-5 pr-8 bg-white/50 backdrop-blur-2xl z-50 shapecut-box max-w-sm w-full max-md:!hidden block">
        <button
          type="button"
          onClick={() => setIsClosed(true)}
          className="bg-transparent border-none w-[26px] h-[26px] cursor-pointer absolute top-4 right-4"
          aria-label="Close"
        >
          <CloseIcon color="black" />
        </button>

        <div className="bannerContent">
          <h3 className="lg:text-2xl text-xl font-medium capitalize text-balance text-theme-black">
            Ready to streamline your finances?
          </h3>

          <Link href="/contact" className="btn-div uppercase transitionAll mt-6">
            <span className="text-box">Schedule a Call</span>
            <span className="icon-box">
              <ArrowIcon className="transitionAll" />
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile rotated CTA */}
      <div className="fixed bottom-1/2 transform -translate-y-1/2 right-0 -rotate-90 z-50 origin-bottom-right lg:!hidden block">
        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-div uppercase transitionAll">
            <span className="text-box">Schedule a Call</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsClosed(true)}
            className="bg-primary border-none w-11 h-11 flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <CloseIcon color="white" />
          </button>
        </div>
      </div>
    </>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.67227 14.6363L4.59045 13.5545L12.0086 6.13632H5.36318V4.59087H14.6359V13.8636H13.0905V7.21814L5.67227 14.6363Z"
        fill="white"
      />
    </svg>
  );
}

function CloseIcon({ color }: { color: "white" | "black" }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.93258 20.2082L5.79102 19.0666L11.8577 13L5.79102 6.93331L6.93258 5.79175L12.9992 11.8584L19.0659 5.79175L20.2075 6.93331L14.1408 13L20.2075 19.0666L19.0659 20.2082L12.9992 14.1415L6.93258 20.2082Z"
        fill={color === "white" ? "white" : "black"}
      />
    </svg>
  );
}
