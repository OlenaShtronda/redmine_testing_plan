import { test } from '../fixtures/pages';
import { faker } from '@faker-js/faker';

test.describe('Registration page tests', () => {
  test.beforeEach(async ({ homepage, registrationPage }) => {
    await homepage.open();
    await homepage.openRegistrationPage();
    await registrationPage.assertRegistrationPageIsOpened();
  });

  test('Assert user cannot register with empty required fields', async ({ registrationPage }) => {
    await registrationPage.clickSubmitButton();
    await registrationPage.assertErrorBoxIsVisible();
    await registrationPage.assertValidationMessagesAreVisible()
    await registrationPage.assertRequiredFieldsHaveRedBorder();
    await registrationPage.assertRequiredFieldsLabelsAreRed();
  });

  test('Assert user cannot register with the password shorter than 8 symbols', async ({ registrationPage }) => {
    const login = faker.internet.username();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password({ length: 7 });

    await registrationPage.fillRequiredFields(login, password, password, firstName, lastName, email);
    await registrationPage.clickSubmitButton();
    await registrationPage.assertErrorBoxIsVisible();
    await registrationPage.assertValidationMessageIsVisible();
    await registrationPage.assertPasswordFieldHasRedBorder();
    await registrationPage.assertPasswordFieldLabelIsRed();
  });
});
