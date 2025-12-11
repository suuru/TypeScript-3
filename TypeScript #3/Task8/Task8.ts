///////////////////////////////////////////////
// CONDITIONAL TYPES IN TYPESCRIPT
///////////////////////////////////////////////

//
// 1. BASIC SYNTAX
//
// T extends U ? X : Y
// If T is assignable to U → return X
// Otherwise → return Y
//
export{}
type IsString<T> = T extends string ? "yes" : "no";

type Test1 = IsString<string>; // "yes"
type Test2 = IsString<number>; // "no"


///////////////////////////////////////////////
// 2. DISTRIBUTIVE CONDITIONAL TYPES
//
// Conditional types automatically distribute
// over unions IF the type parameter is naked.
//
// Example: (A | B) extends U ? X : Y
// becomes: (A extends U ? X : Y) |
//          (B extends U ? X : Y)
//

type DistributeExample<T> =
  T extends string ? "string" : "not string";

type D1 = DistributeExample<string | number>;
// Result: "string" | "not string"
//
// Because it evaluated each member of the union separately:
// - string → "string"
// - number → "not string"


///////////////////////////////////////////////
// 3. COMMON BUILT-IN CONDITIONAL TYPES
///////////////////////////////////////////////

//
// a. NonNullable<T>
// Removes null and undefined
//
type NonNullableDemo = NonNullable<string | null | undefined>;
// → string

//
// b. Exclude<T, U>
// Removes all members of T that are assignable to U
//
type ExcludeDemo = Exclude<"a" | "b" | "c", "b">;
// → "a" | "c"

//
// c. Extract<T, U>
// Keeps ONLY the members of T assignable to U
//
type ExtractDemo = Extract<
  "a" | "b" | "c",
  "b" | "c"
>;
// → "b" | "c"


///////////////////////////////////////////////
// 4. BUILDING CUSTOM CONDITIONAL HELPERS
///////////////////////////////////////////////

//
// a. IsNullable<T>
// Checks whether a type is null or undefined
//
type IsNullable<T> =
  T extends null | undefined ? true : false;

type N1 = IsNullable<string>;      // false
type N2 = IsNullable<null>;        // true
type N3 = IsNullable<string | null>; 
// Note: Distributive → true | false

//
// b. ReplaceNull<T>
// Converts null to never
//
type ReplaceNull<T> = T extends null ? never : T;
type R1 = ReplaceNull<string | null>; 
// → string | never → string

//
// c. Flatten<T>
// Turns T[] into T, otherwise returns T
//
type Flatten<T> =
  T extends (infer U)[] ? U : T;

type F1 = Flatten<number[]>; // number
type F2 = Flatten<string>;   // string



///////////////////////////////////////////////
// MULTIPLE PRACTICAL EXAMPLES
///////////////////////////////////////////////

//
// Example: Safe API Response
//
type ApiResponse<T> =
  T extends Error ? { ok: false; error: T }
  : { ok: true; value: T };

type Res1 = ApiResponse<string>;
// { ok: true; value: string }

type Res2 = ApiResponse<Error>;
// { ok: false; error: Error }



///////////////////////////////////////////////
// SUMMARY (runtime output)
///////////////////////////////////////////////

console.log("=== Conditional Types Demo ===");
console.log("✓ Basic conditional types");
console.log("✓ Distributive behavior over unions");
console.log("✓ NonNullable, Exclude, Extract");
console.log("✓ Custom conditional type helpers");
console.log("✓ Practical examples implemented");
