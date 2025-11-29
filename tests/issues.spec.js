import { test, expect } from '../fixtures/pages';

test.describe('Issues page tests', () => {
  test.beforeEach(async ({ homepage, issuesPage }) => {
    await homepage.open();
    await homepage.navigate(homepage.issuesLink);
    await issuesPage.assertIssuesPageIsOpened();
  });

  test('Assert issues are filtered correctly when user selects tracker on the "Overview" tab', async ({ issuesPage }) => {
    await issuesPage.addTrackerFilter();
    await issuesPage.assertTrackerFilterControlsAreVisible();
    await issuesPage.selectTracker('Patch');
    await issuesPage.clickApplyButton();
    await issuesPage.assertTrackerColumnValues('Patch');
  });

  test('Assert columns can be added through "Options" menu', async ({ issuesPage }) => {
    await issuesPage.openOptions();
    await issuesPage.addColumn('project');
    await issuesPage.clickApplyButton();
    await issuesPage.assertColumnIsVisible();
  });

  test('Assert sorting by # works correctly', async ({ issuesPage }) => {
    let numbers = await issuesPage.getIntArrOfIssueIds();

    const isDescending = numbers[0] > numbers[numbers.length - 1];
    
    if (isDescending) {
      await issuesPage.sortByNumber();
      numbers = await issuesPage.getIntArrOfIssueIds();

      const sortedAsc = [...numbers].sort((a, b) => a - b);
      expect(numbers).toEqual(sortedAsc);
    } else {
      await issuesPage.sortByNumber();
      numbers = await issuesPage.getIntArrOfIssueIds();

      const sortedDesc = [...numbers].sort((a, b) => b - a);
      expect(numbers).toEqual(sortedDesc);
    }
  });
});
