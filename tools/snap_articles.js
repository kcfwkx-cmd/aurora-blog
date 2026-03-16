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

  // 正常视口截图（1440px）
  const page1 = await browser.newPage();
  await page1.setViewportSize({ width: 1440, height: 900 });
  await page1.goto('http://localhost:4000', { waitUntil: 'networkidle' });
  await page1.waitForTimeout(1500);
  await page1.screenshot({ path: 'D:/rrwang/contents/aurora/tools/snap_normal.png', fullPage: false });
  const btn1 = await page1.$('#ob-random-btn');
  if (btn1) {
    await btn1.scrollIntoViewIfNeeded();
    await page1.waitForTimeout(300);
    console.log('normal btn box:', JSON.stringify(await btn1.boundingBox()));
    await page1.screenshot({ path: 'D:/rrwang/contents/aurora/tools/snap_articles_normal.png' });
  }
  await page1.close();

  // 宽视口截图模拟50%缩放（2880px）
  const page2 = await browser.newPage();
  await page2.setViewportSize({ width: 2880, height: 1800 });
  await page2.goto('http://localhost:4000', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(1500);
  const btn2 = await page2.$('#ob-random-btn');
  if (btn2) {
    await btn2.scrollIntoViewIfNeeded();
    await page2.waitForTimeout(300);
    console.log('zoom50 btn box:', JSON.stringify(await btn2.boundingBox()));
    await page2.screenshot({ path: 'D:/rrwang/contents/aurora/tools/snap_articles_zoom50.png' });
  }
  await page2.close();

  console.log('done');
})();
