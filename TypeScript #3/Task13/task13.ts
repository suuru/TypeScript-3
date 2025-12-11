// ============================================================================
// NAMESPACES vs MODULES — SINGLE PAGE EXPLANATION
// ============================================================================

// ============================================================================
// 1. LEGACY NAMESPACE (INTERNAL MODULE)
// ----------------------------------------------------------------------------
// Namespaces were used before JavaScript had native modules.
// They group related code under a single global object.
// Still used in old codebases or ambient type definitions (.d.ts files).
// ============================================================================

namespace LegacyUtils {
  export function greet(name: string): string {
    return `Hello, ${name}`;
  }

  export const version = "1.0";
}

// Usage (no import required, global access):
console.log(LegacyUtils.greet("Alice"));
console.log("Legacy version:", LegacyUtils.version);

// ============================================================================
// 2. MODERN ES MODULES (RECOMMENDED)
// ----------------------------------------------------------------------------
// Modern JS/TS uses import/export instead of namespaces.
// Works in browsers, Node.js, and bundlers. Cleaner and scalable.
// ============================================================================

// ===== math.ts =====
// export function add(a: number, b: number) {
//   return a + b;
// }

// ===== app.ts =====
// import { add } from "./math";
// console.log(add(2, 3));

// NOTE: The above is shown conceptually in this single file.
// In real code, they would be separate files.

// Simulating behavior inside one file:
function add(a: number, b: number): number {
  return a + b;
}
console.log("2 + 3 =", add(2, 3));

// ============================================================================
// 3. WHEN ARE NAMESPACES STILL USED TODAY?
// ----------------------------------------------------------------------------
// ✔ Ambient global library declarations (like jQuery, Google Maps, Stripe)
// ✔ Old enterprise projects
// ✔ When describing global SDK objects
// ============================================================================

// Example: A global SDK writing .d.ts file:
declare namespace Stripe {
  interface PaymentIntent {
    id: string;
    amount: number;
  }

  function initialize(apiKey: string): void;
}

// Example usage (conceptually):
const payment: Stripe.PaymentIntent = { id: "pi_123", amount: 5000 };
console.log(payment);

// ============================================================================
// 4. WHY ES MODULES ARE PREFERRED
// ----------------------------------------------------------------------------
// ✔ Native JavaScript feature
// ✔ Works everywhere (browser + Node)
// ✔ Better performance (tree-shaking)
// ✔ No global scope pollution
// ✔ Scaling is easier for large teams
// ============================================================================


// ============================================================================
// 5. WHY YOU SHOULD NOT MIX NAMESPACES + MODULES
// ----------------------------------------------------------------------------
// TypeScript ALLOWS this, but it's discouraged due to confusion.
// ============================================================================

// ❌ Avoid this mix:
export namespace Mixed {
  export const x = 10;
}

// ❌ Also exporting values outside namespace:
export const y = 20;

// ❗ Modern bundlers do not expect namespaces inside modules.
// Use ES modules instead.


// ============================================================================
// SUMMARY
// ----------------------------------------------------------------------------
// - Namespaces: Legacy, global, still used for ambient declarations.
// - ES Modules: Modern, recommended, scalable.
// - Do not mix namespaces and modules.
// ============================================================================
