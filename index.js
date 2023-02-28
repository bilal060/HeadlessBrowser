const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
    headless:false,
    ignoreHTTPSErrors:true,
    devtools:true,
    timeout:10000,
    args: ['--no-sandbox','--proxy-server=https=45.41.15.210:229842']
 });
 const user='jmoult';
 const password='z2RGCMyN';
 const page = await browser.newPage();
 await page.authenticate({username:user, password:password});
 await page.goto('https://www.ticketmaster.com/member/login',{timeout:3000,waitUntil:'load'});
 await page.waitForSelector('input[name=email]',{timeout:3000,waitUntil:'load'});

 await page.$eval('input[name=email]',
 await browser.close();
})();