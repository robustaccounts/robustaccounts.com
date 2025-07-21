import { Facebook, Linkedin, Whatsapp } from '@/ui/icons/social-media';
import Link from '@/ui/link';

export default function SocialMediaSection() {
    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                        Follow Us
                    </h2>
                    <p className="mx-auto mb-8 max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                        Stay connected and get the latest updates on financial
                        insights and company news
                    </p>
                    <div className="flex justify-center space-x-6">
                        <Link
                            href="#"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-secondary"
                        >
                            <Facebook className="h-6 w-6" />
                        </Link>
                        <Link
                            href="#"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-800 text-white transition-colors hover:bg-accent"
                        >
                            <Linkedin className="h-6 w-6" />
                        </Link>
                        <Link
                            href="#"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-secondary"
                        >
                            <Whatsapp className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
