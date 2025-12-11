// Generic function to wrap a value in an array
function wrapInArray<T>(value: T): T[] {
  return [value];
}

// Generic function to map an array
function mapArray<T, U>(items: T[], mapFn: (item: T) => U): U[] {
  return items.map(mapFn);
}

// Generic ApiResponse interface
interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T | undefined;
  message?: string;
  timestamp: Date;
}

// User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Product interface
interface Product {
  id: number;
  title: string;
  price: number;
  inStock: boolean;
}

// Examples using wrapInArray
const wrappedNumber = wrapInArray(42);
console.log(wrappedNumber); // [42]

const wrappedString = wrapInArray('hello');
console.log(wrappedString); // ['hello']

const wrappedUser = wrapInArray<User>({ id: 1, name: 'Alice', email: 'alice@example.com' });
console.log(wrappedUser); // [{ id: 1, name: 'Alice', email: 'alice@example.com' }]

// Examples using mapArray
const numbers = [1, 2, 3, 4, 5];
const doubled = mapArray(numbers, (n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const strings = ['hello', 'world'];
const lengths = mapArray(strings, (s) => s.length);
console.log(lengths); // [5, 5]

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

const userNames = mapArray(users, (user) => user.name);
console.log(userNames); // ['Alice', 'Bob']

// Examples using ApiResponse with User
const userResponse: ApiResponse<User> = {
  status: 'success',
  data: { id: 1, name: 'Alice', email: 'alice@example.com' },
  timestamp: new Date()
};

const userErrorResponse: ApiResponse<User> = {
  status: 'error',
  message: 'User not found',
  timestamp: new Date()
};

// Examples using ApiResponse with Product
const productResponse: ApiResponse<Product> = {
  status: 'success',
  data: { id: 101, title: 'Laptop', price: 999.99, inStock: true },
  timestamp: new Date()
};

const productErrorResponse: ApiResponse<Product> = {
  status: 'error',
  message: 'Product out of stock',
  timestamp: new Date()
};

// Example using ApiResponse with array of Products
const productsResponse: ApiResponse<Product[]> = {
  status: 'success',
  data: [
    { id: 101, title: 'Laptop', price: 999.99, inStock: true },
    { id: 102, title: 'Mouse', price: 29.99, inStock: true }
  ],
  timestamp: new Date()
};

// Helper function to handle ApiResponse
function handleResponse<T>(response: ApiResponse<T>): void {
  if (response.status === 'success' && response.data) {
    console.log('Success:', response.data);
  } else {
    console.log('Error:', response.message);
  }
}

handleResponse(userResponse);
handleResponse(productResponse);
handleResponse(userErrorResponse);