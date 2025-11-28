import { test, expect } from '@playwright/test';

test.describe('Issues page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.redmine.org');
    await page.getByRole('link', { name: 'Issues' }).click();
    
    expect(page.url()).toContain('https://www.redmine.org/projects/redmine/issues');
  
    const issuesHeading = page.getByRole('heading', { name: 'Issues' });
    await expect(issuesHeading).toBeVisible();
  });

  test('Assert issues are filtered correctly when user selects tracker on the "Overview" tab', async ({ page }) => {
    const addFilterDropdown = page.locator('#add_filter_select');
    await addFilterDropdown.selectOption({ value: 'tracker_id' });

    await expect(page.getByRole('cell', { name: 'Tracker' }).locator('label')).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Tracker' })).toBeChecked();

    const trackerDropdown = page.locator('#values_tracker_id_1');
    await trackerDropdown.selectOption('Patch');
    await page.getByRole('link', { name: 'Apply' }).click();

    const trackerCells = page.locator('table.issues td.tracker');
    const count = trackerCells.count();

    for (let i = 0; i < count; i++) {
      await expect(trackerCells.nth(i)).toHaveText('Patch');
    }
  });

  test('Assert columns can be added through "Options" menu', async ({ page }) => {
    await page.getByText('Options', { exact: true }).click();

    const availableColumnsDropdown = page.locator('#available_c');
    await availableColumnsDropdown.selectOption({ value: 'project' });
    await page.getByRole('button', { name: '→' }).click();
    await page.getByRole('link', { name: 'Apply' }).click();

    await expect(page.locator('table.issues th.project')).toBeVisible();
  });

  test('Assert sorting by # works correctly', async ({ page }) => {
    const numberHeader = page.getByRole('link', { name: '#', exact: true });

    let issueIds = await page.locator('table.issues td.id').allTextContents();
    let numbers = issueIds.map(id => parseInt(id, 10));

    const isDescending = numbers[0] > numbers[numbers.length - 1];
    
    if (isDescending) {
      await numberHeader.click();
      
      issueIds = await page.locator('table.issues td.id').allTextContents();
      numbers = issueIds.map(id => parseInt(id, 10));

      const sortedAsc = [...numbers].sort((a, b) => a - b);
      expect(numbers).toEqual(sortedAsc);
    } else {
      await numberHeader.click();

      issueIds = await page.locator('table.issues td.id').allTextContents();
      numbers = issueIds.map(id => parseInt(id, 10));

      const sortedDesc = [...numbers].sort((a, b) => b - a);
      expect(numbers).toEqual(sortedDesc);
    }
  });
});
