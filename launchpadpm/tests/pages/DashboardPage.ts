import { type Page, type Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly validationInput: Locator;
  readonly validateButton: Locator;
  readonly startProjectButton: Locator;
  readonly projectNameInput: Locator;
  readonly createProjectButton: Locator;
  readonly quickActions: Locator;
  readonly newProjectLink: Locator;
  readonly runSkillLink: Locator;
  readonly exportNotionLink: Locator;
  readonly metricsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.validationInput = page.getByTestId('validation-input');
    this.validateButton = page.getByTestId('validate-button');
    this.startProjectButton = page.getByTestId('start-project-button');
    this.projectNameInput = page.getByTestId('project-name-input');
    this.createProjectButton = page.getByTestId('create-project-button');
    this.quickActions = page.getByTestId('quick-actions');
    this.newProjectLink = page.getByTestId('quick-action-new-project');
    this.runSkillLink = page.getByTestId('quick-action-run-skill');
    this.exportNotionLink = page.getByTestId('quick-action-export-notion');
    this.metricsLink = page.getByTestId('quick-action-view-dashboard');
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async validateIdea(idea: string) {
    await this.validationInput.fill(idea);
    await this.validateButton.click();
  }

  async createProject(name: string, idea?: string) {
    await this.startProjectButton.click();
    await this.projectNameInput.fill(name);
    await this.createProjectButton.click();
  }

  async expectValidationInputVisible() {
    await expect(this.validationInput).toBeVisible();
  }

  async expectQuickActionsVisible() {
    await expect(this.quickActions).toBeVisible();
  }
}
