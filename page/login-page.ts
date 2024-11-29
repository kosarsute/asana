import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly captchaCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email address');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.captchaCheckbox = page.locator('#recaptcha-anchor'); 
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.continueButton.click();
    await this.passwordInput.fill(password);
     if (await this.captchaCheckbox.isVisible()) {
      await this.captchaCheckbox.click();
    }
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/home/, { timeout: 30000 });
  }
}
