import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should have correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Robust Accounts/);
    });

    test('should have accessible skip-to-content link', async ({ page }) => {
        // Focus the page and press Tab to reach skip link
        await page.keyboard.press('Tab');
        const skipLink = page.getByText('Skip to content');
        await expect(skipLink).toBeFocused();
    });

    test('should have main navigation', async ({ page }) => {
        await expect(page.getByRole('navigation')).toBeVisible();
    });

    test('should have hero section', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('should have call-to-action button', async ({ page }) => {
        const ctaButton = page.getByRole('button', { name: /schedule/i });
        await expect(ctaButton).toBeVisible();
    });

    test('should navigate to services page', async ({ page }) => {
        await page.getByRole('link', { name: 'Services' }).click();
        await expect(page).toHaveURL(/.*services/);
    });

    test('should be accessible', async ({ page }) => {
        // Basic accessibility checks
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await expect(page.locator('main')).toHaveAttribute('role', 'main');
    });
});
