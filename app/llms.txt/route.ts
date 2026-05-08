import { getAllBlogPosts } from '@/lib/blog';
import { config } from '@/lib/config';

const SOLUTIONS = [
    ['/solutions/bookkeeping-service', 'Professional bookkeeping service'],
    ['/solutions/business-financing-ready', 'Business financing-ready financials'],
    ['/solutions/business-growth-accounting', 'Accounting that scales with growth'],
    ['/solutions/cash-flow-management', 'Cash-flow visibility and forecasting'],
    ['/solutions/dedicated-accountant', 'Dedicated accountant, not a call center'],
    ['/solutions/financial-clarity', 'Clarity on your numbers, no jargon'],
    ['/solutions/investor-ready-books', 'Investor-ready books for fundraising'],
    ['/solutions/irs-compliance', 'IRS compliance and audit-ready records'],
    ['/solutions/payroll-and-tax-services', 'Payroll and payroll-tax services'],
    ['/solutions/plain-english-accounting', 'Plain-English accounting reports'],
    ['/solutions/receipt-management', 'Receipt management and digitization'],
    ['/solutions/tax-deduction-maximization', 'Tax-deduction maximization'],
    ['/solutions/tax-optimization', 'Tax optimization strategies'],
    ['/solutions/tax-season-ready', 'Year-round tax-season readiness'],
    ['/solutions/transparent-pricing', 'Transparent flat-fee pricing'],
] as const;

const SERVICES = [
    ['/services/bookkeeping', 'Bookkeeping: daily categorization, monthly reconciliation, tax-ready financials'],
    ['/services/financial-advisory', 'Financial advisory: fractional CFO, cash-flow forecasting, KPI dashboards'],
    ['/services/payroll', 'Payroll: direct deposit, W-2/1099, multi-state tax compliance'],
] as const;

export async function GET() {
    const baseUrl = config.baseUrl;

    const posts = await getAllBlogPosts();
    const blogLines = posts
        .map(
            (p) =>
                `- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.excerpt}`,
        )
        .join('\n');

    const body = `# Robust Accounts

> Robust Accounts provides bookkeeping, payroll, and financial-advisory services for small businesses in the US and Canada. We deliver tax-ready monthly financials, multi-state payroll compliance, and fractional CFO support — all at transparent flat-fee pricing.

## Core pages

- [Home](${baseUrl}/): Overview and free 30-minute consultation
- [Services](${baseUrl}/services): All accounting services we offer
- [Pricing](${baseUrl}/pricing): Transparent monthly plans starting at $160/month
- [How It Works](${baseUrl}/how-it-works): Onboarding and monthly process
- [Our Expertise](${baseUrl}/our-expertise): Industries, software, and certifications
- [About](${baseUrl}/about): Team, mission, and track record
- [Contact](${baseUrl}/contact): Get in touch
- [FAQ](${baseUrl}/faq): Most-asked questions
- [Blog](${baseUrl}/blog): Accounting and tax insights

## Services

${SERVICES.map(([url, desc]) => `- [${desc}](${baseUrl}${url})`).join('\n')}

## Solutions

${SOLUTIONS.map(([url, desc]) => `- [${desc}](${baseUrl}${url})`).join('\n')}

## Recent articles

${blogLines}
`;

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
}
