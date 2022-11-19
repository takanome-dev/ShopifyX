import { expect, test } from '@playwright/test';

test.describe('Products Page', () => {
  // test('home page has LOGO in the title', async ({ page }) => {
  //   await page.goto('http://localhost:3001');
  //   const logoLink = page.getByRole('link', { name: 'logo' });
  //   await expect(page).toHaveTitle(/clicktobuy | products/i);
  //   await expect(logoLink).toHaveAttribute('href', '/');
  // });

  test('products are displayed in the home page and are interactive', async ({
    page,
  }) => {
    await page.goto('http://localhost:3001/');
    await expect(page).toHaveTitle(/clicktobuy | products/i);

    const logoLink = page.getByRole('link', { name: 'logo' });
    await expect(logoLink).toHaveAttribute('href', '/');

    const yetiImage = page.getByRole('img', { name: /yeti/i });
    expect(yetiImage).toBeDefined();
    await expect(yetiImage).toHaveAttribute('alt', 'Yeti Hondo');

    const yetiTitle = page.getByRole('link', { name: /yeti/i });
    expect(yetiTitle).toBeTruthy();
    await expect(yetiTitle).toHaveText('Yeti Hondo');

    // TODO: write more elegant tests
    const yetiPrice = page.getByTestId('price-cl9bk6olb0008w3n5674jab8u');
    await expect(yetiPrice).toHaveText('$34.23');

    const yetiStock = page.getByTestId('stock-cl9bk6olb0008w3n5674jab8u');
    await expect(yetiStock).toHaveText('In stock');

    const yetiSeller = page.getByTestId('seller-cl9bk6olb0008w3n5674jab8u');
    await expect(yetiSeller).toHaveText('seller @Takanome');

    await yetiTitle.click();
    await expect(page).toHaveURL(
      'http://localhost:3001/products/cl9bk6olb0008w3n5674jab8u'
    );
    // await page.locator('main:has-text(";Yeti Hondo$34.23Description:soo nicebbbbbbbbbbBuy nowAdd to cart")').getByRole('button').first().click();
    // await page.getByRole('heading', { name: 'Yeti Hondo' }).click();
    // await page.getByText('$34.23').click();
    // await page.getByText('Description:').click();
    // await page.getByText('soo nicebbbbbbbbbb').click();
    // await page.getByRole('button', { name: 'Buy now' }).click();
    // await page.getByRole('button', { name: 'Add to cart' }).click();
    // await page.getByRole('link', { name: 'Logo' }).click();
    // await expect(page).toHaveURL('http://localhost:3001/');
    // --------------------------------------------------------------
    // await page.getByText('$34.23In stock').click();
    // await page.getByText('In stock').first().click();
    // await page.getByText('seller @Takanome').first().click();
    // await expect(page).toHaveURL('http://localhost:3001/');
    // await page.locator('.flex > .p-4').first().click();
    // await page.getByRole('link', { name: 'Next' }).click();
    // await expect(page).toHaveURL('http://localhost:3001/products?page=2');
    // await page.getByRole('img', { name: 'Fanorak' }).click();
    // await page.getByText('$2,523.42').click();
    // await page.getByText('In stock').first().click();
    // await page.getByRole('img', { name: 'Nike Vapormax' }).click();
    // await page.getByText('$834.56').click();
    // await page.getByText('In stock').nth(1).click();
    // await page.getByText('seller @Takanome').nth(1).click();
    // await expect(page).toHaveURL('http://localhost:3001/');
  });
});
