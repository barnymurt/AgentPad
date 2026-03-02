import { test, expect } from '@playwright/test';
import { DashboardPage, DataSourcesPage } from '../pages';

test.describe('Navigation', () => {
  test('should have quick action links visible on dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    
    await expect(dashboardPage.runSkillLink).toBeVisible();
    await expect(dashboardPage.metricsLink).toBeVisible();
    await expect(dashboardPage.exportNotionLink).toBeVisible();
  });

  test('should navigate to data sources settings page directly', async ({ page }) => {
    const dataSourcesPage = new DataSourcesPage(page);
    await dataSourcesPage.goto();
    
    await expect(page).toHaveURL('/settings/data-sources');
  });
});
