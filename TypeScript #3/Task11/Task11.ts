// ============================================================================
// FUNCTION OVERLOADING IN TYPESCRIPT
// ============================================================================

// ------------------------------------------------------------
// Example 1: Basic overloads for string and number
// ------------------------------------------------------------

// Overload signatures:
function format(x: string): string;
function format(x: number): string;

// Implementation signature:
function format(x: string | number): string {
  if (typeof x === "number") {
    return `Number: ${x.toFixed(2)}`;
  }
  return `String: ${x.toUpperCase()}`;
}

// Usage:
console.log(format("hello"));  // String: HELLO
console.log(format(42));       // Number: 42.00



// ------------------------------------------------------------
// Example 2: API with multiple input shapes
// ------------------------------------------------------------

interface UserQuery {
  id: number;
}

interface UserSearch {
  name: string;
}

// Overloads:
function getUser(input: UserQuery): string;
function getUser(input: UserSearch): string;

// Implementation:
function getUser(input: UserQuery | UserSearch): string {
  if ("id" in input) {
    return `Fetched user by ID: ${input.id}`;
  }
  return `Fetched user by name: ${input.name}`;
}

console.log(getUser({ id: 10 }));
console.log(getUser({ name: "Alice" }));



// ------------------------------------------------------------
// Example 3: Wrapper function using overloads
// ------------------------------------------------------------

// A wrapper for localStorage that returns strongly typed values

// Overloads:
function load(key: string): string | null;
function load<T>(key: string, parseJson: true): T | null;

// Implementation:
function load(key: string, parseJson?: true) {
  const value = localStorage.getItem(key);
  if (!value) return null;

  return parseJson ? JSON.parse(value) : value;
}

// Usage (string):
const theme = load("theme");
console.log("Theme:", theme);

// Usage (object):
interface Settings {
  darkMode: boolean;
}
const settings = load<Settings>("settings", true);
console.log("Settings:", settings);



// ------------------------------------------------------------
// SUMMARY
// ------------------------------------------------------------
console.log("\n=== SUMMARY ===");
console.log("✓ Overload signatures define valid call forms");
console.log("✓ Implementation signature handles union of inputs");
console.log("✓ Useful for API helpers, wrappers, and flexible functions");

export {};
