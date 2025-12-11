// ============================================================================
// USER INTERFACE
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}


// ============================================================================
// SIMULATING API RESPONSES
// ============================================================================

// Simulate API calls that return unknown data
function fetchUserDataUnknown(): unknown {
  // This could be valid data
  return {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    age: 30
  };
}

function fetchUserDataInvalid(): unknown {
  // This could be invalid/malformed data
  return {
    id: '123', // Wrong type! Should be number
    name: 'Bob',
    email: 'bob@example.com',
    // Missing required fields
  };
}

function fetchUserDataMalicious(): unknown {
  // This could be malicious/unexpected data
  return {
    id: 2,
    name: 'Charlie',
    email: 'charlie@example.com',
    __proto__: { isAdmin: true }, // Prototype pollution attempt
    toString: () => 'Malicious'
  };
}


// ============================================================================
// TYPE GUARDS FOR SAFE TYPE NARROWING
// ============================================================================

// Basic type guard: Check if value is an object
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// Type guard: Check if value has a specific property
function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

// Type guard: Check if value is a number
function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

// Type guard: Check if value is a string
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Comprehensive type guard for User
function isUser(data: unknown): data is User {
  // First check if it's an object
  if (!isObject(data)) {
    console.log('❌ Not an object');
    return false;
  }

  // Check required properties exist
  if (!hasProperty(data, 'id') || !hasProperty(data, 'name') || !hasProperty(data, 'email')) {
    console.log('❌ Missing required properties');
    return false;
  }

  // Check id is a number
  if (!isNumber(data.id)) {
    console.log('❌ id is not a number');
    return false;
  }

  // Check name is a string
  if (!isString(data.name)) {
    console.log('❌ name is not a string');
    return false;
  }

  // Check email is a string
  if (!isString(data.email)) {
    console.log('❌ email is not a string');
    return false;
  }

  // Check optional age property if it exists
  if (hasProperty(data, 'age') && data.age !== undefined && !isNumber(data.age)) {
    console.log('❌ age is not a number');
    return false;
  }

  // All checks passed
  return true;
}

// Alternative: More detailed type guard with error messages
// Define User interface outside the function
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  role: string; // required
}

// Type guards helpers (example)
function isObject1(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isString1(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber1(value: unknown): value is number {
  return typeof value === 'number';
}

function hasProperty1<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}

// Parse user function
function parseUser(data: unknown): User | null {
  if (!isObject(data)) {
    console.error('Parse error: Data is not an object');
    return null;
  }

  if (!hasProperty(data, 'id') || !isNumber(data.id)) {
    console.error('Parse error: Invalid or missing id');
    return null;
  }

  if (!hasProperty(data, 'name') || !isString(data.name)) {
    console.error('Parse error: Invalid or missing name');
    return null;
  }

  if (!hasProperty(data, 'email') || !isString(data.email)) {
    console.error('Parse error: Invalid or missing email');
    return null;
  }

  if (!hasProperty(data, 'role') || !isString(data.role)) {
    console.error('Parse error: Invalid or missing role');
    return null;
  }

  // Optional age field
  const age =
    hasProperty(data, 'age') && data.age !== undefined && isNumber(data.age)
      ? data.age
      : undefined;

  // Return the User object
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    age
  };
}





// ============================================================================
// SAFE APPROACH: Using unknown with Type Guards
// ============================================================================

console.log('=== SAFE APPROACH: Using unknown with Type Guards ===\n');

// Example 1: Valid data
const data1: unknown = fetchUserDataUnknown();

if (isUser(data1)) {
  // TypeScript knows data1 is User here
  console.log('✅ Valid user:', data1.name);
  console.log('Email:', data1.email);
  console.log('ID:', data1.id);
} else {
  console.log('❌ Invalid user data');
}

// Example 2: Invalid data - Type guard catches it
console.log('\n--- Testing invalid data ---');
const data2: unknown = fetchUserDataInvalid();

if (isUser(data2)) {
  console.log('✅ Valid user:', data2.name);
} else {
  console.log('❌ Invalid user data - Type guard prevented errors!');
}

// Example 3: Using parseUser
console.log('\n--- Using parseUser function ---');
const data3: unknown = fetchUserDataUnknown();
const User = parseUser(data3);

if (user !== null) {
  console.log('✅ Parsed user successfully:', user);
  // Safe to use all User properties
  console.log(`User ${user.name} has email ${user.email}`);
} else {
  console.log('❌ Failed to parse user');
}

// Example 4: Cannot access properties without narrowing
console.log('\n--- Attempting to access unknown without narrowing ---');
const data4: unknown = fetchUserDataUnknown();
// console.log(data4.name); // ❌ Error: Object is of type 'unknown'
// console.log(data4.email); // ❌ Error: Object is of type 'unknown'
console.log('✅ TypeScript prevents accessing properties on unknown type');


// ============================================================================
// UNSAFE APPROACH: Using any (Shows Hidden Errors)
// ============================================================================

console.log('\n\n=== UNSAFE APPROACH: Using any (Hides Errors) ===\n');

// Example 1: Using any - No type safety!
const unsafeData1: any = fetchUserDataInvalid();

// TypeScript allows this, but it's wrong!
console.log('--- Using any with invalid data ---');
console.log('Name:', unsafeData1.name); // Works
console.log('ID type:', typeof unsafeData1.id); // 'string' but should be number!

// This compiles but will cause runtime errors
function processUser(user: User) {
  // Assuming id is a number, but it might not be!
  const doubledId = user.id * 2;
  return doubledId;
}

try {
  const result = processUser(unsafeData1 as User); // Unsafe cast!
  console.log('Doubled ID:', result); // NaN! Because id was a string
} catch (error) {
  console.log('Error:', error);
}

// Example 2: any allows accessing non-existent properties
console.log('\n--- any allows accessing anything ---');
const unsafeData2: any = fetchUserDataUnknown();
console.log(unsafeData2.nonExistentProperty); // undefined, no error!
console.log(unsafeData2.address.street); // Runtime error!

// Example 3: any bypasses all type checking
console.log('\n--- any bypasses type checking ---');
const unsafeData3: any = "just a string";
// This compiles but is completely wrong!
const fakeUser: User = unsafeData3;
// console.log(fakeUser.id.toFixed(2)); // Would crash at runtime!
console.log('❌ any allows assigning string to User type!');


// ============================================================================
// COMPARISON: unknown vs any
// ============================================================================

console.log('\n\n=== COMPARISON: unknown vs any ===\n');

function demonstrateUnknown(data: unknown) {
  // Must narrow type before use
  if (isUser(data)) {
    console.log('✅ unknown: Type guard required -', data.name);
  }
  // console.log(data.name); // ❌ Error: Object is of type 'unknown'
}

function demonstrateAny(data: any) {
  // No type checking at all!
  console.log('❌ any: No safety -', data.name); // Compiles even if name doesn't exist
  console.log('❌ any: Allows anything -', data.nonExistent.property); // Runtime error!
}

const testData: unknown = fetchUserDataUnknown();
demonstrateUnknown(testData);

console.log('\n--- Calling demonstrateAny (will error) ---');
try {
  demonstrateAny(testData);
} catch (error) {
  console.log('Runtime error caught:', error);
}


// ============================================================================
// BEST PRACTICES
// ============================================================================

console.log('\n\n=== BEST PRACTICES ===\n');

// 1. Always use unknown for external data
async function fetchUser(): Promise<User | null> {
  try {
    const response: unknown = fetchUserDataUnknown(); // From API
    return parseUser(response);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// 2. Create reusable type guards
function isUserArray(data: unknown): data is User[] {
  return Array.isArray(data) && data.every(isUser);
}

// 3. Handle errors gracefully
function safeProcessUser(data: unknown): string {
  const user = parseUser(data);
  
  if (user === null) {
    return 'Invalid user data';
  }
  
  return `User: ${user.name} (${user.email})`;
}

const resultA = safeProcessUser(fetchUserDataUnknown());
const resultB = safeProcessUser(fetchUserDataInvalid());

console.log('✅ Safe processing result 1:', result1);
console.log('✅ Safe processing result 2:', result2);


// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n\n=== SUMMARY ===');
console.log('
✅ UNKNOWN (Safe):');
console.log('  - Forces type checking before use');
console.log('  - Requires type guards for narrowing');
console.log('  - Catches errors at compile time');
console.log('  - Prevents accessing non-existent properties');
console.log('
❌ ANY (Unsafe):');
console.log('  - Bypasses all type checking');
console.log('  - Allows accessing anything');
console.log('  - Hides errors until runtime');
console.log('  - Should be avoided in most cases');
console.log('
💡 Best Practice: Use unknown for external data and create type guards!');