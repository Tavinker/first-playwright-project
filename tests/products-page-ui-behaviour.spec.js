const { test, expect } = require('../fixtures/auth.fixture');

/* scenarios to build:
1: validating that page starts with (A to Z) filter selected (done)
2: validating (A to Z) filter
3: validating (Z to A) filter
4: validating (price: low to high) filter
5: validating (price: high to low) filter
6: checking that all items are navigable clicking on image
7: checking that all items are navigable click on item title
8: checking that all item title are highlighted when the cursor hovers over
9: checking that item title in the main page is the same as detail item page
10: checking that item description in the main page is the same as detail item page
11: checking that item picture in the main page is the same as detail item page */


test('1: validating that page starts with (A to Z) filter selected', async ({ loggedPage }) => { //referenciando o "loggedPage" = função criada na fixture "auth.fixture.js" para autenticar na página globalmente.
    
    const firstItem = loggedPage
    .locator('.inventory_item_name') //busca por todos os elementos com a classe "inventory_item_name", ou seja, todos os produtos
    .first(); //pega apenas o primeiro

    await expect(firstItem).toHaveText('Sauce Labs Backpack'); //localizando que o primeiro elemento seja "Sauce Labs Backpack" 
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az'); //procura o dropdown de filtros e valida se o selcionado é o "az (Name (A to Z))"
});