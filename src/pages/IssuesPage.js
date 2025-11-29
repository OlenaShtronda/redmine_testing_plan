import { expect } from '@playwright/test';

export class IssuesPage {
  constructor(page) {
    this.page = page;
    this.issuesHeading = page.getByRole('heading', { name: 'Issues' });

    this.addFilterDropdown = page.locator('#add_filter_select');
    this.trackerFilterLabel = page.getByRole('cell', { name: 'Tracker' }).locator('label');
    this.trackerFilterCheckbox = page.getByRole('checkbox', { name: 'Tracker' });
    this.trackerDropdown = page.locator('#values_tracker_id_1');
    this.applyButton = page.getByRole('link', { name: 'Apply' });

    this.optionsButton = page.getByText('Options', { exact: true });
    this.availableColumnsDropdown = page.locator('#available_c');
    this.moveRightButton = page.getByRole('button', { name: '→' });

    this.trackerCells = page.locator('table.issues td.tracker');
    this.projectColumnHeader = page.locator('table.issues th.project');

    this.numberHeader = page.getByRole('link', { name: '#', exact: true });
    this.issueId = page.locator('table.issues td.id');
  }

  async assertIssuesPageIsOpened() {
    expect(this.page.url()).toContain('https://www.redmine.org/projects/redmine/issues');
    await expect(this.issuesHeading).toBeVisible();
  }

  async addTrackerFilter() {
    await this.addFilterDropdown.selectOption({ value: 'tracker_id' });
  }

  async assertTrackerFilterControlsAreVisible() {
    await expect(this.trackerFilterLabel).toBeVisible();
    await expect(this.trackerFilterCheckbox).toBeChecked();
  }

  async selectTracker(value) {
    await this.trackerDropdown.selectOption(value);
  }

  async clickApplyButton() {
    await this.applyButton.click();
  }

  async assertTrackerColumnValues(value) {
    const count = await this.trackerCells.count();

    for (let i = 0; i < count; i++) {
      await expect(this.trackerCells.nth(i)).toHaveText(value);
    }
  }

  async openOptions() {
    await this.optionsButton.click();
  }

  async addColumn(columnValue) {
    await this.availableColumnsDropdown.selectOption({ value: columnValue });
    await this.moveRightButton.click();
  }

  async assertColumnIsVisible() {
    await expect(this.projectColumnHeader).toBeVisible();
  }

  async getIntArrOfIssueIds() {
    let issueIds = await this.issueId.allTextContents();
    return issueIds.map(id => parseInt(id, 10));
  }

  async sortByNumber() {
    await this.numberHeader.click();
  }
}
