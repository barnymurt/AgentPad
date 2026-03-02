import { type Page, type Locator, expect } from '@playwright/test';

export class SquadsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/squads');
  }

  async getSquadCard(squadName: string): Promise<Locator> {
    return this.page.locator(`[data-testid*="squad"]`).filter({ hasText: squadName });
  }
}
