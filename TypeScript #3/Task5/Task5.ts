// ================================
// Generics in TypeScript
// ================================

// 1️⃣ Generic function
// A function that works with any type while keeping type safety
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);         // T inferred as number
const str = identity('Hello');    // T inferred as string
console.log(num, str);

// 2️⃣ Generic interface / type
interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Example with a user type
type User = { id: number; name: string };

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'Suuru' }
};

const errorResponse: ApiResponse<null> = {
  data: null,
  error: 'User not found'
};

console.log(userResponse, errorResponse);

// 3️⃣ Generic constraints
// Constraint: T must be an object
function logKeys<T extends object>(obj: T): void {
  console.log(Object.keys(obj));
}

logKeys({ a: 1, b: 2 });
// logKeys(42); // ❌ Error: number does not satisfy constraint 'object'

// Constraint: T extends keyof U
function getProperty<U, T extends keyof U>(obj: U, key: T) {
  return obj[key];
}

const person = { id: 1, name: 'Ada', age: 25 };
const personName = getProperty(person, 'name'); // 'name' is keyof person
console.log(personName);

// 4️⃣ Generic class
class DataStore<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const store = new DataStore<User>();
store.add({ id: 2, name: 'John' });
console.log(store.getAll());

// ================================
// Advantages of generics:
// - Reuse code for multiple types
// - Maintain type safety without using 'any'
// - Works with functions, interfaces, types, and classes
// ================================
