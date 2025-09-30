This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables:

```bash
# Create a .env.local file with your required env vars
cat > .env.local << 'EOF'
NEXT_PUBLIC_WEBSITE_URL=https://robustaccounts.com
# Optional: enable Amplitude analytics on the client
NEXT_PUBLIC_AMPLITUDE_API_KEY=your_amplitude_public_key
# Required for saving leads via Neon Postgres
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
EOF
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## SEO Features

This project includes automatic sitemap and robots.txt generation using Next.js 15's metadata API:

### Sitemap

- **File**: `app/sitemap.ts`
- **URL**: `/sitemap.xml`
- Automatically includes all static routes and blog posts
- Updates automatically when new blog posts are added
- Includes proper priorities and change frequencies
- Uses `NEXT_PUBLIC_WEBSITE_URL` environment variable for base URL

### Robots.txt

- **File**: `app/robots.ts`
- **URL**: `/robots.txt`
- Allows all crawlers to access the site
- Disallows access to API routes, Next.js internals, and admin areas
- References the sitemap location
- Uses `NEXT_PUBLIC_WEBSITE_URL` environment variable for base URL

Both files are automatically generated at build time and follow the latest Next.js best practices.

## Notes

- MDX articles are rendered server-side for performance using `next-mdx-remote` RSC.
- Leads are stored using a server action in `lib/save-lead.ts`; ensure `DATABASE_URL` is set.
- Analytics is initialized on the client via Amplitude. No analytics run in middleware.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
