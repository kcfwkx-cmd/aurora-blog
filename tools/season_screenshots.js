const { chromium } = require('playwright');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

const seasons = [
  { name: '春_spring',  color_1: '#f953c6', color_2: '#b91d73', color_3: '#43e97b' },
  { name: '夏_summer',  color_1: '#4facfe', color_2: '#00f2fe', color_3: '#43e97b' },
  { name: '秋_autumn',  color_1: '#f7971e', color_2: '#e52d27', color_3: '#ffd200' },
  { name: '冬_winter',  color_1: '#a1c4fd', color_2: '#667eea', color_3: '#c2e9fb' }
];

const CONFIG_PATH   = 'D:/rrwang/contents/aurora/_config.aurora.yml';
const SCREENSHOT_DIR = 'D:/rrwang/contents/aurora/screenshots/seasons';
const ROOT          = 'D:\\rrwang\\contents\\aurora';

function updateColors(s) {
  let c = fs.readFileSync(CONFIG_PATH, 'utf8');
  c = c.replace(/color_1: '#[^']*'/, `color_1: '${s.color_1}'`);
  c = c.replace(/color_2: '#[^']*'/, `color_2: '${s.color_2}'`);
  c = c.replace(/color_3: '#[^']*'/, `color_3: '${s.color_3}'`);
  fs.writeFileSync(CONFIG_PATH, c, 'utf8');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function waitForServer(maxMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      const code = execSync(
        'curl -s -o /dev/null -w "%{http_code}" http://localhost:4000',
        { stdio: 'pipe' }
      ).toString().trim();
      if (code === '200') return;
    } catch (e) {}
    await sleep(1000);
  }
  throw new Error('Server did not start within ' + maxMs + 'ms');
}

function killPort() {
  try { execSync('npx kill-port 4000', { cwd: ROOT, stdio: 'pipe' }); } catch (e) {}
}

(async () => {
  const wsFile = 'D:/rrwang/contents/aurora/.browser_ws';
  let browser;
  try {
    const ws = fs.readFileSync(wsFile, 'utf8').trim();
    browser = await chromium.connect(ws);
    console.log('Connected to existing browser');
  } catch (e) {
    const srv = await chromium.launchServer({ headless: false });
    fs.writeFileSync(wsFile, srv.wsEndpoint());
    browser = await chromium.connect(srv.wsEndpoint());
    console.log('Launched new browser');
  }

  for (const season of seasons) {
    console.log(`\n=== ${season.name} ===`);

    updateColors(season);
    killPort();
    await sleep(500);

    execSync('hexo g', { cwd: ROOT, stdio: 'inherit' });

    // start server as detached background process
    const srv = spawn('cmd', ['/c', 'hexo s'], {
      cwd: ROOT,
      detached: true,
      stdio: 'ignore'
    });
    srv.unref();

    await waitForServer(30000);
    console.log('Server ready, taking screenshot...');
    await sleep(1500);

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:4000', { waitUntil: 'networkidle' });
    const out = `${SCREENSHOT_DIR}/${season.name}.png`;
    await page.screenshot({ path: out });
    console.log('Saved:', out);
    await page.close();
  }

  console.log('\nAll done!');
})();
