const { test, expect } = require('../fixtures/auth.fixture');

// Documentation for the scenario list: [products-page-ui-behaviour.md](./testcases/products-page-ui-behaviour.md)


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


test('7: validating that all items are navigable clicking on image using (Z to A) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');
    
    await (loggedPage.locator('[data-test="inventory-item-test.allthethings()-t-shirt-(red)-img"]')).click(); //clica na imagem do produto "Test.allTheThings() T-Shirt (Red)"
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=3'); //valida se ao clicar na imagem, o usuário é redirecionado para a página de detalhe do produto
    await loggedPage.goBack(); //volta para a página de produtos
    await (loggedPage.locator('[data-test="product-sort-container"]')). selectOption('za'); //procura o dropdown de filtros e seleciona o "za (Name (Z to A))"
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za'); //valida se o filtro Z to A continua selecionado após voltar da página de detalhe do produto

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-onesie-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=2');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-fleece-jacket-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');
    
    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');
    
    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');
    
    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-backpack-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4'); 
});


test('8: validating that all items are navigable clicking on image using (price: low to high) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-onesie-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=2');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('[data-test="inventory-item-test.allthethings()-t-shirt-(red)-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=3');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')). selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-backpack-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4'); 
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')). selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-fleece-jacket-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');
});

test('9: validating that all items are navigable clicking on image using (price: high to low) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-fleece-jacket-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-backpack-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('[data-test="inventory-item-test.allthethings()-t-shirt-(red)-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=3');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-bike-light-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('[data-test="inventory-item-sauce-labs-onesie-img"]')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=2');
});

test('10: validating that all items are navigable clicking on item title using (A to Z) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az'); //procura o dropdown de filtros e seleciona o "az (Name (A to Z))"
    await expect (loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az'); //valida se o filtro selecionado é o "az (Name (A to Z))"

    await (loggedPage.locator('#item_4_title_link')).click(); //clica no título "Sauce Labs Backpack"
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4'); //valida se foi redirecionado para a página de detalhes do "Sauce Labs Backpack"
    await loggedPage.goBack(); //retorna para a página principal de produtos
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az'); //seleciona novamente o filtro "az (Name (A to Z))"
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az'); //valida se o filtro selecionado continua sendo "az (Name (A to Z))"

    await (loggedPage.locator('#item_0_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    await (loggedPage.locator('#item_1_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    await (loggedPage.locator('#item_5_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    await (loggedPage.locator('#item_2_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=2');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    await (loggedPage.locator('#item_3_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=3');
});

test('11: validating that all items are navigable clicking on item title using (Z to A) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    await (loggedPage.locator('#item_3_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=3');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    await (loggedPage.locator('#item_2_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=2');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    await (loggedPage.locator('#item_5_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    await (loggedPage.locator('#item_1_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    await (loggedPage.locator('#item_0_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    await (loggedPage.locator('#item_4_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
});

test('12: validating that all items are navigable clicking on item title using (price: low to high) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('#item_2_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=2');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('#item_0_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('#item_1_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('#item_3_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=3');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('#item_4_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    await (loggedPage.locator('#item_5_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');
});

test('13: validating that all items are navigable clicking on item title using (price: high to low) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('#item_5_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=5');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('#item_4_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('#item_1_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('#item_3_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=3');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('#item_0_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=0');
    await loggedPage.goBack();
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    await (loggedPage.locator('#item_2_title_link')).click();
    await expect(loggedPage).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=2');
});


test('14: validating that all item titles are highlighted when the cursor hovers over using (A to Z) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('az');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    const corInicialBackpack = await loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color); //captura a cor inicial do título do produto "Sauce Labs Backpack"
    await (loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]')).hover(); //hover sobre o título do produto "Sauce Labs Backpack"
    const corDepoisDoHoverBackpack = await loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color); //captura a cor do título do produto "Sauce Labs Backpack" após o hover
    await expect(corDepoisDoHoverBackpack).not.toEqual(corInicialBackpack); //verifica que a cor mudou após o hover

    const corInicialBikeLight = await loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBikeLight = await loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBikeLight).not.toEqual(corInicialBikeLight);

    const corInicialBoltTShirt = await loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBoltTShirt = await loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBoltTShirt).not.toEqual(corInicialBoltTShirt);

    const corInicialFleeceJacket = await loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverFleeceJacket = await loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverFleeceJacket).not.toEqual(corInicialFleeceJacket);

    const corInicialOnesie = await loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverOnesie = await loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverOnesie).not.toEqual(corInicialOnesie);

    const corInicialRedTShirt = await loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverRedTShirt = await loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverRedTShirt).not.toEqual(corInicialRedTShirt);
});


test('15: validating that all item titles are highlighted when the cursor hovers over using (Z to A) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('za');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('za');

    const corInicialRedTShirt = await loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color); //captura a cor inicial do título do produto "Test.allTheThings() T-Shirt (Red)"
    await (loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]')).hover(); //hover sobre o título do produto "Test.allTheThings() T-Shirt (Red)"
    const corDepoisDoHoverRedTShirt = await loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color); //captura a cor do título após o hover
    await expect(corDepoisDoHoverRedTShirt).not.toEqual(corInicialRedTShirt); //verifica que a cor mudou após o hover

    const corInicialOnesie = await loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverOnesie = await loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverOnesie).not.toEqual(corInicialOnesie);

    const corInicialFleeceJacket = await loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverFleeceJacket = await loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverFleeceJacket).not.toEqual(corInicialFleeceJacket);

    const corInicialBoltTShirt = await loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBoltTShirt = await loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBoltTShirt).not.toEqual(corInicialBoltTShirt);

    const corInicialBikeLight = await loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBikeLight = await loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBikeLight).not.toEqual(corInicialBikeLight);

    const corInicialBackpack = await loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBackpack = await loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBackpack).not.toEqual(corInicialBackpack);
});


test('16: validating that all item titles are highlighted when the cursor hovers over using (price: low to high) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('lohi');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('lohi');

    const corInicialOnesie = await loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color); //captura a cor inicial do título do produto "Sauce Labs Onesie"
    await (loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]')).hover(); //hover sobre o título do produto "Sauce Labs Onesie"
    const corDepoisDoHoverOnesie = await loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color); //captura a cor do título após o hover
    await expect(corDepoisDoHoverOnesie).not.toEqual(corInicialOnesie); //verifica que a cor mudou após o hover

    const corInicialBikeLight = await loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBikeLight = await loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBikeLight).not.toEqual(corInicialBikeLight);

    const corInicialBoltTShirt = await loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBoltTShirt = await loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBoltTShirt).not.toEqual(corInicialBoltTShirt);

    const corInicialRedTShirt = await loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverRedTShirt = await loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverRedTShirt).not.toEqual(corInicialRedTShirt);

    const corInicialBackpack = await loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBackpack = await loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBackpack).not.toEqual(corInicialBackpack);

    const corInicialFleeceJacket = await loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverFleeceJacket = await loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverFleeceJacket).not.toEqual(corInicialFleeceJacket);
});


test('17: validating that all item titles are highlighted when the cursor hovers over using (price: high to low) filter', async ({ loggedPage }) => {
    await (loggedPage.locator('[data-test="product-sort-container"]')).selectOption('hilo');
    await expect(loggedPage.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    const corInicialFleeceJacket = await loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color); //captura a cor inicial do título do produto "Sauce Labs Fleece Jacket"
    await (loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]')).hover(); //hover sobre o título do produto "Sauce Labs Fleece Jacket"
    const corDepoisDoHoverFleeceJacket = await loggedPage.locator('#item_5_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color); //captura a cor do título após o hover
    await expect(corDepoisDoHoverFleeceJacket).not.toEqual(corInicialFleeceJacket); //verifica que a cor mudou após o hover

    const corInicialBackpack = await loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBackpack = await loggedPage.locator('#item_4_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBackpack).not.toEqual(corInicialBackpack);

    const corInicialBoltTShirt = await loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBoltTShirt = await loggedPage.locator('#item_1_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBoltTShirt).not.toEqual(corInicialBoltTShirt);

    const corInicialRedTShirt = await loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverRedTShirt = await loggedPage.locator('#item_3_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverRedTShirt).not.toEqual(corInicialRedTShirt);

    const corInicialBikeLight = await loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverBikeLight = await loggedPage.locator('#item_0_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverBikeLight).not.toEqual(corInicialBikeLight);

    const corInicialOnesie = await loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await (loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]')).hover();
    const corDepoisDoHoverOnesie = await loggedPage.locator('#item_2_title_link [data-test="inventory-item-name"]').evaluate((element) => getComputedStyle(element).color);
    await expect(corDepoisDoHoverOnesie).not.toEqual(corInicialOnesie);
});