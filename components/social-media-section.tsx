import { Facebook, Linkedin, Whatsapp } from "@/ui/icons/social-media";
import Link from "@/ui/link";

export default function SocialMediaSection() {
  // WhatsApp FAQ: https://faq.whatsapp.com/5913398998672934
  // To create a WhatsApp chat link, use: https://wa.me/<number>
  // Example: https://wa.me/15551234567
  // Optionally, add ?text= for a pre-filled message

  // Replace with your business WhatsApp number in international format, no + or dashes
  const whatsappNumber = "15551234567"; // Example number, replace with real one
  const whatsappMessage = encodeURIComponent(
    "Hello! I'm interested in learning more about your services."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Follow Us
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
            Stay connected and get the latest updates on financial insights and
            company news
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-secondary"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-800 text-white transition-colors hover:bg-accent"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href={whatsappLink}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
            >
              <Whatsapp className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
