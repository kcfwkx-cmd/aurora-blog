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

  const result = await page.evaluate(() => {
    const body = document.body;
    const cs = window.getComputedStyle(body);
    // also check what's at top-right (coords 1400, 20)
    const elTR = document.elementFromPoint(1400, 20);
    const csTR = window.getComputedStyle(elTR);
    return {
      bodyBg: cs.backgroundColor,
      bodyClass: body.className,
      topRight: {
        tag: elTR.tagName,
        id: elTR.id,
        className: elTR.className.toString().slice(0, 100),
        bgColor: csTR.backgroundColor,
        bgImage: csTR.backgroundImage.slice(0, 200)
      }
    };
  });
  console.log(JSON.stringify(result, null, 2));
  await page.close();
})();
