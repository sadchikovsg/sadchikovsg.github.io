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
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  });
  await browser.close();
  console.log('PDF rendered OK');
})();
