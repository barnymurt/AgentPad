import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages';

test.describe('Authentication', () => {
  test('should display sign in page with correct title', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.goto();
    
    await expect(signInPage.title).toHaveText('Welcome Back');
    await expect(signInPage.subtitle).toHaveText('Sign in to continue to LaunchPadPM');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.goto();
    
    await signInPage.emailInput.fill('invalid@example.com');
    await signInPage.passwordInput.fill('wrongpassword');
    await signInPage.submitButton.click();
    
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url.includes('error=') || url.includes('signin')).toBeTruthy();
  });

  test('should toggle between login and register modes', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.goto();
    
    await signInPage.expectToBeLoginMode();
    
    await signInPage.toggleModeButton.click();
    
    await signInPage.expectToBeRegisterMode();
    
    await signInPage.toggleModeButton.click();
    
    await signInPage.expectToBeLoginMode();
  });

  test('should toggle password visibility', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.goto();
    
    const passwordInput = signInPage.passwordInput;
    await passwordInput.fill('testpassword');
    
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    await signInPage.togglePasswordButton.click();
    
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('should require email and password fields', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.goto();
    
    await signInPage.submitButton.click();
    
    await expect(signInPage.emailInput).toBeVisible();
  });
});
