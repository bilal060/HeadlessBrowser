const puppeteer = require('puppeteer');
const PageURL = `https://auth.ticketmaster.com/as/authorization.oauth2?client_id=8bf7204a7e97.web.ticketmaster.us&response_type=code&scope=openid%20profile%20phone%20email%20tm&redirect_uri=https://identity.ticketmaster.com/exchange&visualPresets=tm&lang=en-us&placementId=discovery&hideLeftPanel=false&integratorId=prd1224.ccpDiscovery&intSiteToken=tm-us&deviceId=CSBx0gDBD7G4t7e1t7qxube6s7L6BkwZzM%2Bf1w`;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        timeout: 10000,
        devtools: true,
        args: ['--no-sandbox', '--proxy-server=https=45.41.15.210:229842']
    });
    const user = 'jmoult';
    const password = 'z2RGCMyN';
    const page = await browser.newPage();
    await page.authenticate({ username: user, password: password });
    await page.goto(PageURL, { waitUntil: "load" });

    const [response] = await Promise.all([
        page.waitForNavigation(),
        await page.click('.sc-pkGMj button', { waitUntil: 'load' })
    ]);

    setTimeout(() => {
        page.$eval('input[name=email]', e => e.value = 'demo@demo.com')
        page.$eval('input[name=password]', e => e.value = 'Admin@123')
        page.$eval('input[name=firstName]', e => e.value = 'Muhammad')
        page.$eval('input[name=lastName]', e => e.value = 'Numan')
    }, 5000);


    // await page.click('.sc-pkGMj button', { delay: 5000 })
    // page.waitForSelector('input[name=email]')
    // await page.$eval('input[name=email]', e => e.value = 'demo@demo.com');

    // page.waitForSelector('input[name=password]')
    // await page.$eval('input[name=password]', e => e.value = 'Admin@123');

    // page.waitForSelector('input[name=firstName]')
    // await page.$eval('input[name=firstName]', e => e.value = 'Muhammad');

    // page.waitForSelector('input[name=lastName]')
    // await page.$eval('input[name=lastName]', e => e.value = 'Numan')



    await page.$$eval('input', (el) => {
        el.forEach((e) => {
            if (e.name === 'email') {
                e.value = 'demo@demo.com'
            }
            else if (e.name === "password") {
                e.value = 'Admin@123'
            }
            else if (e.name === 'firstName') {
                e.value = 'Muhammad'
            }
            else if (e.name === 'lastName') {
                e.value = 'Numan'
            }
            else if (e.name === 'postalCode') {
                e.value = '123465'
            }
        });
    });


    let title = await page.title();
    console.log("title:" + title);
    // await browser.close();
})();