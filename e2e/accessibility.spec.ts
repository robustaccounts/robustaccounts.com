import { expect, test } from '@playwright/test';

test.describe('Accessibility', () => {
    const pages = [
        { name: 'Homepage', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Services', url: '/services' },
        { name: 'Contact', url: '/contact' },
    ];

    pages.forEach(({ name, url }) => {
        test(`${name} should have proper landmarks`, async ({ page }) => {
            await page.goto(url);

            // Check for main landmark
            await expect(page.locator('main')).toBeVisible();

            // Check for navigation
            await expect(page.locator('header nav')).toBeVisible();

            // Check for footer
            await expect(page.locator('footer')).toBeVisible();
        });

        test(`${name} should have skip-to-content link`, async ({ page }) => {
            await page.goto(url);
            await page.keyboard.press('Tab');
            const skipLink = page.getByText('Skip to content');
            await expect(skipLink).toBeVisible();
        });

        test(`${name} should have proper heading hierarchy`, async ({
            page,
        }) => {
            await page.goto(url);
            const h1 = await page.locator('h1').count();
            expect(h1).toBeGreaterThanOrEqual(1);
            expect(h1).toBeLessThanOrEqual(1); // Should have exactly one h1
        });
    });

    test('keyboard navigation should work', async ({ page }) => {
        await page.goto('/');

        // Tab through interactive elements
        await page.keyboard.press('Tab'); // Skip link
        await page.keyboard.press('Tab'); // First nav link

        // Should be able to activate with Enter
        await page.keyboard.press('Enter');
        await page.waitForLoadState('networkidle');
    });
});
