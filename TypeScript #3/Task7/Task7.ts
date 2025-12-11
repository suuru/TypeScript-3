// ============================================================================
// MAPPED TYPES
// ============================================================================

// Basic mapped type syntax: { [K in keyof T]: T[K] }
// This iterates over all keys K in T and preserves their types

// Example: Identity mapped type (does nothing, just demonstrates syntax)
type Identity<T> = { [K in keyof T]: T[K] };

interface User {
  id: number;
  name: string;
  email: string;
}

type IdentityUser = Identity<User>; // Same as User


// ============================================================================
// BUILT-IN UTILITY TYPES
// ============================================================================

// 1. Partial<T> - Makes all properties optional
// Implementation: { [K in keyof T]?: T[K] }
type PartialUser = Partial<User>;
// Result: { id?: number; name?: string; email?: string; }

const partialUser: PartialUser = { name: 'Alice' }; // id and email are optional


// 2. Required<T> - Makes all properties required
// Implementation: { [K in keyof T]-?: T[K] }
interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;
// Result: { id: number; name: string; email: string; }

const requiredUser: RequiredUser = { 
  id: 1, 
  name: 'Bob', 
  email: 'bob@example.com' 
}; // All fields required


// 3. Readonly<T> - Makes all properties readonly
// Implementation: { readonly [K in keyof T]: T[K] }
type ReadonlyUser = Readonly<User>;
// Result: { readonly id: number; readonly name: string; readonly email: string; }

const readonlyUser: ReadonlyUser = { id: 1, name: 'Charlie', email: 'charlie@example.com' };
// readonlyUser.name = 'David'; // Error: Cannot assign to 'name' because it is a read-only property


// 4. Pick<T, K> - Pick specific properties from T
// Implementation: { [P in K]: T[P] }
type UserPreview = Pick<User, 'id' | 'name'>;
// Result: { id: number; name: string; }

const preview: UserPreview = { id: 1, name: 'Eve' };


// 5. Omit<T, K> - Omit specific properties from T
// Implementation: Pick<T, Exclude<keyof T, K>>
type UserWithoutEmail = Omit<User, 'email'>;
// Result: { id: number; name: string; }

const userNoEmail: UserWithoutEmail = { id: 2, name: 'Frank' };


// 6. Record<K, T> - Creates an object type with keys K and values T
// Implementation: { [P in K]: T }
type UserRoles = Record<string, string>;
const roles: UserRoles = {
  admin: 'Administrator',
  user: 'Regular User',
  guest: 'Guest User'
};

type StatusCodes = Record<number, string>;
const httpStatus: StatusCodes = {
  200: 'OK',
  404: 'Not Found',
  500: 'Internal Server Error'
};


// 7. ReturnType<T> - Extract the return type of a function
// Implementation: Uses conditional types and infer keyword
function getUser(): User {
  return { id: 1, name: 'Grace', email: 'grace@example.com' };
}

type GetUserReturn = ReturnType<typeof getUser>;
// Result: User

const userFromReturn: GetUserReturn = { id: 3, name: 'Henry', email: 'henry@example.com' };


// 8. Parameters<T> - Extract parameter types of a function as a tuple
// Implementation: Uses conditional types and infer keyword
function createUser(name: string, email: string, age: number): User {
  return { id: Date.now(), name, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// Result: [name: string, email: string, age: number]

const params: CreateUserParams = ['Ivy', 'ivy@example.com', 25];


// ============================================================================
// CUSTOM UTILITY TYPES
// ============================================================================

// Custom MyOptional<T> - Makes all properties optional (same as Partial)
type MyOptional<T> = { [K in keyof T]?: T[K] };

interface Product {
  id: number;
  name: string;
  price: number;
}

type OptionalProduct = MyOptional<Product>;
// Result: { id?: number; name?: string; price?: number; }

const optionalProduct: OptionalProduct = { name: 'Laptop' };


// Custom MyReadonly<T> - Makes all properties readonly
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

type ReadonlyProduct = MyReadonly<Product>;
// Result: { readonly id: number; readonly name: string; readonly price: number; }

export {};
const readonlyProduct: ReadonlyProduct = { id: 1, name: 'Mouse', price: 29.99 };
// readonlyProduct.price = 19.99; // Error: Cannot assign to 'price' because it is a read-only property


// ============================================================================
// ADVANCED CUSTOM UTILITY TYPES
// ============================================================================

// Nullable<T> - Makes all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

type NullableUser = Nullable<User>;
// Result: { id: number | null; name: string | null; email: string | null; }

const nullableUser: NullableUser = { id: 1, name: null, email: 'jack@example.com' };


// DeepReadonly<T> - Makes all properties and nested properties readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Company {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type ReadonlyCompany = DeepReadonly<Company>;
const company: ReadonlyCompany = {
  name: 'TechCorp',
  address: { street: '123 Main St', city: 'New York' }
};
// company.address.city = 'Boston'; // Error: Cannot assign to 'city' because it is a read-only property


// ============================================================================
// PRACTICAL EXAMPLES
// ============================================================================

// Example: Update user function using Partial
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const originalUser: User = { id: 1, name: 'Kate', email: 'kate@example.com' };
const updatedUser = updateUser(originalUser, { name: 'Katherine' });
console.log(updatedUser); // { id: 1, name: 'Katherine', email: 'kate@example.com' }


// Example: Configuration with Record
type Config = Record<string, string | number | boolean>;
const appConfig: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  debug: true
};


// Example: Type-safe state management
type State = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type Action = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

console.log('Mapped types and utility types examples completed!');