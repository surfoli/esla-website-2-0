import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const baseUrl = 'https://www.teamelitesoccer.ch';

// Alle Seiten der Website
const pages = [
  { name: 'Home', path: '/' },
  { name: 'Team', path: '/team' },
  { name: 'Ueber_uns', path: '/ber-uns' },
  { name: 'Trainingszeiten', path: '/trainingszeiten' },
  { name: 'Standort', path: '/standort' },
  { name: 'Sponsoren', path: '/sponsoren' },
  { name: 'Sponsoren_Angebote', path: '/sponsoren-angebote' },
  { name: 'Kontakt', path: '/kontakt' }
];

async function takeScreenshots() {
  console.log('🚀 Starte Screenshot-Tool für ESLA Website...\n');
  
  // Erstelle Screenshots-Ordner
  const screenshotDir = join(process.cwd(), 'screenshots');
  await mkdir(screenshotDir, { recursive: true });
  
  // Browser starten
  const browser = await chromium.launch({
    headless: true
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });
  
  const page = await context.newPage();
  
  // Durch alle Seiten iterieren
  for (const pageInfo of pages) {
    const url = `${baseUrl}${pageInfo.path}`;
    const filename = `${pageInfo.name.replace(/\s+/g, '_').replace(/ü/g, 'ue')}.png`;
    const filepath = join(screenshotDir, filename);
    
    try {
      console.log(`📸 Screenshot von: ${pageInfo.name}`);
      console.log(`   URL: ${url}`);
      
      await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Warte länger, damit alle Inhalte, Animationen und Lazy-Loading abgeschlossen sind
      await page.waitForTimeout(3000);
      
      // Scrolle zum Ende der Seite, um Lazy-Loading auszulösen
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      
      // Scrolle zurück nach oben
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
      
      // Fullpage Screenshot
      await page.screenshot({ 
        path: filepath, 
        fullPage: true 
      });
      
      console.log(`   ✅ Gespeichert: ${filename}\n`);
      
    } catch (error) {
      console.error(`   ❌ Fehler bei ${pageInfo.name}: ${error.message}\n`);
    }
  }
  
  await browser.close();
  
  console.log('✨ Alle Screenshots wurden erstellt!');
  console.log(`📁 Gespeichert in: ${screenshotDir}`);
}

takeScreenshots().catch(console.error);

