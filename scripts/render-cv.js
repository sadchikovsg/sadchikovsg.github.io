const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve('assets/cv-one-page.html'), {
    waitUntil: 'networkidle0',
  });
  await page.pdf({
    path: 'assets/CV_Sadchikovsg_DevOps.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
  });
  await browser.close();
  console.log('PDF rendered OK');
})();
