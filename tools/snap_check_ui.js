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

  // 整页截图
  await page.screenshot({ path: 'D:/rrwang/contents/aurora/tools/snap_home.png', fullPage: true });

  // 滚动到按钮区域截图
  const btn = await page.$('#ob-random-btn');
  if (btn) {
    await btn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'D:/rrwang/contents/aurora/tools/snap_btn_area.png' });
  }

  // 检查关键元素的尺寸和样式
  const info = await page.evaluate(() => {
    const results = [];

    // 随便看一篇按钮
    const btn = document.getElementById('ob-random-btn');
    if (btn) {
      const r = btn.getBoundingClientRect();
      const s = getComputedStyle(btn);
      results.push({ el: '#ob-random-btn', w: Math.round(r.width), h: Math.round(r.height), display: s.display, flexGrow: s.flexGrow, alignSelf: s.alignSelf });
    }

    // tab 筛选栏
    const tab = document.querySelector('ul.tab');
    if (tab) {
      const r = tab.getBoundingClientRect();
      results.push({ el: 'ul.tab', w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) });
    }

    // 文章卡片
    const cards = document.querySelectorAll('.article');
    cards.forEach((c, i) => {
      if (i < 3) {
        const r = c.getBoundingClientRect();
        results.push({ el: `.article[${i}]`, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) });
      }
    });

    // 侧边栏
    const sidebar = document.querySelector('.sidebar') || document.querySelector('[class*="sidebar"]');
    if (sidebar) {
      const r = sidebar.getBoundingClientRect();
      const s = getComputedStyle(sidebar);
      results.push({ el: 'sidebar', w: Math.round(r.width), h: Math.round(r.height), overflow: s.overflow });
    }

    // 检查有没有横向溢出
    const bodyW = document.documentElement.scrollWidth;
    const viewW = document.documentElement.clientWidth;
    results.push({ el: 'overflow-check', bodyScrollWidth: bodyW, viewportWidth: viewW, hasHorizontalOverflow: bodyW > viewW });

    return results;
  });

  console.log(JSON.stringify(info, null, 2));
  await page.close();
})();
