import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../test/render';
import { CITIES } from '../features/data/cities';
import HomePage from './home/HomePage';
import CrisisPage from './crisis/CrisisPage';
import ActionPage from './action/ActionPage';
import AboutPage from './about/AboutPage';
import ReportPage from './report/ReportPage';
import WasteBankPage from './waste-bank/WasteBankPage';
import NotFound from './NotFound';

/** Lazy chunks + query resolution can exceed the 1s default when workers run in parallel. */
const ASYNC = { timeout: 5000 };

const quake = {
  DateTime: new Date().toISOString(),
  Coordinates: '-7.08,130.07',
  Magnitude: '5.5',
  Kedalaman: '130 km',
  Wilayah: '169 km BaratLaut TANIMBAR',
};

/** Routes each upstream URL to a canned payload; FIRMS proxy is down to exercise the "unavailable" state. */
function stubUpstreams() {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      const ok = (body: unknown) => ({ ok: true, status: 200, json: async () => body }) as Response;
      if (url.includes('air-quality') && url.includes('current=')) {
        return ok(
          CITIES.map((_, i) => ({
            current: { time: 't', us_aqi: 160 + i, pm2_5: 40, pm10: 50, nitrogen_dioxide: 30, ozone: 40, carbon_monoxide: 500, sulphur_dioxide: 5, uv_index: 7 },
          })),
        );
      }
      if (url.includes('hourly=')) return ok({ hourly: { time: ['2026-11-09T00:00'], us_aqi: [170] } });
      if (url.includes('api.open-meteo.com')) {
        return ok(
          CITIES.map((_, i) => ({
            current: { time: 't', temperature_2m: 30, apparent_temperature: 33 + i, relative_humidity_2m: 75, precipitation: 0, weather_code: 61, wind_speed_10m: 9 },
            daily: { time: ['2026-11-10'], temperature_2m_max: [33], temperature_2m_min: [25], precipitation_sum: [i], uv_index_max: [10] },
          })),
        );
      }
      if (url.includes('worldbank')) return ok([{}, [{ date: '2000', value: 60 }, { date: '2024', value: 50.7 }]]);
      if (url.endsWith('autogempa.json')) return ok({ Infogempa: { gempa: quake } });
      if (url.endsWith('gempaterkini.json') || url.endsWith('gempadirasakan.json')) return ok({ Infogempa: { gempa: [quake] } });
      return { ok: false, status: 503, json: async () => ({}) } as Response;
    }),
  );
}

beforeEach(() => {
  stubUpstreams();
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('HomePage', () => {
  it('renders hero and live tiles from upstream data', async () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bersama jaga alam Indonesia tetap lestari');
    expect(await screen.findByText(/AQI 160/, undefined, ASYNC)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Bank sampah: sampahmu bernilai/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ubah sampah jadi tabungan/ })).toHaveAttribute('href', '/bank-sampah');
    expect(await screen.findAllByText('M 5.5', undefined, ASYNC)).not.toHaveLength(0);
    expect(document.title).toContain('SERA Indonesia');
  });
});

describe('CrisisPage', () => {
  it('shows ranked city AQI, weather, quakes, trends and hotspot unavailable state', async () => {
    renderWithProviders(<CrisisPage />);
    expect(await screen.findByRole('button', { name: /Jayapura/ }, ASYNC)).toBeInTheDocument();
    expect(await screen.findByText('Pedoman WHO 24 jam: 15', undefined, ASYNC)).toBeInTheDocument();
    expect(await screen.findByText('Jayapura · 46°C', undefined, ASYNC)).toBeInTheDocument();
    expect(await screen.findByText('Luas hutan (% daratan)', undefined, ASYNC)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('tab', { name: 'Dirasakan warga' }));
    expect(screen.getByRole('tab', { name: 'Dirasakan warga' })).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByText(/Data titik panas sedang tidak tersedia/, undefined, ASYNC)).toBeInTheDocument();
    expect(screen.getAllByText('169 km BaratLaut TANIMBAR').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Polusi udara Jabodetabek' })).toBeInTheDocument();
    expect(document.title).toBe('Krisis & Data · SERA Indonesia');
  });
});

describe('WasteBankPage', () => {
  it('renders stats, steps, price list and units, all flagged as sample data', () => {
    renderWithProviders(<WasteBankPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ubah sampah jadi tabungan');
    expect(screen.getByText('Botol PET bening')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'SERA Unit Bakau' })).toBeInTheDocument();
    expect(screen.getByText('302 nasabah')).toBeInTheDocument();
    expect(screen.getAllByText('Data contoh').length).toBeGreaterThanOrEqual(3);
    expect(document.title).toBe('Bank Sampah · SERA Indonesia');
  });
});

describe('ActionPage / AboutPage / NotFound', () => {
  it('renders upcoming observances and ways to act', () => {
    renderWithProviders(<ActionPage />);
    expect(screen.getByRole('heading', { name: 'Setor ke bank sampah' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(5);
  });

  it('renders about sections and data sources', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'Bagaimana data kami bekerja' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /NASA FIRMS/ }).length).toBeGreaterThan(0);
  });

  it('renders 404', () => {
    renderWithProviders(
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { route: '/nope' },
    );
    expect(screen.getByRole('heading', { name: 'Halaman tidak ditemukan' })).toBeInTheDocument();
  });
});

describe('ReportPage', () => {
  it('shows field errors and focuses the first invalid field', async () => {
    renderWithProviders(<ReportPage />);
    await userEvent.click(screen.getByRole('button', { name: /Kirim laporan/ }));
    expect(screen.getByText('Judul minimal 8 karakter.')).toBeInTheDocument();
    expect(screen.getByLabelText(/Judul laporan/)).toHaveFocus();
    expect(screen.getByLabelText(/Judul laporan/)).toHaveAttribute('aria-invalid', 'true');
  });

  it('submits a valid report through the mailto fallback', async () => {
    const hrefSetter = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({ ...window.location, set href(v: string) { hrefSetter(v); } } as unknown as Location);
    renderWithProviders(<ReportPage />);
    await userEvent.type(screen.getByLabelText(/Judul laporan/), 'Limbah cair di sungai');
    await userEvent.selectOptions(screen.getByLabelText(/Kategori/), 'water');
    await userEvent.type(screen.getByLabelText(/^Lokasi/), 'Bekasi');
    await userEvent.type(screen.getByLabelText(/Deskripsi/), 'Air sungai hitam pekat dan berbau sejak minggu lalu.');
    await userEvent.click(screen.getByRole('button', { name: /Kirim laporan/ }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Terima kasih!'), ASYNC);
    expect(hrefSetter).toHaveBeenCalledWith(expect.stringMatching(/^mailto:/));
  });
});
