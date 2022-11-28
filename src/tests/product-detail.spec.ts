import { test, expect } from '@playwright/test';

const productDetailSelector = (name: string) =>
  `main >> css=.product-detail >> css=.grid >> css=.product-${name}`;

test.describe('Test Product Detail Page', () => {
  test('products are displayed in the products page', async ({ page }) => {
    await page.goto('http://localhost:3001');
    const titleLink = page.getByRole('link', { name: /yeti hondo/i });
    await titleLink.click();
    await expect(page).toHaveURL(
      'http://localhost:3001/products/cl9bk6olb0008w3n5674jab8u'
    );

    const yetiImage = page.locator(productDetailSelector('image'));
    await expect(yetiImage).toHaveAttribute('alt', 'Yeti Hondo');

    const yetiTitle = page.locator(productDetailSelector('title'));
    await expect(yetiTitle).toHaveText('Yeti Hondo');

    const yetiPrice = page.locator(productDetailSelector('price'));
    await expect(yetiPrice).toHaveText('$34.23');

    // const yetiStock = page.locator(productDetailSelector('stock'));
    // await expect(yetiStock).toHaveText('In stock');

    const yetiDescTitle = page.locator(productDetailSelector('desc-title'));
    await expect(yetiDescTitle).toBeVisible();
    await expect(yetiDescTitle).toHaveText('Description:');

    const yetiDesc = page.locator(productDetailSelector('desc'));
    await expect(yetiDesc).toBeVisible();
    await expect(yetiDesc).toHaveText('soo nicebbbbbbbbbb');

    const buttons = page.locator(productDetailSelector('buttons'));
    const buyButton = buttons.locator('css=.btn-title:has-text("Buy now")');
    await expect(buyButton).toBeVisible();
    await expect(buyButton).toHaveText('Buy now');

    const addCartButton = buttons.locator(
      'css=.btn-title:has-text("Add to cart")'
    );
    await expect(addCartButton).toBeVisible();
    await expect(addCartButton).toHaveText('Add to cart');

    const productOptions = page.locator(productDetailSelector('options'));
    const btnOptions = productOptions.locator('button');
    await expect(btnOptions).toBeVisible();
    await btnOptions.click();

    const productDropdown = productOptions.locator('css=.product-dropdown');
    await expect(productDropdown).toBeVisible();

    const dropdownEditLink = productOptions.locator(
      'css=.product-dropdown >> a.edit-product'
    );
    await expect(dropdownEditLink).toBeVisible();
    await expect(dropdownEditLink).toHaveText('Edit');

    const dropdownDelBtn = productOptions.locator(
      'css=.product-dropdown >> button.delete-product'
    );
    await expect(dropdownDelBtn).toBeVisible();
    await expect(dropdownDelBtn).toHaveText('Delete');

    await dropdownDelBtn.click();

    const delModal = page.locator('main >> css=.delete-modal');
    await expect(delModal).toBeVisible();

    const delModalCancelBtn = delModal.locator('button >> text=Cancel');
    await expect(delModalCancelBtn).toBeVisible();

    const delModalDelBtn = delModal.locator('button >> text=Delete');
    await expect(delModalDelBtn).toBeVisible();

    await delModalCancelBtn.click();
    await expect(delModal).not.toBeVisible();

    await addCartButton.click();
    const cartIconContainer = page.locator('header >> nav >> div.cart-icon');
    const totalCartItems = cartIconContainer.locator('p.total-cart-items');
    await expect(totalCartItems).toBeVisible();
    await expect(totalCartItems).toHaveText('1');

    const cartIcon = cartIconContainer.locator('svg');
    await cartIcon.click();

    const cartModal = page.locator('#__next >> css=.cart');
    await expect(cartModal).toBeVisible();

    const cartItem = cartModal.locator('css=.cart-item');
    await expect(cartItem).toBeVisible();

    const cartItemImg = cartItem.locator('css=.cart-item-img');
    await expect(cartItemImg).toBeVisible();
    await expect(cartItemImg).toHaveAttribute('alt', 'Yeti Hondo');

    const cartItemTitle = cartItem.locator('css=.cart-item-name');
    await expect(cartItemTitle).toBeVisible();
    await expect(cartItemTitle).toHaveText('Yeti Hondo');

    const cartItemPrice = cartItem.locator('css=.cart-item-price');
    await expect(cartItemPrice).toBeVisible();
    await expect(cartItemPrice).toHaveText('$34.23');

    const cartBtnClose = cartModal.locator('css=.cart-btn-close');
    await expect(cartBtnClose).toBeVisible();
    await cartBtnClose.click();

    await productOptions.click();
    await dropdownEditLink.click();
    await expect(page).toHaveURL(
      'http://localhost:3001/products/update?id=cl9bk6olb0008w3n5674jab8u'
    );
  });
});
