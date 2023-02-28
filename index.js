const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        devtools: true,
        timeout: 3000,
        args: ['--no-sandbox', '--proxy-server=https=45.41.15.210:229842']
    });
    const user = 'jmoult';
    const password = 'z2RGCMyN';
    const page = await browser.newPage();
    await page.authenticate({ username: user, password: password });
    await page.goto('https://www.google.com/');
     await page.waitForSelector('input[name=q]');
     await page.$eval('input[name=q]', el => el.value = 'demo@demo.com');

    let title = await page.title();
    console.log("title:" + title);
    await browser.close();
})();