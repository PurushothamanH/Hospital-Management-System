// import "@testing-library/jest-dom";


import { TextEncoder, TextDecoder } from 'util';
// jest.setup.js or jest.setup.ts
import '@testing-library/jest-dom'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;