import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.issuesLink = page.getByRole('link', { name: 'Issues' });
  }
}
