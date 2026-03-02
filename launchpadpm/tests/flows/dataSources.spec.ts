import { test, expect } from '@playwright/test';
import { DataSourcesPage } from '../pages';

test.describe('Data Sources', () => {
  test('should display data sources page', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    await expect(dataSourcesPage.connectedSourcesTitle).toBeVisible();
    await expect(dataSourcesPage.addSourceButton).toBeVisible();
    
    const isEmpty = await dataSourcesPage.emptyState.isVisible().catch(() => false);
    const hasList = await dataSourcesPage.dataSourcesList.isVisible().catch(() => false);
    expect(isEmpty || hasList).toBeTruthy();
  });

  test('should open add source form modal', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    await dataSourcesPage.openAddForm();
    
    await expect(dataSourcesPage.sourceNameInput).toBeVisible();
    await expect(dataSourcesPage.sourceTypeSelect).toBeVisible();
    await expect(dataSourcesPage.sourceLocationInput).toBeVisible();
  });

  test('should show auth fields when apiKey auth type selected', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    await dataSourcesPage.openAddForm();
    
    await dataSourcesPage.sourceAuthTypeSelect.selectOption('apiKey');
    
    await expect(dataSourcesPage.sourceApiKeyInput).toBeVisible();
  });

  test('should show username and password fields when basic auth selected', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    await dataSourcesPage.openAddForm();
    
    await dataSourcesPage.sourceAuthTypeSelect.selectOption('basic');
    
    await expect(dataSourcesPage.sourceUsernameInput).toBeVisible();
    await expect(dataSourcesPage.sourcePasswordInput).toBeVisible();
  });

  test('should close add source modal when cancel clicked', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    await dataSourcesPage.openAddForm();
    
    await expect(dataSourcesPage.sourceNameInput).toBeVisible();
    
    await dataSourcesPage.sourceCancelButton.click();
    
    await expect(dataSourcesPage.sourceNameInput).not.toBeVisible();
  });

  test('should close add source modal when close button clicked', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    await dataSourcesPage.openAddForm();
    
    await expect(dataSourcesPage.sourceNameInput).toBeVisible();
    
    await dataSourcesPage.sourceModalClose.click();
    
    await expect(dataSourcesPage.sourceNameInput).not.toBeVisible();
  });

  test('should toggle password visibility', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    await dataSourcesPage.openAddForm();
    await dataSourcesPage.sourceAuthTypeSelect.selectOption('apiKey');
    
    const apiKeyInput = dataSourcesPage.sourceApiKeyInput;
    await apiKeyInput.fill('secret-api-key');
    
    await expect(apiKeyInput).toHaveAttribute('type', 'password');
    
    await dataSourcesPage.sourceToggleSecret.click();
    
    await expect(apiKeyInput).toHaveAttribute('type', 'text');
  });

  test('should add a new spreadsheet data source', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    const timestamp = Date.now();
    await dataSourcesPage.addDataSource({
      name: `Test Spreadsheet ${timestamp}`,
      type: 'spreadsheet',
      authType: 'none',
      location: 'https://docs.google.com/spreadsheets/d/test',
    });
    
    await expect(page.locator('text=Data source connected successfully')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);
    
    await dataSourcesPage.expectSourceInList(`Test Spreadsheet ${timestamp}`);
  });

  test('should add an API data source with API key', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    const timestamp = Date.now();
    await dataSourcesPage.addDataSource({
      name: `Test API ${timestamp}`,
      type: 'api',
      authType: 'apiKey',
      location: 'https://api.example.com/v1/data',
      apiKey: 'test-api-key-123',
    });
    
    await expect(page.locator('text=Data source connected successfully')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(500);
    
    await dataSourcesPage.expectSourceInList(`Test API ${timestamp}`);
  });
});
