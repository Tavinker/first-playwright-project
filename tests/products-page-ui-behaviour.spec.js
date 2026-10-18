const { test, expect } = require('../fixtures/auth.fixture');

/* scenarios to build:
1: validating that page starts with (A to Z) filter selected ✓
2: validating (A to Z) filter ✓
3: validating (Z to A) filter ✓
4: validating (price: low to high) filter ✓
5: validating (price: high to low) filter ✓
6: validating that all items are navigable clicking on image using (A to Z) filter ✓
7: validating that all items are navigable clicking on image using (Z to A) filter
8: validating that all items are navigable clicking on image using (price: low to high) filter
9: validating that all items are navigable clicking on image using (price: high to low) filter
10: validating that all items are navigable click on item title
11: validating that all item title are highlighted when the cursor hovers over
12: validating that item title in the main page is the same as detail item page
13: validating that item description in the main page is the same as detail item page
14: validating that item picture in the main page is the same as detail item page */


test('1: validating that page starts with (A to Z) filter selected', async ({ loggedPage }) => { //referenciando o "loggedPage" = função criada na fixture "auth.fixture.js" para autenticar na página globalmente.
    await expect(loggedPage.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack') //Verifica se o primeiro produto exibido é o 'Sauce Labs Backpack'
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az'); //procura o dropdown de filtros e valida se o selcionado é o "az (Name (A to Z))"
});

test('2: validating (A to Z) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az'); //procura o dropdown de filtros e seleciona o "az (Name (A to Z))"
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az'); //valida se o filtro selecionado é o "az (Name (A to Z))"
    await expect (loggedPage.locator('.inventory_item_name')).toHaveText([ //valida se os produtos estão sendo exibidos na ordem alfabética correta (A to Z)
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
    ])
});

test('3: validating (Z to A) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za'); //procura o dropdown de filtros e seleciona o "az (Name (A to Z))"
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za'); //valida se o filtro selecionado é o "az (Name (A to Z))"
    await expect (loggedPage.locator('.inventory_item_name')).toHaveText([ //valida se os produtos estão sendo exibidos na ordem alfabética correta (A to Z)
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Onesie',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Bike Light',
    'Sauce Labs Backpack'
    ])
});

test('4: validating (price: low to high) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi'); //procura o dropdown de filtros e seleciona o "lohi (Price (Low to High))"
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi'); //valida se o filtro selecionado é o "lohi (Price (Low to High))"
    await expect (loggedPage.locator('[data-test="inventory-item-price"]')).toHaveText([ //valida se os produtos estão sendo exibidos na ordem crescente de valor (Low to High)
    '$7.99',
    '$9.99',
    '$15.99',
    '$15.99',
    '$29.99',
    '$49.99'
    ])
});

test('5: validating (price: high to low) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo'); //procura o dropdown de filtros e seleciona o "hilo (Price (High to Low))"
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo'); //valida se o filtro selecionado é o "hilo (Price (High to Low))"
    await expect (loggedPage.locator('[data-test="inventory-item-price"]')).toHaveText([ //valida se os produtos estão sendo exibidos na ordem decrescente de valor (High to Low)
    '$49.99',
    '$29.99',
    '$15.99',
    '$15.99',
    '$9.99',
    '$7.99'
    ])
});

test('6: validating that all items are navigable clicking on image using (A to Z) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-backpack-img"]')).click(); //clica na imagem do produto "Sauce Labs Backpack"
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4'); //valida se ao clicar na imagem do produto "Sauce Labs Backpack" o usuário é redirecionado para a página de detalhe do produto
    await loggedPage.goBack(); //volta para a página de produtos
    await (loggedPage.locator('[data-test="product-sort-container"]')). selectOption('az'); //procura o dropdown de filtros e seleciona o "az (Name (A to Z))"
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az'); //valida se o filtro A to Z continua selecionado após voltar da página de detalhe do produto

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');
    
    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-fleece-jacket-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-onesie-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=2');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');
    
    await (loggedPage.locator('[data-test="inventory-item-test.allthethings()-t-shirt-(red)-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=3');
});