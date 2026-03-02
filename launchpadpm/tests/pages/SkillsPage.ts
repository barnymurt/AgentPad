import { type Page, type Locator, expect } from '@playwright/test';

export class SkillsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/skills');
  }

  async getSkillCard(skillName: string): Promise<Locator> {
    return this.page.locator(`[data-testid*="skill"]`).filter({ hasText: skillName });
  }
}
