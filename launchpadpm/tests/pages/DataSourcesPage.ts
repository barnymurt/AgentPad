import { type Page, type Locator, expect } from '@playwright/test';

export class DataSourcesPage {
  readonly page: Page;
  readonly connectedSourcesTitle: Locator;
  readonly addSourceButton: Locator;
  readonly dataSourcesList: Locator;
  readonly emptyState: Locator;
  readonly addFirstSourceButton: Locator;
  readonly sourceNameInput: Locator;
  readonly sourceTypeSelect: Locator;
  readonly sourceAuthTypeSelect: Locator;
  readonly sourceLocationInput: Locator;
  readonly sourceApiKeyInput: Locator;
  readonly sourceUsernameInput: Locator;
  readonly sourcePasswordInput: Locator;
  readonly sourceConnectButton: Locator;
  readonly sourceCancelButton: Locator;
  readonly sourceModalClose: Locator;
  readonly sourceToggleSecret: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connectedSourcesTitle = page.getByTestId('connected-sources-title');
    this.addSourceButton = page.getByTestId('add-source-button');
    this.dataSourcesList = page.getByTestId('data-sources-list');
    this.emptyState = page.getByTestId('empty-data-sources');
    this.addFirstSourceButton = page.getByTestId('add-first-source-button');
    this.sourceNameInput = page.getByTestId('source-name-input');
    this.sourceTypeSelect = page.getByTestId('source-type-select');
    this.sourceAuthTypeSelect = page.getByTestId('source-auth-type-select');
    this.sourceLocationInput = page.getByTestId('source-location-input');
    this.sourceApiKeyInput = page.getByTestId('source-api-key-input');
    this.sourceUsernameInput = page.getByTestId('source-username-input');
    this.sourcePasswordInput = page.getByTestId('source-password-input');
    this.sourceConnectButton = page.getByTestId('source-connect-button');
    this.sourceCancelButton = page.getByTestId('source-cancel-button');
    this.sourceModalClose = page.getByTestId('source-modal-close');
    this.sourceToggleSecret = page.getByTestId('source-toggle-secret');
  }

  async goto() {
    await this.page.goto('/settings/data-sources');
  }

  async openAddForm() {
    await this.addSourceButton.click();
  }

  async addDataSource(config: {
    name: string;
    type: string;
    authType?: string;
    location: string;
    apiKey?: string;
    username?: string;
    password?: string;
  }) {
    await this.openAddForm();
    await this.sourceNameInput.fill(config.name);
    await this.sourceTypeSelect.selectOption(config.type);
    
    if (config.authType && config.authType !== 'none') {
      await this.sourceAuthTypeSelect.selectOption(config.authType);
      
      if (config.authType === 'apiKey' && config.apiKey) {
        await this.sourceApiKeyInput.fill(config.apiKey);
      } else if (config.authType === 'basic') {
        if (config.username) await this.sourceUsernameInput.fill(config.username);
        if (config.password) await this.sourcePasswordInput.fill(config.password);
      }
    }
    
    await this.sourceLocationInput.fill(config.location);
    await this.sourceConnectButton.click();
  }

  async removeDataSource(id: string) {
    const removeButton = this.page.getByTestId(`remove-source-${id}`);
    await removeButton.click();
    await this.page.waitForTimeout(500);
  }

  async getDataSourceByName(name: string): Promise<Locator> {
    return this.page.locator(`[data-testid="data-source-${name}"]`);
  }

  async expectEmptyStateVisible() {
    await expect(this.emptyState).toBeVisible();
  }

  async expectSourceInList(name: string) {
    await expect(this.dataSourcesList.getByText(name)).toBeVisible();
  }
}
