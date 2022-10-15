import { expect, Locator, Page } from '@playwright/test';

export class searchResultPage {
  readonly page: Page;
  readonly resultsFor: Locator;
  

  constructor(page: Page) {
    this.page = page;   
    this.resultsFor = page.locator('h1', { hasText: 'results for' }); 
  }

}