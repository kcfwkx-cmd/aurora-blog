const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const wsFile = 'D:/rrwang/contents/aurora/.browser_ws';
  let browser;
  try {
    const ws = fs.readFileSync(wsFile, 'utf8').trim();
    browser = await chromium.connect(ws);
  } catch (e) {
    const srv = await chromium.launchServer({ headless: false });
    fs.writeFileSync(wsFile, srv.wsEndpoint());
    browser = await chromium.connect(srv.wsEndpoint());
  }
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'D:/rrwang/contents/aurora/screenshots/homepage.png' });
  await page.screenshot({ path: 'D:/rrwang/contents/aurora/screenshots/banner_top.png', clip: { x: 0, y: 0, width: 1440, height: 320 } });
  console.log('done');
  await page.close();
})();
