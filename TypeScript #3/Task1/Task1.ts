/**
 * -------------------------------------------
 * WHY TYPESCRIPT EXISTS
 * -------------------------------------------
 * JavaScript is powerful but has no type safety.
 * This means you can accidentally pass the wrong data,
 * call things that don’t exist, or get runtime errors
 * that only show when the app is already running.
 *
 * TypeScript adds:
 *  - Type safety (catch mistakes early)
 *  - Better tooling (auto-complete, IntelliSense)
 *  - Better developer experience (DX)
 *  - More maintainable code for teams
 *
 * TypeScript = JavaScript + types.
 */



// -------------------------------------------
// BASIC TYPES
// -------------------------------------------

let Name: string = "Suuru";
let age: number = 30;
let isActive: boolean = true;
let bigValue: bigint = 9007199254740991n;
let uniqueKey: symbol = Symbol("id");



// -------------------------------------------
// null, undefined, void
// -------------------------------------------

// null → "empty value"
let emptyValue: null = null;

// undefined → "not assigned"
let notSet: undefined = undefined;

// void → function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
}



// -------------------------------------------
// any, unknown, never
// -------------------------------------------

// any → turns off TypeScript checks (unsafe!)
let anything: any = "could be anything";

// unknown → safer version of any; must check before using
let maybeValue: unknown = "hello";
if (typeof maybeValue === "string") {
  console.log(maybeValue.toUpperCase());
}

// never → function that never returns (error or infinite loop)
function fail(message: string): never {
  throw new Error(message);
}



// -------------------------------------------
// STRICT MODE OPTIONS
// -------------------------------------------

/**
 * strict
 * - Turns on ALL major TypeScript safety checks.
 *   Recommended for all real projects.
 *
 * strictNullChecks
 * - You cannot treat null/undefined as normal values.
 * - Forces you to handle missing data safely.
 */

let fullName: string | null = null; // must explicitly allow null

/**
 * noImplicitAny
 * - Variables must have clear types.
 * - TS will not guess "any".
 */

function add(a: number, b: number) {
  return a + b;
  // If you remove the types above, TS complains.
}

/**
 * noImplicitThis
 * - Prevents using "this" without a clear type.
 */

const counter = {
  value: 0,
  increment() {
    this.value++; // "this" is correctly typed
  },
};

/**
 * strictBindCallApply
 * - Ensures .bind(), .call(), and .apply() use correct argument types.
 */

function greet(name: string) {
  return "Hello " + name;
}

const greetSuuru = greet.bind(null, "Suuru"); // correct

/**
 * alwaysStrict
 * - Ensures compiled JS uses "use strict" mode.
 * - Makes JS safer and less error-prone.
 */



// Done! This is the full simple explanation of the essentials.
