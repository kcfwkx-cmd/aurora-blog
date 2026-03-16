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
    // 找到按钮，往上追溯父级结构
    const btn = document.getElementById('ob-random-btn');
    if (!btn) return { error: 'btn not found' };

    const chain = [];
    let el = btn;
    for (let i = 0; i < 8; i++) {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      chain.push({
        tag: el.tagName,
        id: el.id || '',
        class: el.className?.toString().slice(0, 80) || '',
        w: Math.round(r.width), h: Math.round(r.height),
        x: Math.round(r.x), y: Math.round(r.y),
        display: s.display,
        flexDir: s.flexDirection,
        flexWrap: s.flexWrap,
        alignItems: s.alignItems,
        childCount: el.children.length,
      });
      if (!el.parentElement) break;
      el = el.parentElement;
    }

    // 检查 ul.tab 的父级链
    const tab = document.querySelector('ul.tab');
    const tabChain = [];
    if (tab) {
      let t = tab;
      for (let i = 0; i < 6; i++) {
        const r = t.getBoundingClientRect();
        const s = getComputedStyle(t);
        tabChain.push({
          tag: t.tagName, id: t.id || '',
          class: t.className?.toString().slice(0, 80) || '',
          w: Math.round(r.width), h: Math.round(r.height),
          x: Math.round(r.x), y: Math.round(r.y),
          display: s.display, flexDir: s.flexDirection,
        });
        if (!t.parentElement) break;
        t = t.parentElement;
      }
    }

    return { btnChain: chain, tabChain };
  });

  console.log('=== BTN PARENT CHAIN ===');
  info.btnChain?.forEach((n, i) => console.log(`[${i}]`, JSON.stringify(n)));
  console.log('\n=== TAB PARENT CHAIN ===');
  info.tabChain?.forEach((n, i) => console.log(`[${i}]`, JSON.stringify(n)));

  await page.close();
})();
