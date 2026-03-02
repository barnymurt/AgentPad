import { test, expect } from '@playwright/test';
import { SquadsPage } from '../pages';

test.describe('Squads', () => {
  test('should navigate to squads page', async ({ page }) => {
    const squadsPage = new SquadsPage(page);
    await squadsPage.goto();
    
    await expect(page).toHaveURL('/squads');
  });
});
