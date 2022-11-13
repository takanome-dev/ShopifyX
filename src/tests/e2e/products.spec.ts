import { expect, test } from '@playwright/test';

test.describe('Products Page', () => {
  test('product page has LOGO in the title', async ({ page }) => {
    await page.goto('http://localhost:3001/products');

    // create a locator
    const logoLink = page.getByRole('link', { name: 'logo' });
    // const error = page.getByText(/error/i);
    // await expect(error).toHaveText(/error: failed/i);
    // ? yeti is a product
    const yetiImg = page.getByRole('img', { name: /yeti/i });
    const yetiTitle = page.getByRole('link', { name: /yeti/i });

    await expect(page).toHaveTitle(/products/i);
    await expect(logoLink).toHaveAttribute('href', '/');
    await expect(yetiImg).toHaveAttribute('alt', 'Yeti Hondo');
    await expect(yetiTitle).toHaveAttribute('href', /\/products\/*/);
  });
});
