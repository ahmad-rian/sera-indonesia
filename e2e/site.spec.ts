import { expect, test, type Page } from '@playwright/test';

/** Keep E2E deterministic: stub every third-party data source. */
async function stubData(page: Page) {
  await page.route('**/air-quality-api.open-meteo.com/**', (route) => {
    const url = route.request().url();
    if (url.includes('current=')) {
      return route.fulfill({
        json: Array.from({ length: 14 }, (_, i) => ({
          current: { time: 't', us_aqi: 120 + i * 5, pm2_5: 30, pm10: 40, nitrogen_dioxide: 20, ozone: 50, carbon_monoxide: 400, sulphur_dioxide: 4, uv_index: 6 },
        })),
      });
    }
    return route.fulfill({ json: { hourly: { time: ['2026-11-08T00:00', '2026-11-09T00:00'], us_aqi: [150, 170] } } });
  });
  const quake = { DateTime: new Date().toISOString(), Coordinates: '1,127', Magnitude: '5.2', Kedalaman: '10 km', Wilayah: 'Laut Maluku' };
  await page.route('**/autogempa.json', (r) => r.fulfill({ json: { Infogempa: { gempa: quake } } }));
  await page.route('**/gempaterkini.json', (r) => r.fulfill({ json: { Infogempa: { gempa: [quake] } } }));
  await page.route('**/gempadirasakan.json', (r) => r.fulfill({ json: { Infogempa: { gempa: [quake] } } }));
  await page.route('**/api.open-meteo.com/**', (r) =>
    r.fulfill({
      json: Array.from({ length: 14 }, () => ({
        current: { time: 't', temperature_2m: 31, apparent_temperature: 36, relative_humidity_2m: 70, precipitation: 0, weather_code: 3, wind_speed_10m: 8 },
        daily: { time: ['2026-11-10', '2026-11-11'], temperature_2m_max: [33, 34], temperature_2m_min: [25, 25], precipitation_sum: [3, 8], uv_index_max: [9, 10] },
      })),
    }),
  );
  await page.route('**/api.worldbank.org/**', (r) => r.fulfill({ json: [{}, [{ date: '2000', value: 60 }, { date: '2024', value: 50.7 }]] }));
  await page.route('**/api/hotspots', (r) =>
    r.fulfill({ json: { data: { total: 42, highConfidence: 5, byRegion: [{ region: 'kalimantan', count: 30 }] }, asOf: new Date().toISOString(), source: 'NASA FIRMS' } }),
  );
}

test.beforeEach(async ({ page }) => {
  await stubData(page);
});

test('home renders hero, live data and has no horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('alam');
  await expect(page.getByText('AQI 120')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

test('navigates across all five pages', async ({ page, isMobile }) => {
  await page.goto('/');
  const pages = [
    { name: 'Bank Sampah', url: /\/bank-sampah$/, heading: /tabungan/ },
    { name: 'Krisis & Data', url: /\/krisis$/, heading: /langsung/ },
    { name: 'Aksi', url: /\/aksi$/, heading: /dampak/ },
    { name: 'Tentang', url: /\/tentang$/, heading: /alam/ },
    { name: 'Lapor', url: /\/lapor$/, heading: /lingkungan/ },
  ];
  for (const p of pages) {
    if (isMobile) await page.getByRole('button', { name: 'Buka menu' }).click();
    const scope = isMobile ? page.locator('#mobile-menu') : page.getByRole('navigation', { name: 'Navigasi utama' });
    await scope.getByRole('link', { name: p.name, exact: true }).first().click();
    await expect(page).toHaveURL(p.url);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(p.heading);
  }
});

test('language toggle switches copy and persists', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) await page.getByRole('button', { name: 'Buka menu' }).click();
  await page.getByRole('button', { name: 'en', exact: true }).last().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('fight');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('fight');
});

test('theme toggle persists across reloads', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) await page.getByRole('button', { name: 'Buka menu' }).click();
  const html = page.locator('html');
  const before = await html.getAttribute('data-theme');
  await page.getByRole('button', { name: /Mode (gelap|terang)/ }).last().click();
  const after = before === 'dark' ? 'light' : 'dark';
  await expect(html).toHaveAttribute('data-theme', after);
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', after);
});

test('legacy routes redirect to the new pages', async ({ page }) => {
  for (const [from, to] of [
    ['/crisis', /\/krisis$/],
    ['/data', /\/krisis#data$/],
    ['/community', /\/aksi$/],
    ['/report', /\/lapor$/],
    ['/about', /\/tentang$/],
  ] as const) {
    await page.goto(from);
    await expect(page).toHaveURL(to);
  }
});

test('waste bank page shows price list and sample-data labels', async ({ page }) => {
  await page.goto('/bank-sampah');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('tabungan');
  await expect(page.getByText('Kaleng aluminium')).toBeVisible();
  await expect(page.getByText('Data contoh').first()).toBeVisible();
});

test('report form validates required fields', async ({ page }) => {
  await page.goto('/lapor');
  await page.getByRole('button', { name: /Kirim laporan/ }).click();
  await expect(page.getByText('Judul minimal 8 karakter.')).toBeVisible();
  await expect(page.getByLabel(/Judul laporan/)).toBeFocused();
});

test('krisis dashboard shows live hotspots and AQI chart', async ({ page }) => {
  await page.goto('/krisis');
  const hotspotTotal = page.locator('p', { hasText: '5 keyakinan tinggi' });
  await expect(hotspotTotal).toBeVisible();
  await expect(hotspotTotal).toContainText('42');
  await expect(page.locator('.recharts-surface').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cuaca & panas' })).toBeVisible();
  await expect(page.getByText('Luas hutan (% daratan)')).toBeVisible();
});
