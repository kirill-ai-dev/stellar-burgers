import path from 'node:path';

import { expect, test, type Locator, type Page } from '@playwright/test';

const harPath = path.join(process.cwd(), 'tests/hars/constructor.har');
const bunName = 'Краторная булка N-200i';
const mainName = 'Мясо бессмертных моллюсков Protostomia';
const orderNumber = '4242';

const getIngredientCard = (page: Page, name: string): Locator =>
  page.locator('li').filter({ hasText: name });

test.describe('Страница конструктора бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR(harPath, {
      notFound: 'abort',
      update: false,
      url: '**/api/**',
    });
    await page.goto('/');
    await expect(page.getByText(bunName, { exact: true })).toBeVisible();
  });

  test('добавляет булку и начинку в конструктор', async ({ page }) => {
    await getIngredientCard(page, bunName)
      .getByRole('button', { name: 'Добавить' })
      .click();
    await getIngredientCard(page, mainName)
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(page.getByTestId('constructor-bun-1')).toContainText(bunName);
    await expect(page.getByTestId('constructor-bun-2')).toContainText(bunName);
    await expect(page.getByTestId('constructor-ingredients')).toContainText(mainName);
  });

  test('открывает модальное окно выбранного ингредиента и закрывает его', async ({
    page,
  }) => {
    const ingredientCard = getIngredientCard(page, mainName);

    await ingredientCard.getByRole('link').click();
    await expect(page.getByRole('heading', { name: mainName })).toBeVisible();
    await expect(page.getByText('300', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Закрыть' }).click();
    await expect(page.getByRole('heading', { name: mainName })).toBeHidden();

    await ingredientCard.getByRole('link').click();
    await expect(page.getByRole('heading', { name: mainName })).toBeVisible();
    await page.getByTestId('modal-overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.getByRole('heading', { name: mainName })).toBeHidden();
  });

  test('создаёт заказ, показывает его номер и очищает конструктор', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
      document.cookie = 'accessToken=Bearer fake-access-token; path=/';
    });
    await page.reload();
    await expect(page.getByText(bunName, { exact: true })).toBeVisible();

    await getIngredientCard(page, bunName)
      .getByRole('button', { name: 'Добавить' })
      .click();
    await getIngredientCard(page, mainName)
      .getByRole('button', { name: 'Добавить' })
      .click();
    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByTestId('order-number')).toHaveText(orderNumber);
    await expect(page.getByTestId('constructor-bun-1')).toHaveCount(0);
    await expect(page.getByTestId('constructor-bun-2')).toHaveCount(0);
    await expect(page.getByTestId('constructor')).toContainText('Выберите начинку');

    await page.getByRole('button', { name: 'Закрыть' }).click();
    await expect(page.getByTestId('order-number')).toHaveCount(0);
  });
});
