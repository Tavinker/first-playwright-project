const { test, expect } = require('@playwright/test');

test('1 - acessing the page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
});

/*adicionar mais cenários:
- login com campos vazios
- login somente com username correto preenchido
- login comente com password correto preenchido
*/

test('2 - submiting wrong username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // await page.waitForTimeout(5000);
    await page.locator('#user-name').fill('standard_user123');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('3 - submiting wrong password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce010203');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('4 - submiting wrong username and password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user123');
    await page.locator('#password').fill('secret_sauce010203');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('5 - submiting correct credentials and doing the login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
});

