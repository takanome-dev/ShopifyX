import { expect, test } from '@playwright/test';

const productSelector = (name: string, position = 0) =>
  `main >> css=.card-container >> css=.card >> p.card-${name} >> nth=${position}`;

test.describe('Products Page', () => {
  test('product "Yeti Hondo" is displayed in the home page and is interactive', async ({
    page,
  }) => {
    await page.goto('http://localhost:3001/');

    const logoLink = page.getByRole('link', { name: 'logo' });
    await expect(page).toHaveTitle(/clicktobuy | products/i);
    await expect(logoLink).toHaveAttribute('href', '/');

    const yetiImage = page.getByRole('img', { name: /yeti hondo/i });
    expect(yetiImage).toBeDefined();
    await expect(yetiImage).toHaveAttribute('alt', 'Yeti Hondo');

    const yetiTitle = page.getByRole('link', { name: /yeti hondo/i });
    expect(yetiTitle).toBeTruthy();
    await expect(yetiTitle).toHaveText('Yeti Hondo');
    await expect(yetiTitle).toHaveAttribute(
      'href',
      '/products/cl9bk6olb0008w3n5674jab8u'
    );

    const yetiPrice = page.locator(productSelector('price'));
    await expect(yetiPrice).toHaveText('$34.23');

    const yetiStock = page.locator(productSelector('stock'));
    await expect(yetiStock).toHaveText('In stock');

    const yetiSeller = page.locator(productSelector('seller'));
    await expect(yetiSeller).toHaveText('seller @Takanome');

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
