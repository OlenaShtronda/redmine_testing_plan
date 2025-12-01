import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(path);
  }

  async navigate(locator) {
    await locator.click();
  }

  async assertLinkIsVisible(locator) {
    await expect(locator).toBeVisible();
  }
}
