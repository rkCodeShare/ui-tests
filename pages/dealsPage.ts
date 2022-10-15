// playwright-dev-page.ts
import { expect, Locator, Page } from '@playwright/test';

export class DealsPage {
  readonly page: Page;
  readonly featuredDeals: Locator;

  constructor(page: Page) {
    this.page = page;
    this.featuredDeals = page.getByText('Featured Deals');
  }  
}