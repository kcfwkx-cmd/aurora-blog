const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const ws = fs.readFileSync('.browser_ws', 'utf8').trim();
  const browser = await chromium.connect(ws);
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4000', { waitUntil: 'networkidle' });

  // 找导航栏右侧紫色区域的元素（点坐标 1300, 30）
  const result = await page.evaluate(() => {
    // 从点 (1300, 30) 找元素堆栈
    const el = document.elementFromPoint(1300, 30);
    const stack = [];
    let cur = el;
    while (cur && cur !== document.body.parentElement) {
      const cs = window.getComputedStyle(cur);
      stack.push({
        tag: cur.tagName,
        id: cur.id,
        className: cur.className.toString().slice(0, 100),
        bgColor: cs.backgroundColor,
        bgImage: cs.backgroundImage.slice(0, 300),
        style: cur.getAttribute('style') || ''
      });
      cur = cur.parentElement;
    }
    return stack;
  });

  console.log(JSON.stringify(result, null, 2));
  await page.close();
})();
