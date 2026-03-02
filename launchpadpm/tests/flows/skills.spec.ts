import { test, expect } from '@playwright/test';
import { SkillsPage } from '../pages';

test.describe('Skills', () => {
  test('should navigate to skills page', async ({ page }) => {
    const skillsPage = new SkillsPage(page);
    await skillsPage.goto();
    
    await expect(page).toHaveURL('/skills');
  });
});
