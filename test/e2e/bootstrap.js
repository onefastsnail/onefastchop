const puppeteer = require('puppeteer');
const { expect } = require('chai');

// puppeteer options
const opts = {
    headless: true,
    slowMo: 100,
    timeout: 80000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
};

/*
    before we run our tests lets expose some variables such as the browser and chai expect interface
    so we dont need to require them in our tests
*/
before(async function () {
    global.expect = expect;
    global.browser = await puppeteer.launch(opts);
    global.appUrl = 'http://localhost:8080';
});

/*
    close browser and reset global variables after each test
*/
after(function () {
    browser.close();
});
