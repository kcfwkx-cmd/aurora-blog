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

  // 全页截图
  await page.screenshot({ path: 'D:/rrwang/contents/aurora/tools/snap_home.png' });

  // 找推荐文章框的 DOM 结构
  const info = await page.evaluate(() => {
    // 找 EDITOR'S SELECTION 相关容器
    const candidates = [
      document.querySelector('.feature-article'),
      document.querySelector('[class*="feature"]'),
      document.querySelector('[class*="editor"]'),
      document.querySelector('[class*="selection"]'),
    ].filter(Boolean);

    return candidates.map(el => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        tag: el.tagName,
        class: el.className?.toString().slice(0, 100),
        w: Math.round(r.width), h: Math.round(r.height),
        x: Math.round(r.x), y: Math.round(r.y),
        display: s.display, flexDir: s.flexDirection,
        childCount: el.children.length,
        childClasses: Array.from(el.children).map(c => c.className?.toString().slice(0, 60)),
        innerHTML: el.innerHTML.slice(0, 200),
      };
    });
  });

  info.forEach((n, i) => console.log(`[${i}]`, JSON.stringify(n, null, 2)));
  await page.close();
})();
