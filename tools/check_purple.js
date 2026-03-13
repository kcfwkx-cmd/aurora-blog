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
    // 取紫色区域坐标 (1350, 40)，并获取所有堆叠元素
    const els = document.elementsFromPoint(1350, 40);
    return els.map(function(el) {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className.toString().slice(0, 80),
        bgColor: cs.backgroundColor,
        bgImage: cs.backgroundImage.slice(0, 200),
        opacity: cs.opacity,
        zIndex: cs.zIndex,
        position: cs.position,
        rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) }
      };
    });
  });

  result.forEach(function(r) {
    if (r.bgColor !== 'rgba(0, 0, 0, 0)' || r.bgImage !== 'none') {
      console.log('*** HAS BG ***');
    }
    console.log(JSON.stringify(r));
  });
  await page.close();
})();
