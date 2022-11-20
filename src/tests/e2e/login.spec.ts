import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3001/login');
    await expect(page).toHaveTitle(/clicktobuy | login/i);
    // await page.fill('input[name="email"]', 'takanome@gmail.com');
    // await page.fill('input[name="password"]', '12345678');
    // await page.click('button:has-text("Sign in")');
    // await page.waitForNavigation();
    // await expect(page).toHaveURL('http://localhost:3001/');
  });
});
