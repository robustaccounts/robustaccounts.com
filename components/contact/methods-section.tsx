import React from "react";
import Link from "@/ui/link";

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  contact: string;
  subtext: string;
  href: string;
}

const ContactMethodsGrid = ({
  contactMethods,
}: {
  contactMethods: ContactMethod[];
}) => (
  <section className="py-12 lg:py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
          Choose the method that works best for you
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactMethods.map((method, index) => (
          <Link key={index} href={method.href} className="rounded-xl p-6">
            <div className="mb-4">{method.icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {method.title}
            </h3>
            <p className="mb-3 text-sm text-gray-600">{method.description}</p>
            <div className="mb-2 font-medium text-blue-600">
              {method.contact}
            </div>
            <p className="text-xs text-gray-500">{method.subtext}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ContactMethodsGrid;
