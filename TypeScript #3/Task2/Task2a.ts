/********************************************************************
 * OPTIONAL, REQUIRED, READONLY, CONST — Explained in One Code File
 ********************************************************************/


// ================================================================
// 1. OPTIONAL PROPERTIES — Using "?"
// ================================================================
// Meaning: The property MAY exist OR may be undefined.

interface UserProfile {
  username: string;       // required
  bio?: string;           // optional (string | undefined)
}

const userB: UserProfile = {
  id: "123",
  name: "Suuru",
  age: 30,
  email: "suuru@example.com",
  isActive: true,
  username: "Suuru"
  // bio is optional
};

const userC: UserProfile = {
  id: "124",
  name: "Ada",
  age: 28,
  email: "ada@example.com",
  isActive: true,
  username: "Ada",
  bio: "Software dev"
};



// ================================================================
// 2. REQUIRED PROPERTIES — Default in TypeScript
// ================================================================
// Any property without "?" must exist.

interface Car {
  brand: string;     // required
  model: string;     // required
  year?: number;     // optional
}

const myCar: Car = {
  brand: "Toyota",
  model: "Camry"
  // year can be omitted → OK
};


// ================================================================
// 3. READONLY PROPERTIES
// ================================================================
// Meaning: The value cannot be changed AFTER creation.

interface ProductInfo {
  readonly id: string;    // cannot be reassigned
  name: string;
}

const item: ProductInfo = {
  id: "P100",
  name: "String"
};

// item.id = "NEW-ID";  ❌ ERROR: Cannot assign to 'id' because it is readonly.
// item.name = "New Laptop"; ✔ OK — name is not readonly.


// ================================================================
// 4. READONLY IN CLASSES
// ================================================================
class Person {
  readonly id: number;     // set once in constructor
  name: string;

  constructor(id: number, name: string) {
    this.id = id;          // allowed ONLY inside constructor
    this.name = name;
  }

  rename(newName: string) {
    this.name = newName;   // ✔ allowed
    // this.id = 20;        ❌ ERROR (readonly)
  }
}

const p = new Person(1, "John Doe");
p.rename("New Name");
console.log(p.name);


// ================================================================
// 5. readonly vs const (VERY IMPORTANT DIFFERENCE)
// ================================================================
/**
 * READONLY (Type-Level Immutability):
 *   - Applies to properties INSIDE objects/interfaces/classes
 *   - Prevents REASSIGNMENT of the property after initialization
 *   - The variable itself may change
 *
 * CONST (Variable Binding Immutability):
 *   - Applies to VARIABLES, not properties
 *   - The variable cannot be reassigned to a new value
 *   - But object contents CAN still change
 */


// ---------------------------------------------------------------
// Example 1: readonly only protects the PROPERTY
// ---------------------------------------------------------------

const obj = {
  x: 10
};

obj.x = 20;  // ✔ allowed — const does NOT freeze object
// obj = {}   ❌ ERROR (cannot reassign const variable)


// ---------------------------------------------------------------
// Example 2: readonly freezes the field, not the variable
// ---------------------------------------------------------------

interface Settings {
  readonly theme: string;
}

let s: Settings = { theme: "dark" };

// s.theme = "light";    ❌ ERROR — readonly prevents modification
s = { theme: "dark" };    // ✔ allowed — variable can be reassigned


// ---------------------------------------------------------------
// SUMMARY:
// ---------------------------------------------------------------
// const → prevents REBINDING of a variable
// readonly → prevents REASSIGNMENT of a property inside an object
//
// They work together but have different roles.


// ================================================================
// END OF FILE — All concepts demonstrated
// ================================================================
