describe('page tags', function () {
    let page;

    // as we have a browser in the global node object, for this test lets spin up a new page/tab to work with
    before(async function () {
        page = await browser.newPage();
        await page.goto(appUrl);
    });

    // after the test close that page/tab
    after(async function () {
        await page.close();
    })

    it('should have a title tag', async function () {
        const title = await page.title();
        expect(title).to.be.a('string');
    });

    it('should have a language attribute', async function () {
        const attr = await page.evaluate(() => {
            return document.querySelector('html').getAttribute('lang');
        });
        expect(attr).to.be.a('string');
    });

});
