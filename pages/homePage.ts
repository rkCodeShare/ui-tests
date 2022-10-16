import { expect, Locator, Page } from '@playwright/test';

export class homePage {
  readonly page: Page;
  readonly searchAnything: Locator;
  readonly linkDeals: Locator;
  readonly searchButton: Locator;
  readonly googleAccountPopup: Locator;
  readonly btnClose: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.searchAnything = page.getByPlaceholder('Search for anything');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.linkDeals = page.getByRole('link', { name: 'eBay Deals' }).first();
    this.googleAccountPopup = page.frameLocator('#google-ebay').frameLocator('iframe').getByText('Use your Google Account to sign in to eBay');
    this.btnClose = page.frameLocator('#google-ebay').frameLocator('iframe').getByRole('button', { name: 'Close' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async checkPopUpToDismiss() {    
    if (await this.googleAccountPopup.isVisible()){
      await this.btnClose.click();
    }    
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