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
    // 找包含 EDITOR'S SELECTION 文字的元素
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const matches = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.includes("EDITOR") || node.textContent.includes("推荐文章")) {
        let el = node.parentElement;
        for (let i = 0; i < 5; i++) {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          matches.push({
            depth: i,
            tag: el.tagName,
            class: el.className?.toString().slice(0, 80),
            id: el.id,
            w: Math.round(r.width), h: Math.round(r.height),
            x: Math.round(r.x), y: Math.round(r.y),
            display: s.display,
            childCount: el.children.length,
          });
          if (!el.parentElement) break;
          el = el.parentElement;
        }
        break;
      }
    }
    return matches;
  });

  info.forEach((n, i) => console.log(`[${i}]`, JSON.stringify(n)));
  await page.close();
})();
