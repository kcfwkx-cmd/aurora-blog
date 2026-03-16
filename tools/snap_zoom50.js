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
  await page.setViewportSize({ width: 2880, height: 1800 });
  await page.goto('http://localhost:4000', { waitUntil: 'networkidle' });
  // 等按钮注入
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'D:/rrwang/contents/aurora/tools/snap_zoom50.png' });
  // 裁剪按钮区域
  const btn = await page.$('#ob-random-btn');
  if (btn) {
    const box = await btn.boundingBox();
    console.log('btn box:', JSON.stringify(box));
    await page.screenshot({
      path: 'D:/rrwang/contents/aurora/tools/snap_btn_zoom50.png',
      clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 20), width: box.width + 40, height: box.height + 40 }
    });
  } else {
    console.log('btn not found');
  }
  await page.close();
  console.log('done');
})();
