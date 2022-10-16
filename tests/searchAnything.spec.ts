import { test, expect } from '@playwright/test';
import { homePage } from '../pages/homepage';
import { searchResultPage } from '../pages/searchResultPage';


test('Search : search anything should return expected search results.', async ({ page }) => {
  const homepage = new homePage(page);
  const searchpage = new searchResultPage(page);

  await homepage.goto();
  await homepage.enterSearchCriteria('ps3');
  await homepage.checkPopUpToDismiss();
  await homepage.clickSearch();    
  await expect(searchpage.resultsFor).toContainText('ps3');  
});
