import '@testing-library/jest-dom'

// Mock IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: globalThis.vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: globalThis.vi.fn(), // deprecated
    removeListener: globalThis.vi.fn(), // deprecated
    addEventListener: globalThis.vi.fn(),
    removeEventListener: globalThis.vi.fn(),
    dispatchEvent: globalThis.vi.fn(),
  })),
})

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: globalThis.vi.fn(),
})

// Mock localStorage
const localStorageMock = {
  getItem: globalThis.vi.fn(),
  setItem: globalThis.vi.fn(),
  removeItem: globalThis.vi.fn(),
  clear: globalThis.vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
