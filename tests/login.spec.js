const { test, expect } = require('@playwright/test');

test('1 - acessing the page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
});

test('2 - try to login without credentials (username and password)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('3 - try to login without username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('4 - try to login without password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('5 - submiting wrong username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // await page.waitForTimeout(5000);
    await page.locator('#user-name').fill('standard_user123');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('6 - submiting wrong password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce010203');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('7 - submiting wrong username and password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user123');
    await page.locator('#password').fill('secret_sauce010203');
    await page.locator('#login-button').click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('8 - submiting correct credentials and doing the login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');
});

