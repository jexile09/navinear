// src/setupTests.ts
import '@testing-library/jest-dom';  // Custom matchers
import { vi } from 'vitest';         // Import 'vi' from 'vitest'

// Optionally mock fetch globally for all tests
globalThis.fetch = vi.fn();
