// ============================================================================
// TYPE GUARDS — Narrowing types at runtime
// ============================================================================

// Example union type
type Value = string | number | boolean | User;

// Example interface
interface User {
  id: number;
  name: string;
}



// ---------------------------------------------------------------------------
// 1. typeof checks — works only for: "string", "number", "boolean", "bigint",
//    "symbol", "undefined", "object", "function"
// ---------------------------------------------------------------------------
function handleValue_typeof(v: Value) {
  if (typeof v === "string") {
    console.log("Uppercase:", v.toUpperCase());
  } else if (typeof v === "number") {
    console.log("Squared:", v * v);
  } else if (typeof v === "boolean") {
    console.log("Boolean reversed:", !v);
  } else {
    console.log("It's a User:", v.name);
  }
}



// ---------------------------------------------------------------------------
// 2. instanceof checks — used for classes only
// ---------------------------------------------------------------------------
class Person {
  constructor(public name: string) {}
}

function checkPerson(value: unknown) {
  if (value instanceof Person) {
    console.log("Person instance:", value.name);
  } else {
    console.log("Not a Person instance");
  }
}



// ---------------------------------------------------------------------------
// 3. in operator — checks if a property exists on an object
// ---------------------------------------------------------------------------
function printIfUser(value: unknown) {
  if (typeof value === "object" && value !== null && "id" in value) {
    // TS now narrows it to { id: any }
    console.log("Found a user-like object with id:", (value as any).id);
  }
}



// ---------------------------------------------------------------------------
// 4. Custom Type Predicate
//    function isUser(value: unknown): value is User
// ---------------------------------------------------------------------------
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

function handleWithPredicate(input: unknown) {
  if (isUser(input)) {
    // Narrowed to User automatically
    console.log("User:", input.name);
  } else {
    console.log("Not a user");
  }
}



// ---------------------------------------------------------------------------
// 5. Narrowing unions in if / switch / ternary
// ---------------------------------------------------------------------------
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;

    case "square":
      return shape.side * shape.side;

    case "triangle":
      return (shape.base * shape.height) / 2;

    default:
      return assertNever(shape); // exhaustive check
  }
}



// ---------------------------------------------------------------------------
// 6. Exhaustive checks using never
// ---------------------------------------------------------------------------
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + JSON.stringify(x));
}



// ============================================================================
// ANY, UNKNOWN, NEVER
// ============================================================================

// ---------------------------------------------------------------------------
// 1. any — completely disables type checking
// ---------------------------------------------------------------------------
let unsafeValue: any = "hello";

unsafeValue.trim();        // OK (but unsafe)
unsafeValue.nonExistent(); // OK — but will crash at runtime



// ---------------------------------------------------------------------------
// 2. unknown — a safer alternative to any
//    You must narrow before using it
// ---------------------------------------------------------------------------
let unknownValue: unknown = "hello";

if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase()); // allowed only after narrowing
}



// ---------------------------------------------------------------------------
// 3. never — type of values that never occur
// ---------------------------------------------------------------------------

// (A) Function that always throws
function fail(msg: string): never {
  throw new Error(msg);
}

// (B) Function that never ends
function loopForever(): never {
  while (true) {}
}



// ============================================================================
// PRACTICAL EXAMPLES PUT TOGETHER
// ============================================================================

function example(value: unknown) {
  // Using type guards and unknown
  if (isUser(value)) {
    console.log("User ID:", value.id);
  } else if (typeof value === "string") {
    console.log("String length:", value.length);
  } else if (typeof value === "number") {
    console.log("Number doubled:", value * 2);
  } else {
    console.log("Unhandled type");
  }
}

console.log("=== Type Guard Demo ===");
example({ id: 1, name: "Alice" });
example("Hello");
example(42);



// ============================================================================
// END OF EXPLANATION — All concepts in a single file
// ============================================================================
console.log("\n=== Summary ===");
console.log("✓ typeof / instanceof / in type guards");
console.log("✓ Custom type predicates (value is User)");
console.log("✓ Union narrowing with if / switch");
console.log("✓ Exhaustive switch using never");
console.log("✓ any — unsafe");
console.log("✓ unknown — safe but requires checks");
console.log("✓ never — unreachable code or error-throwing functions");

export {};
