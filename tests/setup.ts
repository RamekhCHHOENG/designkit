import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Polyfill window.matchMedia for JSDOM
if (typeof window !== "undefined") {
  window.matchMedia =
    window.matchMedia ||
    function (query: string) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    };

  // Polyfill ResizeObserver for JSDOM
  class ResizeObserverPolyfill {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
  global.ResizeObserver = global.ResizeObserver || ResizeObserverPolyfill;
}

afterEach(() => {
  if (typeof document !== "undefined") {
    cleanup();
    document.body.style.overflow = "";
  }
});
