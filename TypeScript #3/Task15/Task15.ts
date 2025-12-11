// ========================
//  DECLARATION MERGING
// ========================

// 1. AMBIENT DECLARATIONS
// ------------------------
// "Ambient" means: declared for TypeScript, but implemented elsewhere (usually JS).
// Used when consuming external JS libraries or global variables.

// Examples:
declare var APP_VERSION: string;

declare function logEvent(name: string, data: any): void;

declare module "awesome-lib" {
  export function calculate(a: number, b: number): number;
}

declare global {
  interface Window {
    currentUserId: number;
  }
}

// 2. DECLARATION FILES (.d.ts)
// -----------------------------
// These files contain ONLY type declarations, NO actual JS code.
// Purpose: describe shapes of external libraries, global objects, or modules.
// Example: my-library.d.ts
// declare function greet(name: string): void;


// 3. DECLARATION MERGING
// ------------------------
// TypeScript allows some declarations to COMBINE into one final type.

// a) Interface Merging
// ----------------------
// Interfaces with the same name merge their members.

interface User {
  id: number;
}
interface User {
  name: string;
}
// Resulting type:
// interface User { id: number; name: string; }

// b) Namespace + Function/Class Merging
// --------------------------------------
// A function or class can merge with a namespace of the same name.
// Namespace adds extra static properties.

function Utils(value: number) {
  return value * 2;
}

namespace Utils {
  export const version = "1.0";
}

Utils(5);        // OK
Utils.version;   // OK - added by namespace

// c) Namespace + Enum Merging (less common)
// -----------------------------------------
enum Status {
  Active,
  Inactive
}
namespace Status {
  export function isActive(s: Status) {
    return s === Status.Active;
  }
}

Status.isActive(Status.Active); // true


// ========================
//  SUMMARY
// ========================
//
// Ambient declarations: provide types for code written outside TS.
// Declaration files: .d.ts files containing only type definitions.
// Declaration merging: TS automatically merges interfaces,
// and allows namespaces to merge with functions, classes, or enums.
