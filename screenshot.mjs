import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('http://localhost:8080', { waitUntil: 'networkidle0', timeout: 15000 });

// Force all reveal elements visible immediately
await page.evaluate(() => {
  document.querySelectorAll('.reveal, .reveal-right, .reveal-float, .reveal-float-2')
    .forEach(el => el.classList.add('visible'));
});

await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: 'preview_hero.png', fullPage: false });

// Full page scroll to load all sections
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: 'preview_full.png', fullPage: true });
console.log('Screenshot saved: preview.png');
await browser.close();
