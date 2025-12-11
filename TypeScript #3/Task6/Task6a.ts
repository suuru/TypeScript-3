/***********************************************************
 *  TYPEOF + KEYOF IN TYPESCRIPT
 *
 *  Concepts covered:
 *  - typeof in type positions
 *  - keyof to extract property names
 *  - combining keyof + typeof
 *  - using keyof for safe property access
 ***********************************************************/



/***********************************************************
 * 1. typeof IN TYPE POSITIONS
 *    Converts the *value type* of a variable into a *type*.
 ***********************************************************/

const settings = {
  theme: "dark",
  version: 5,
  debug: true,
};

// Create a type based on the runtime object:
type SettingsType = typeof settings;

// Equivalent to:
// type SettingsType = {
//   theme: string;
//   version: number;
//   debug: boolean;
// };

const s: SettingsType = {
  theme: "light",
  version: 10,
  debug: false,
};



/***********************************************************
 * 2. KEYOF
 *    Produces a union of the keys of a type.
 ***********************************************************/

interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;
// Equivalent to: "id" | "name" | "email"



/***********************************************************
 * 3. COMBINING typeof + keyof
 ***********************************************************/

// Runtime config object
const config = {
  apiUrl: "https://api.example.com",
  retries: 3,
  timeout: 5000,
};

type ConfigType = typeof config;
type ConfigKeys = keyof typeof config;
// "apiUrl" | "retries" | "timeout"

// Example: Only allow these keys:
let key: ConfigKeys;

key = "apiUrl";   // OK
// key = "unknown";  // ❌ ERROR



/***********************************************************
 * 4. USING keyof FOR SAFE PROPERTY ACCESS
 ***********************************************************/

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  // K must be one of the keys of T → prevents invalid access
  return obj[key];
}

const user: User = {
  id: 1,
  name: "Suuru",
  email: "suuru@example.com",
};

// Safe:
console.log(getProp(user, "name")); // OK

// Unsafe, blocked by TS:
// getProp(user, "password"); // ❌ ERROR (not a key of User)



/***********************************************************
 * 5. PRACTICAL SAFE CONFIG GETTER
 ***********************************************************/

function getConfigValue(key: ConfigKeys) {
  return config[key]; // fully type-safe
}

console.log(getConfigValue("timeout")); // 5000
// getConfigValue("mode"); // ❌ ERROR (not in config)



/***********************************************************
 * SUMMARY
 ***********************************************************/
/*
typeof (in types):
------------------
- Converts a variable's value type into a TypeScript type.

keyof:
------
- Extracts all property keys as a union of strings.

keyof + typeof:
---------------
- Allows generating a type-safe set of keys from runtime objects.

Safe access:
------------
- Use function getProp<T, K extends keyof T>(...) to prevent invalid keys.
*/

export {};
