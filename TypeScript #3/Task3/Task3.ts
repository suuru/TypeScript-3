/*******************************************************
 * ENUMS VS UNION LITERALS — SINGLE PAGE EXPLANATION
 *******************************************************/

/*
========================================================
1. UNION OF LITERALS (lightweight, recommended)
========================================================
- No runtime object is created.
- Pure TypeScript types → removed at compile time.
- Best for most modern applications.
*/

type UserRole = "admin" | "user";

const u1: UserRole = "admin";    // OK
// const u2: UserRole = "manager"; // ❌ ERROR — not allowed



/*
========================================================
2. NUMERIC ENUMS (default behavior)
========================================================
- Auto-increment numbers starting from 0.
- Has reverse mapping → Status[0] === "Pending".
*/

enum StatusNumeric {
  Pending,    // 0
  Approved,   // 1
  Rejected    // 2
}

console.log(StatusNumeric.Pending);  // 0
console.log(StatusNumeric[1]);       // "Approved"



/*
========================================================
3. STRING ENUMS
========================================================
- Assigns explicit strings.
- No reverse mapping.
- Good for readable API values.
*/

enum StatusString {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

const orderStatus: StatusString = StatusString.Approved;



/*
========================================================
4. CONST ENUMS
========================================================
- Completely removed from output.
- Values are inlined by the compiler.
- Best performance, but not compatible with all build tools.
*/

const enum Direction {
  Up,
  Down,
  Left,
  Right
}

let move = Direction.Left; // compiled to: let move = 2;



/*
========================================================
5. ENUM vs UNION — WHEN TO USE WHAT
========================================================

USE UNION LITERALS:
- When you only need type checking.
- When you want zero runtime overhead.
- UI strings, API field values, component props.

USE ENUMS:
- When you need a real JS object at runtime.
- When your code must run AND store the same constants.
- Config settings, shared backend + frontend constant groups.
*/



/*
========================================================
6. REAL-WORLD EXAMPLE USING ALL CONCEPTS TOGETHER
========================================================
*/

//
// (A) API roles (frontend-only): use UNION LITERALS
//
type APIRole = "admin" | "user";


//
// (B) Order state (stored in DB): use STRING ENUM
//
enum OrderState {
  New = "NEW",
  Processing = "PROCESSING",
  Completed = "COMPLETED"
}


//
// (C) Game directions (performance-sensitive): use CONST ENUM
//
const enum GameDirection {
  Up,
  Down,
  Left,
  Right
}


//
// (D) Log level (uses numeric enum for severity ranking)
//
enum LogLevel {
  Info = 1,
  Warning = 2,
  Error = 3
}


//
// (E) Using everything
//
interface User {
  id: string;
  role: APIRole;              // union literal
  lastOrderStatus: OrderState; // string enum
}

const user: User = {
  id: "100",
  role: "admin",
  lastOrderStatus: OrderState.New
};

function log(message: string, level: LogLevel) {
  console.log(`[${LogLevel[level]}] ${message}`);
}

log("System booting...", LogLevel.Info);

const movePlayer = (dir: GameDirection) => {
  if (dir === GameDirection.Left) console.log("Moving left…");
};

movePlayer(GameDirection.Left);



