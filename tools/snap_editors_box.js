const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const wsFile = 'D:/rrwang/contents/aurora/.browser_ws';
  let browser;
  try {
    const ws = fs.readFileSync(wsFile, 'utf8').trim();
    browser = await chromium.connectOverCDP(ws);
  } catch (e) {
    const srv = await chromium.launchServer({ headless: false });
    fs.writeFileSync(wsFile, srv.wsEndpoint());
    browser = await chromium.connect(srv.wsEndpoint());
  }
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const btn = await page.$('#ob-random-btn');
  const plate = await page.$('.ob-gradient-plate');
  const btnBox = btn ? await btn.boundingBox() : null;
  const plateBox = plate ? await plate.boundingBox() : null;
  console.log('btn:', JSON.stringify(btnBox));
  console.log('plate:', JSON.stringify(plateBox));

  if (plateBox) {
    await page.screenshot({
      path: 'D:/rrwang/contents/aurora/tools/snap_editors_box.png',
      clip: { x: plateBox.x - 10, y: plateBox.y - 10, width: plateBox.width + 20, height: plateBox.height + 20 }
    });
  }
  await page.close();
})();
