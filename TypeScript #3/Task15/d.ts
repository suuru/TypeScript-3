// ============================================
// 1. DECLARE A GLOBAL FUNCTION (in a .d.ts file)
// ============================================

// global.d.ts
declare function logInfo(message: string): void;


// ============================================
// 2. AUGMENT / EXTEND AN EXISTING INTERFACE
// ============================================

// Extending the built-in Window interface
declare global {
  interface Window {
    myAppVersion: string;
  }
}

// Usage in code (TS file):
window.myAppVersion = "2.1.0";
logInfo(`App version: ${window.myAppVersion}`);


// ============================================
// 3. DECLARATION MERGING (INTERFACE MERGING)
// ============================================

// First declaration
interface Product {
  id: number;
}

// Second declaration (merged with first)
interface Product {
  name: string;
}

// Final merged type (implicit):
// interface Product {
//   id: number;
//   name: string;
// }

// Example usage:
const item: Product = {
  id: 1,
  name: "Laptop"
};
