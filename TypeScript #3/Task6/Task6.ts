/***********************************************************
 * INDEX SIGNATURES & RECORD<K, V>
 *
 * This file explains:
 * - Index signatures
 * - Use cases (dynamic objects, dictionaries)
 * - Difference between index signatures & Record<K, V>
 ***********************************************************/



/***********************************************************
 * 1. BASIC INDEX SIGNATURE SYNTAX
 ***********************************************************/

// `{ [key: string]: number }`
// Meaning: any string key is allowed, and its value must be a number.
interface StringNumberMap {
  [key: string]: number;
}

const scores: StringNumberMap = {
  math: 95,
  english: 88,
  // science: "A+" ❌ ERROR — must be number
};



// `{ [key: number]: string }`
// Meaning: numeric keys allowed, value must be a string.
// Internally numeric index keys are converted to strings.
interface NumberStringMap {
  [key: number]: string;
}

const indexLabels: NumberStringMap = {
  0: "start",
  1: "middle",
  2: "end",
};



/***********************************************************
 * 2. USE CASES FOR INDEX SIGNATURES
 ***********************************************************/

/*** A. DICTIONARY / DYNAMIC OBJECT ***/
interface PriceMap {
  [productName: string]: number;
}

const prices: PriceMap = {
  laptop: 430000,
  phone: 250000,
};

prices["tablet"] = 300000;  // allowed (dynamic key)



/*** B. OBJECTS WHERE KEYS ARE UNKNOWN UNTIL RUNTIME ***/
function countWords(words: string[]) {
  const map: { [key: string]: number } = {};

  for (const w of words) {
    map[w] = (map[w] || 0) + 1;
  }
  return map;
}

console.log(countWords(["a", "b", "a", "c"]));
// { a: 2, b: 1, c: 1 }



/***********************************************************
 * 3. DIFFERENCE BETWEEN INDEX SIGNATURES & Record<K, V>
 ***********************************************************/


/*** A. Index Signature — flexible, unlimited keys ***/
type UserAgeMap = {
  [username: string]: number; // ANY string key allowed
};


/*** B. Record<K, V> — requires you to define the keys ahead of time ***/

// The keys *must* be known (literal union)
type Role = "admin" | "editor" | "viewer";

type RoleDescriptions = Record<Role, string>;

const roles: RoleDescriptions = {
  admin: "Full access",
  editor: "Can edit articles",
  viewer: "Read-only",
  // contributor: "..." ❌ ERROR — not allowed because not in Role
};


/***********************************************************
 * 4. WHEN TO USE WHICH?
 ***********************************************************/

/*
Index Signature:
----------------
Use it when the keys are:
✔ dynamic
✔ unknown ahead of time
✔ unlimited

Example: cache, dictionary, word counter


Record<K, V>:
-------------
Use it when the keys are:
✔ known in advance (union types)
✔ restricted
✔ should be enforced

Example: role → description mapping, config objects
*/



/***********************************************************
 * 5. SUMMARY
 ***********************************************************/
/*
- `{ [key: string]: number }` → any string key allowed, value must be number
- `{ [key: number]: string }` → numeric index, value must be string
- Index signatures are for dynamic keys
- `Record<K, V>` is for fixed sets of keys
*/

export {};
