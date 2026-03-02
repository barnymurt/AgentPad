import { type Page, type Locator, expect } from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly nameInput: Locator;
  readonly submitButton: Locator;
  readonly toggleModeButton: Locator;
  readonly togglePasswordButton: Locator;
  readonly errorMessage: Locator;
  readonly formError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('signin-title');
    this.subtitle = page.getByTestId('signin-subtitle');
    this.emailInput = page.getByTestId('signin-email-input');
    this.passwordInput = page.getByTestId('signin-password-input');
    this.nameInput = page.getByTestId('signin-name-input');
    this.submitButton = page.getByTestId('signin-submit-button');
    this.toggleModeButton = page.getByTestId('signin-toggle-mode');
    this.togglePasswordButton = page.getByTestId('signin-toggle-password');
    this.errorMessage = page.locator('.bg-red-50, .bg-red-900\\/20');
    this.formError = page.locator('[class*="bg-red"]');
  }

  async goto() {
    await this.page.goto('/auth/signin');
  }

  async signIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async register(name: string, email: string, password: string) {
    await this.toggleModeButton.click();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectToBeLoginMode() {
    await expect(this.title).toHaveText('Welcome Back');
  }

  async expectToBeRegisterMode() {
    await expect(this.title).toHaveText('Create Account');
  }

  async expectErrorVisible() {
    await expect(this.formError.first()).toBeVisible();
  }
}
