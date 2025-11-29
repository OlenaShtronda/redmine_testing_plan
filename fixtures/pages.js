import { test as base, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { IssuesPage } from '../src/pages/IssuesPage';
import { RegistrationPage } from '../src/pages/RegistrationPage';

export const test = base.extend({

  homepage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  issuesPage: async ({ page }, use) => {
    await use(new IssuesPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  }

});

export { expect };
