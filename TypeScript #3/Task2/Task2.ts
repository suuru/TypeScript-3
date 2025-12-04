/********************************************************************
 * INTERFACES vs TYPE ALIASES — Explained in a Single Code File
 ********************************************************************/

// ================================================================
// 1. INTERFACES — Declaring object shapes
// ================================================================

interface AppUser {
  id: string;
  name: string;
  isActive: boolean;
}

// Interfaces describe the SHAPE of an object
const u1: AppUser = {
  id: "101",
  name: "Suuru",
  isActive: true
};


// ================================================================
// 2. EXTENDING INTERFACES
// ================================================================
// You can build on top of an existing interface using "extends"

interface AdminUserInterface extends AppUser {
  permissions: string[];
}

const admin1: AdminUserInterface = {
  id: "A10",
  name: "Super Admin",
  isActive: true,
  permissions: ["read", "write", "delete"]
};


// ================================================================
// 3. TYPE ALIASES — using `type`
// ================================================================
// Type aliases can describe:
//  - Objects
//  - Primitives
//  - Unions
//  - Intersections
//  - Function signatures

// Primitive type alias
type userID = string;

// Object type alias (similar to interface)
type product = {
  id: number;
  title: string;
  price: number;
};

type Product = {
  id: string;
  title: string;
  price: string;
};


// ---------------------------------------------------------------
// UNION TYPES — possible multiple types
// ---------------------------------------------------------------

type ApiResponse = string | number | boolean;

let r: ApiResponse = "OK";
r = 200;


// ---------------------------------------------------------------
// INTERSECTION TYPES — combining multiple types
// ---------------------------------------------------------------

type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type ProductWithDates = Product & Timestamps;

const newProduct: ProductWithDates = {
  id: "string",
  title: "Phone",
  price: "200000",
  createdAt: new Date(),
  updatedAt: new Date()
};


// ================================================================
// 4. DIFFERENCES BETWEEN INTERFACE & TYPE
// ================================================================

// ---------------------------------------------------------------
// (A) Declaration Merging — ONLY INTERFACES can do this
// ---------------------------------------------------------------

// You can re-open an interface and add more fields
interface AppUser {
  // merging: this will merge into the first AppUser interface
  email?: string;
}

// Now AppUser includes: id, name, isActive, email
const mergedUser: AppUser = {
  id: "300",
  name: "Merged",
  isActive: false,
  email: "test@example.com"
};

// ❌ types cannot merge — they would cause an error
// type Product = { foo: string } // <-- ERROR: duplicate type name


// ---------------------------------------------------------------
// (B) Type Alias is more powerful (unions, intersections, etc.)
// ---------------------------------------------------------------

// Example: You CANNOT do this with interface:
type Status = "pending" | "active" | "closed";


// ---------------------------------------------------------------
// (C) Interfaces are better for OOP-style object modeling
// ---------------------------------------------------------------

// Example: You cannot "extend" a union type the same way.
// Interfaces allow clean extension:
interface Machine {
  id: number;
}
interface Robot extends Machine {
  model: string;
}


// ================================================================
// 5. WHEN TO USE WHAT (REAL PROJECT GUIDELINES)
// ================================================================

/**
 * ✔ USE INTERFACE WHEN:
 *   - You are describing the shape of an object
 *   - You expect the type to be extended later
 *   - You want declaration merging
 *
 * ✔ USE TYPE WHEN:
 *   - You need unions ("A | B")
 *   - You need intersections ("A & B")
 *   - You are defining primitives, tuples, functions
 *   - You are building complex utility types
 *
 * REALITY:
 *   - Both work for objects
 *   - Many modern teams prefer type because it's more flexible
 *   - Use interface for public API / SDK shapes
 *   - Use type for internal logic and composable types
 */


// 
