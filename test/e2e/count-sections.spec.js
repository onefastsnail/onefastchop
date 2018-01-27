describe('count sections', function () {
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

    it('should have sections', async function () {

        // Extract the results from the page
        const sections = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('section'));
        });

        console.log(`${sections.length} sections found`);
        expect(sections).to.be.an('array');

    });

});
