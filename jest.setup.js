import '@testing-library/jest-dom'

// Mock the Next.js fetch globally if needed
global.fetch = jest.fn();

// Mock scrollIntoView because jsdom doesn't implement it
window.HTMLElement.prototype.scrollIntoView = jest.fn();
