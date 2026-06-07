const base = require('@playwright/test');

exports.test = base.test.extend({
  loggedPage: async ({ page }, use) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await use(page);
  }
});

exports.expect = base.expect;

/* Este arquivo é uma "pré-condição", que realiza o login automaticamente em cada arquivo de teste. É uma forma global de autenticar 
na página sem precisar escrever um test case de login para cada vez que eu for testar algo em um arquivo diferente. */