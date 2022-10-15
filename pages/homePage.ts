import { expect, Locator, Page } from '@playwright/test';

export class homePage {
  readonly page: Page;
  readonly searchAnything: Locator;
  readonly linkDeals: Locator;
  readonly searchButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.searchAnything = page.getByPlaceholder('Search for anything');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.linkDeals = page.getByRole('link', { name: 'eBay Deals' }).first();
  }

  async goto() {
    await this.page.goto('/');
  }

  async enterSearchCriteria(text:string) {
    await this.searchAnything.click();
    await this.searchAnything.fill(text);    
  }

  async clickSearch() {
    await this.searchButton.click();    
  }

  async clickDeals() {
    await this.linkDeals.click();    
  }
}