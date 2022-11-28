import { test, expect } from '@playwright/test';

const loginSelector = (name: string) =>
  `main >> css=.login-page >> css=.login-${name}`;

test.describe('Login Flow', () => {
  test('should login with valid credentials or get errors', async ({
    page,
  }) => {
    await page.goto('http://localhost:3001/login');
    await expect(page).toHaveTitle(/clicktobuy | login/i);

    const header = page.locator(loginSelector('header'));
    const title = header.locator('h2');
    await expect(title).toHaveText('Sign In');

    const form = page.locator(loginSelector('form'));
    const emailInput = form.locator('input[name="email"]');
    const passwordInput = form.locator('input[name="password"]');
    const submitButton = form.locator('button[type="submit"]');
    const error = form.locator('css=.input-error >> span >> nth=0');
    // const emailError = form.locator('css=.input-error >> span >> nth=0');
    // const passwordError = form.locator('css=.input-error >> span >> nth=1');

    await emailInput.focus();
    await passwordInput.focus();
    await expect(error).toHaveText('email is a required field');
    await emailInput.fill('takanomedevgmail.com');
    await expect(error).toHaveText('email must be a valid email');
    await emailInput.fill('takanomedev@gmail.com');

    await passwordInput.focus();
    await emailInput.focus();
    await expect(error).toHaveText('password is a required field');
    await passwordInput.fill('123456');
    await expect(error).toHaveText('password must be at least 8 characters');
    await passwordInput.fill('12345678');
    await submitButton.click();

    await expect(error).toHaveText('Invalid email or password');
    // await expect(page).toHaveURL('http://localhost:3001/');
    // await expect(page).toHaveTitle(/clicktobuy | products/i);
  });
});
