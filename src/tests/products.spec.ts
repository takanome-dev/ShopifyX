import { expect, test } from '@playwright/test';

const productSelector = (name: string, position = 0) =>
  `main >> css=.card-container >> css=.card >> css=.card-${name} >> nth=${position}`;

const paginationSelector = (name: string) =>
  `main >> css=.pagination >> css=.pagination-arrow-${name}`;

test.describe('Products Page', () => {
  test('product "Yeti Hondo" is displayed in the home page and is interactive', async ({
    page,
  }) => {
    await page.goto('http://localhost:3001/');

    // make sure that the title of the page is correct
    await expect(page).toHaveTitle(/clicktobuy | products/i);

    // get the logo title and make sure it is visible and link is correct
    const logoLink = page.getByRole('link', { name: 'logo' });
    await expect(logoLink).toHaveAttribute('href', '/');

    // Check if the product Yeti Hondo is displayed
    const yetiImage = page.locator(productSelector('image'));
    await expect(yetiImage).toHaveAttribute('alt', 'Yeti Hondo');

    const yetiTitle = page.locator(productSelector('title'));
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

    // make sure the previous page link is not clickable
    const previousPage = page.locator(paginationSelector('left'));
    await expect(previousPage).toHaveAttribute('href', '/products?page=0');
    await expect(previousPage).toHaveCSS('pointer-events', 'none');

    // navigate to the next page
    const nextPage = page.locator(paginationSelector('right'));
    await nextPage.click();
    await expect(page).toHaveURL('http://localhost:3001/products?page=2');

    // Check if the product Fanorak is displayed
    const fanorakImage = page.locator(productSelector('image'));
    await expect(fanorakImage).toHaveAttribute('alt', 'Fanorak');

    const fanorakTitle = page.locator(productSelector('title'));
    await expect(fanorakTitle).toHaveText('Fanorak');
    await expect(fanorakTitle).toHaveAttribute(
      'href',
      '/products/cl9bk6omc0050w3n5nvy49dwz'
    );

    const fanorakPrice = page.locator(productSelector('price'));
    await expect(fanorakPrice).toHaveText('$2,523.42');

    const fanorakStock = page.locator(productSelector('stock'));
    await expect(fanorakStock).toHaveText('In stock');

    const fanorakSeller = page.locator(productSelector('seller'));
    await expect(fanorakSeller).toHaveText('seller @Takanome');

    // add Fanorak to the cart
    const addToCartBtn = page.locator(productSelector('add-btn'));
    await addToCartBtn.click();

    // make sure that the total items in the cart is shown
    const cartIconContainer = page.locator('header >> nav >> div.cart-icon');
    const totalCartItems = cartIconContainer.locator('p.total-cart-items');
    await expect(totalCartItems).toBeVisible();
    await expect(totalCartItems).toHaveText('1');

    // open the cart
    const cartIcon = cartIconContainer.locator('svg');
    await cartIcon.click();

    const cartModal = page.locator('#__next >> css=.cart');
    await expect(cartModal).toBeVisible();

    // make sure that the item is in the cart
    const cartItem = cartModal.locator('css=.cart-item');
    await expect(cartItem).toBeVisible();

    // make sure that the image is visible
    const cartItemImg = cartItem.locator('css=.cart-item-img');
    await expect(cartItemImg).toBeVisible();
    await expect(cartItemImg).toHaveAttribute('alt', 'Fanorak');

    // make sure that the title is visible and correct
    const cartItemTitle = cartItem.locator('css=.cart-item-name');
    await expect(cartItemTitle).toBeVisible();
    await expect(cartItemTitle).toHaveText('Fanorak');
    await expect(cartItemTitle).toHaveAttribute(
      'href',
      '/products/cl9bk6omc0050w3n5nvy49dwz'
    );

    // make sure that the price is visible and correct
    const cartItemPrice = cartItem.locator('css=.cart-item-price');
    await expect(cartItemPrice).toBeVisible();
    await expect(cartItemPrice).toHaveText('$2,523.42');

    // close the cart
    const cartBtnClose = cartModal.locator('css=.cart-btn-close');
    await expect(cartBtnClose).toBeVisible();
    await cartBtnClose.click();

    // navigate to the next page
    await nextPage.click();
    await expect(page).toHaveURL('http://localhost:3001/products?page=3');

    // Check if the product "Rimowa Luggage" is displayed
    const rimowaImage = page.locator(productSelector('image', 1));
    await expect(rimowaImage).toHaveAttribute('alt', 'Rimowa Luggage');

    const rimowaTitle = page.locator(productSelector('title', 1));
    await expect(rimowaTitle).toHaveText('Rimowa Luggage');
    await expect(rimowaTitle).toHaveAttribute(
      'href',
      '/products/cl9bk6onr0106w3n514mn47ol'
    );

    const rimowaPrice = page.locator(productSelector('price', 1));
    await expect(rimowaPrice).toHaveText('$477.34');

    const rimowaStock = page.locator(productSelector('stock', 1));
    await expect(rimowaStock).toHaveText('Out of stock');

    const rimowaSeller = page.locator(productSelector('seller', 1));
    await expect(rimowaSeller).toHaveText('seller @Takanome');

    // add Rimowa Luggage to the cart
    const addCartBtn = page.locator(productSelector('add-btn', 1));
    await addCartBtn.click();

    // check if the total items in the cart is shown and updated
    await expect(totalCartItems).toBeVisible();
    await expect(totalCartItems).toHaveText('2');

    // open the cart
    await cartIcon.click();
    await expect(cartModal).toBeVisible();

    // make sure that the item is in the cart
    const cartItem2 = cartModal.locator('css=.cart-item >> nth=1');
    await expect(cartItem2).toBeVisible();

    const cartItemImg2 = cartItem.locator('css=.cart-item-img >> nth=1');
    await expect(cartItemImg2).toBeVisible();
    await expect(cartItemImg2).toHaveAttribute('alt', 'Rimowa Luggage');

    const cartItemTitle2 = cartItem.locator('css=.cart-item-name >> nth=1');
    await expect(cartItemTitle2).toBeVisible();
    await expect(cartItemTitle2).toHaveText('Rimowa Luggage');
    await expect(cartItemTitle2).toHaveAttribute(
      'href',
      '/products/cl9bk6onr0106w3n514mn47ol'
    );

    const cartItemPrice2 = cartItem.locator('css=.cart-item-price >> nth=1');
    await expect(cartItemPrice2).toBeVisible();
    await expect(cartItemPrice2).toHaveText('$477.34');

    // make sure that clicking the overlay will close the cart
    const cartOverlay = page.locator('#__next >> css=.cart-overlay');
    await expect(cartOverlay).toBeVisible();
    await cartOverlay.click();

    // jump to the last page
    // TODO: find a better way to do this
    const lastPage = page.locator(
      'main >> css=.pagination >> css=.pagination-last-page'
    );
    await lastPage.click();
    await expect(page).toHaveURL('http://localhost:3001/products?page=5');

    // make sure that the last page link is not clickable
    await expect(nextPage).toHaveAttribute('href', '/products?page=6');
    await expect(nextPage).toHaveCSS('pointer-events', 'none');

    // go back to the previous page
    await previousPage.click();
    await expect(page).toHaveURL('http://localhost:3001/products?page=4');
  });
});
