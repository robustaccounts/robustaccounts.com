"use client";
import React, { useState } from "react";
import { ArrowForward } from "@/ui/icons/google-icons";
import cn from "@/utils/cn";
import ScheduleCall from "./schedule-call";
import contactInfo from "@/data/contact-info";

const stats = [
  { value: contactInfo.responseTime, label: "Response Time" },
  { value: "500+", label: "Happy Clients" },
  { value: "99.9%", label: "Uptime" },
  { value: "5★", label: "Client Rating" },
];

const ContactHeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 sm:py-0 md:px-12 lg:px-16 xl:container xl:mx-auto"
      )}
    >
      <div className="flex w-full flex-col items-center gap-8 pt-8">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center sm:space-y-8 xl:max-w-4/5">
          <h1 className="text-center text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
            Let's <span className="text-accent">Transform</span> Your Business
            Together
          </h1>
          <p className="max-w-3xl text-center text-base leading-relaxed sm:text-lg lg:text-xl text-gray-600">
            Ready to streamline your finances and focus on growing your
            business? Get in touch with our expert team for a free consultation
            and discover how we can help you achieve your financial goals.
          </p>
          {/* CTA Button */}
          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-white backdrop-blur-2xl transition-all hover:bg-accent/80 sm:w-auto"
              )}
            >
              <div className={cn("rounded-full bg-white p-1.5")}>
                <ArrowForward className="h-5 w-5 fill-accent" />
              </div>
              <span className="text-base">Schedule My Free Consultation</span>
            </button>
            <p className="text-center text-sm text-gray-500 sm:text-left">
              No credit card required • 30-minute call
            </p>
          </div>
        </div>
        {/* Stats Section */}
        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8 mt-8">
          {stats.map((stat, idx) => (
            <div className="text-center" key={idx}>
              <div className="text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for Schedule Call */}
      {isModalOpen && (
        <ScheduleCall
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default ContactHeroSection;
