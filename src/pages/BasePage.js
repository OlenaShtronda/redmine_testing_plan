import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(path);
  }

  async navigate(locator) {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
      locator.click(),
    ]);
  }

  async assertLinkIsVisible(locator) {
    await expect(locator).toBeVisible();
  }
}
