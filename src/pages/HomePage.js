export class HomePage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.issuesLink = page.getByRole('link', { name: 'Issues' });
  }

  async open() {
    await this.page.goto('/');
  }

  async openRegistrationPage() {
    await this.registerLink.click();
  }

  async openIssuesPage() {
    await this.issuesLink.click();
  }
}
