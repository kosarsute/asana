import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/login-page';
const testData = require('./data.json');


test.describe('Asana Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('ben+pose@workwithloop.com', 'Password123');
  });
  testData.tests.forEach((data: any) => {
    test(data.testName, async ({ page }) => {
      await page.click(`text=${data.navigateTo}`);

      const columnLocator = page.locator('.CommentOnlyBoardColumn', { hasText: data.column }); // Locate the column
      await columnLocator.waitFor({ state: 'visible' });
      const taskCardLocator = columnLocator.locator('.BoardCardLayout', {
        has: page.locator(`.BoardCardLayout-title >> text=${data.task}`),
      });
      await expect(taskCardLocator).toBeVisible(); // Verify visibility
      const tagContainerLocator = taskCardLocator.locator('.BoardCardLayout-customPropertiesAndTags');
      for (const tag of data.tags) {
        const tagLocator = tagContainerLocator.locator(`text=${tag}`);
        await expect(tagLocator).toBeVisible();
      }
    });
  });
});


