import { test, expect } from '@playwright/test';
import { DealsPage } from '../pages/dealsPage';
import { homePage } from '../pages/homepage';
import {  } from '../pages/searchResultPage';


test('Check Deals : clicking on check deals should return Featured deals.', async ({ page }) => {
  const homepage = new homePage(page);
  const dealpage = new DealsPage(page);

  await homepage.goto();
  await homepage.clickDeals()
  await expect(page).toHaveURL('https://www.ebay.com.au/deals');
  await expect(dealpage.featuredDeals).toBeVisible();
});
