const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const ws = fs.readFileSync('.browser_ws', 'utf8').trim();
  const browser = await chromium.connect(ws);
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4000', { waitUntil: 'networkidle' });

  // 截顶部 banner 区域
  await page.screenshot({ path: 'screenshots/banner_top.png', clip: { x: 0, y: 0, width: 1440, height: 320 } });

  // 检查 banner 相关元素背景
  const result = await page.evaluate(() => {
    const check = (sel) => {
      const el = document.querySelector(sel);
      if (el == null) return null;
      const cs = window.getComputedStyle(el);
      return {
        sel,
        tag: el.tagName,
        className: el.className.toString().slice(0, 100),
        bgColor: cs.backgroundColor,
        bgImage: cs.backgroundImage.slice(0, 300),
        style: el.getAttribute('style') || ''
      };
    };
    const sels = [
      '.app-banner', '.ob-app-banner', '#app-banner',
      '.app-banner-image', '.app-banner-screen', '.app-banner-gradient',
      '.banner', '.hero',
      'header', '.ob-header',
      '.gradient', '.bg-gradient'
    ];
    return sels.map(check).filter(function(x) { return x !== null; });
  });

  console.log(JSON.stringify(result, null, 2));
  await page.close();
})();
