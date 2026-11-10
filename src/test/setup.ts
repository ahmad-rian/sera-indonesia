import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import i18n from '../i18n';

/** jsdom lacks ResizeObserver, which recharts' ResponsiveContainer needs. */
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;

beforeEach(async () => {
  await i18n.changeLanguage('id');
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});
