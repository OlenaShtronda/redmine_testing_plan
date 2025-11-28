import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Registration page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.redmine.org');
    await page.getByRole('link', { name: 'Register' }).click();
    
    await expect(page).toHaveURL('https://www.redmine.org/account/register');
  
    const registerHeading = page.getByRole('heading', { name: 'Register' });
    await expect(registerHeading).toBeVisible();
  });

  test('Assert user cannot register with empty required fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorBox = page.locator('#errorExplanation');

    await expect(errorBox).toBeVisible();

    const validationMessages = [
      'Email cannot be blank',
      'Login cannot be blank',
      'First name cannot be blank',
      'Last name cannot be blank',
      'Password is too short (minimum is 8 characters)'
    ];

    for (const message of validationMessages) {
      await expect(errorBox).toContainText(message);
    }

    const loginField = page.getByRole('textbox', { name: 'Login *' });
    const passwordField = page.getByRole('textbox', { name: 'Password *' });
    const firstNameField = page.getByRole('textbox', { name: 'First name *' });
    const lastNameField = page.getByRole('textbox', { name: 'Last name *' });

    const requiredFields = [
      loginField,
      passwordField,
      firstNameField,
      lastNameField
    ];

    for (const selector of requiredFields) {
      await expect(selector).toHaveCSS('border-color', 'rgb(187, 0, 0)');
    }

    const requiredFieldsLabels = [
      'label[for="user_login"]',
      'label[for="user_password"]',
      'label[for="user_firstname"]',
      'label[for="user_lastname"]'
    ];

    for (const locator of requiredFieldsLabels) {
      const label = page.locator(locator);
      await expect(label).toHaveCSS('color', 'rgb(187, 0, 0)');
    }
  });

  test('Assert user cannot register with the password shorter than 8 symbols', async ({ page }) => {
    const login = faker.internet.username();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password({ length: 7 });

    await page.getByRole('textbox', { name: 'Login *' }).fill(login);
    await page.getByRole('textbox', { name: 'Password *' }).fill(password);
    await page.getByRole('textbox', { name: 'Confirmation *' }).fill(password);
    await page.getByRole('textbox', { name: 'First name *' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last name *' }).fill(lastName);
    await page.getByRole('textbox', { name: 'Email *' }).fill(email);
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorBox = page.locator('#errorExplanation');

    await expect(errorBox).toBeVisible();
    await expect(errorBox).toContainText('Password is too short (minimum is 8 characters)');
    
    const passwordField = page.getByRole('textbox', { name: 'Password *' });
    await expect(passwordField).toHaveCSS('border-color', 'rgb(187, 0, 0)');

    const passwordLabel = page.locator('label[for="user_password"]');
    await expect(passwordLabel).toHaveCSS('color', 'rgb(187, 0, 0)');
  });
});
