import { expect } from '@playwright/test';

export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.registerHeading = page.getByRole('heading', { name: 'Register' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.errorBox = page.locator('#errorExplanation');

    this.loginField = page.getByRole('textbox', { name: 'Login *' });
    this.passwordField = page.getByRole('textbox', { name: 'Password *' });
    this.confirmationField = page.getByRole('textbox', { name: 'Confirmation *' });
    this.firstNameField = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameField = page.getByRole('textbox', { name: 'Last name *' });
    this.emailField = page.getByRole('textbox', { name: 'Email *' });

    this.loginFieldLabel = page.locator('label[for="user_login"]');
    this.passwordFieldLabel = page.locator('label[for="user_password"]');
    this.firstNameFieldLabel = page.locator('label[for="user_firstname"]');
    this.lastNameFieldLabel = page.locator('label[for="user_lastname"]');
  }

  async assertRegistrationPageIsOpened() {
    await expect(this.page).toHaveURL('https://www.redmine.org/account/register');
    await expect(this.registerHeading).toBeVisible();
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async assertErrorBoxIsVisible() {
    await expect(this.errorBox).toBeVisible();
  }

  async assertValidationMessagesAreVisible() {
    const validationMessages = [
      'Email cannot be blank',
      'Login cannot be blank',
      'First name cannot be blank',
      'Last name cannot be blank',
      'Password is too short (minimum is 8 characters)'
    ];

    for (const message of validationMessages) {
      await expect(this.errorBox).toContainText(message);
    }
  }
  
  async assertRequiredFieldsHaveRedBorder() {
    const requiredFields = [
      this.loginField,
      this.passwordField,
      this.firstNameField,
      this.lastNameField
    ];

    for (const selector of requiredFields) {
      await expect(selector).toHaveCSS('border-color', 'rgb(187, 0, 0)');
    }
  }

  async assertRequiredFieldsLabelsAreRed() {
    const requiredFieldsLabels = [
      this.loginFieldLabel,
      this.passwordFieldLabel,
      this.firstNameFieldLabel,
      this.lastNameFieldLabel
    ];

    for (const label of requiredFieldsLabels) {
      await expect(label).toHaveCSS('color', 'rgb(187, 0, 0)');
    }
  }

  async fillRequiredFields(login, password, confirmation, firstName, lastName, email) {
    await this.loginField.fill(login);
    await this.passwordField.fill(password);
    await this.confirmationField.fill(confirmation);
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
  }

  async assertValidationMessageIsVisible() {
    await expect(this.errorBox).toContainText('Password is too short (minimum is 8 characters)');
  }

  async assertPasswordFieldHasRedBorder() {
    await expect(this.passwordField).toHaveCSS('border-color', 'rgb(187, 0, 0)');
  }

  async assertPasswordFieldLabelIsRed() {
    await expect(this.passwordFieldLabel).toHaveCSS('color', 'rgb(187, 0, 0)');
  }
}
