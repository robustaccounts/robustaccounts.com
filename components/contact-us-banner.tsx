import React from "react";

import { ArrowForward, Call, Mail } from "@/ui/icons/google-icons";
import Link from "@/ui/link";
import contactInfo from "@/data/contact-info";

export default function ContactUsBanner() {
  return (
    <section className="m-4 rounded-2xl bg-secondary text-primary lg:m-8">
      <div className="px-6 py-12 lg:px-12">
        <div className="flex flex-col items-center gap-8 text-left lg:flex-row lg:justify-between">
          {/* Content */}
          <div className="space-y-6 lg:max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Ready to Transform Your Business Finances?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl">
              Get started with a free consultation and discover how our expert
              accounting services can save you time and money.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-8 lg:gap-4">
              <Link
                href={`tel:${contactInfo.phoneHref}`}
                className="sm:justiwfy-start flex items-center justify-center gap-2"
              >
                <Call className="h-5 w-5 fill-primary" />
                <span className="text-sm font-medium sm:text-base">
                  {contactInfo.phoneDisplay}
                </span>
              </Link>
              <Link
                href={`mailto:${contactInfo.emailHref}`}
                className="flex items-center justify-center gap-2 sm:justify-start"
              >
                <Mail className="h-5 w-5 fill-primary" />
                <span className="text-sm font-medium sm:text-base">
                  {contactInfo.emailDisplay}
                </span>
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-4 sm:flex-row lg:flex-col lg:items-end lg:gap-4">
            <Link
              href="/contact"
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-all sm:px-8 sm:py-4 sm:text-lg lg:w-sm"
            >
              Get Free Consultation
              <ArrowForward className="h-5 w-5 fill-white transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary bg-transparent px-6 py-3 text-base font-semibold text-primary transition-all sm:px-8 sm:py-4 sm:text-lg lg:w-sm"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
