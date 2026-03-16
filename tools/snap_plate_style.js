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

  const info = await page.evaluate(() => {
    const plate = document.querySelector('.ob-gradient-plate');
    if (!plate) return 'not found';
    const s = getComputedStyle(plate);
    const r = plate.getBoundingClientRect();
    const children = Array.from(plate.children).map(c => {
      const cr = c.getBoundingClientRect();
      const cs = getComputedStyle(c);
      return {
        tag: c.tagName, class: c.className?.toString().slice(0, 80),
        id: c.id,
        w: Math.round(cr.width), h: Math.round(cr.height),
        x: Math.round(cr.x), y: Math.round(cr.y),
        display: cs.display, position: cs.position,
      };
    });
    return {
      plate: {
        w: Math.round(r.width), h: Math.round(r.height),
        x: Math.round(r.x), y: Math.round(r.y),
        display: s.display,
        flexDir: s.flexDirection,
        flexWrap: s.flexWrap,
        justifyContent: s.justifyContent,
        alignItems: s.alignItems,
        padding: s.padding,
        overflow: s.overflow,
      },
      children,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await page.close();
})();
