import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages';

test.describe('Dashboard', () => {
  test('should display validation input and quick actions', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    
    await dashboardPage.expectValidationInputVisible();
    await dashboardPage.expectQuickActionsVisible();
  });

  test('should show project creation form when clicking start project', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    
    await dashboardPage.startProjectButton.click();
    
    await expect(dashboardPage.projectNameInput).toBeVisible();
    await expect(dashboardPage.createProjectButton).toBeVisible();
  });

  test('should validate idea input accepts text', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    
    const testIdea = 'A platform for AI-powered product development';
    await dashboardPage.validationInput.fill(testIdea);
    
    await expect(dashboardPage.validationInput).toHaveValue(testIdea);
  });

  test('should validate button be disabled when input is empty', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    
    await expect(dashboardPage.validateButton).toBeDisabled();
  });

  test('should validate button be enabled when input has text', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    
    await dashboardPage.validationInput.fill('Test idea');
    
    await expect(dashboardPage.validateButton).toBeEnabled();
  });

  test('should quick action links be visible and clickable', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    
    await expect(dashboardPage.newProjectLink).toBeVisible();
    await expect(dashboardPage.runSkillLink).toBeVisible();
    await expect(dashboardPage.exportNotionLink).toBeVisible();
    await expect(dashboardPage.metricsLink).toBeVisible();
  });
});
