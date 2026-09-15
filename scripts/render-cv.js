const puppeteer = require('puppeteer');
const path = require('path');

const rev = (process.env.GITHUB_SHA || 'local').slice(0, 7);
const built = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';

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
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="font-size:6.5px; width:100%; text-align:center; color:#999; margin-top:2px;">
        Revision: ${rev} &middot; Built: ${built} &middot; Source: github.com/sadchikovsg/sadchikovsg.github.io
      </div>`,
    margin: { top: '8mm', right: '8mm', bottom: '8mm', left: '8mm' },
  });
  await browser.close();
  console.log('PDF rendered OK (rev ' + rev + ')');
})();
