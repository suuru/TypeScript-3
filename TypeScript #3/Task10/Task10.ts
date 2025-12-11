// ============================================================================
// TYPE ASSERTIONS IN TYPESCRIPT
// ============================================================================

// ------------------------------------------------------------
// Example interface
// ------------------------------------------------------------
interface User {
  id: number;
  name: string;
}



// ============================================================================
// 1. `as` SYNTAX (RECOMMENDED)
// ============================================================================
const data: unknown = '{"id":1,"name":"Alice"}';

// Tell TypeScript we KNOW this is a string
const json = data as string;

console.log("Length of JSON:", json.length);



// ============================================================================
// 2. ANGLE BRACKET SYNTAX <Type>value (NOT IN JSX)
// ============================================================================
const apiResponse: unknown = '{"id":2,"name":"Bob"}';

const parsedUser = <string>apiResponse;  // Equivalent to: apiResponse as string

console.log("Parsed (pretend):", parsedUser);



// ============================================================================
// 3. APPROPRIATE USE CASES
// ============================================================================

// A. From API: JSON.parse returns `any`
const user: User = JSON.parse('{"id":3,"name":"Charlie"}') as User;
console.log("User from API:", user.name);

// B. DOM: querySelector returns Element | null
// (simulating DOM example without running in browser)
type FakeInput = { value: string };

const fakeEl = { value: "" } as FakeInput;
fakeEl.value = "Hello World";



// C. Narrowing unknown with assertions
function handleUnknown(value: unknown) {
  if (typeof value === "string") {
    const upper = (value as string).toUpperCase();
    console.log("Upper:", upper);
  }
}

handleUnknown("test");



// ============================================================================
// 4. OVERUSING ASSERTIONS (WHY IT'S BAD)
// ============================================================================

// ❌ FORCING TYPES EVEN IF WRONG — BAD PRACTICE
const forcedNumber = ("hello" as unknown as number); // TS allows but unsafe
console.log("Forced number value:", forcedNumber); // Will behave incorrectly

// ❌ Creating invalid objects — BAD
const emptyUser = {} as User; // Missing fields but compiler is tricked
console.log("Empty user (invalid):", emptyUser);



// ============================================================================
// SUMMARY
// ============================================================================
console.log("\n=== SUMMARY ===");
console.log("✓ `as Type`: SAFE & STANDARD");
console.log("✓ `<Type>value`: works in .ts (NOT in JSX)");
console.log("✓ Good uses: API data, DOM, narrowing unknown");
console.log("✓ Bad uses: forcing types, hiding real errors");

export {};
