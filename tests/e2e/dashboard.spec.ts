import { expect, test } from '@playwright/test'

test('dashboard opens and shows the DataVisionLab title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /DataVisionLab 数据可视化实验室/ })).toBeVisible()
  await expect(page.getByText('Mock 数据源')).toBeVisible()
})
