import { test, expect } from '@playwright/test';

const registerSelector = (name: string) =>
  `main >> css=.register-page >> css=.register-${name}`;

test.describe('Register Flow', () => {
  test('should register a new user', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await expect(page).toHaveTitle(/clicktobuy | login/i);

    const signinButton = page.locator('header >> nav >> css=.signin-btn');
    const registerLink = page.locator(
      'main >> css=.login-page >> css=.register-link'
    );
    await expect(registerLink).toBeVisible();
    await registerLink.click();

    await expect(page).toHaveURL('http://localhost:3001/register');
    await expect(page).toHaveTitle(/clicktobuy | register/i);

    const header = page.locator(registerSelector('header'));
    const title = header.locator('h2');
    await expect(title).toHaveText('Register');

    const form = page.locator(registerSelector('form'));
    const usernameInput = form.locator('input[name="username"]');
    const emailInput = form.locator('input[name="email"]');
    const passwordInput = form.locator('input[name="password"]');
    const submitButton = form.locator('button[type="submit"]');
    const error = form.locator('css=.input-error >> span >> nth=0');

    await usernameInput.focus();
    await emailInput.focus();
    await expect(error).toHaveText('username is a required field');
    await usernameInput.fill('use');
    await expect(error).toHaveText('username must be at least 4 characters');
    await usernameInput.fill('user5');

    await emailInput.focus();
    await passwordInput.focus();
    await expect(error).toHaveText('email is a required field');
    await emailInput.fill('user5gmail.com');
    await expect(error).toHaveText('email must be a valid email');
    await emailInput.fill('user5@gmail.com');

    await passwordInput.focus();
    await emailInput.focus();
    await expect(error).toHaveText('password is a required field');
    await passwordInput.fill('123456');
    await expect(error).toHaveText('password must be at least 8 characters');
    await passwordInput.fill('12345678');
    await submitButton.click();

    // TODO: handle errors
    // await expect(error).toHaveText('Sorry, this email is already taken');
    // await emailInput.fill('takanomedev@gmail.com');
    // await submitButton.click();

    await expect(error).not.toBeVisible();
    await expect(page).toHaveURL('http://localhost:3001/products');
    await expect(page).toHaveTitle(/clicktobuy | products/i);
    const avatarContainer = page.locator(
      'header >> nav >> css=.avatar-container'
    );
    await expect(avatarContainer).toBeVisible();
    await expect(signinButton).not.toBeVisible();
  });
});
