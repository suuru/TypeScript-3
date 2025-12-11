// ============================================================================
// FUNCTION OVERLOAD SIGNATURES
// ============================================================================

// Overload 1: Accept Date and return string
function formatDate(date: Date): string;

// Overload 2: Accept string and return string
function formatDate(date: string): string;

// Implementation signature (not visible to callers)
function formatDate(date: Date | string): string {
  let dateObj: Date;

  // Handle string input
  if (typeof date === 'string') {
    dateObj = new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date string';
    }
  } else {
    // Handle Date input
    dateObj = date;
  }

  // Format the date as YYYY-MM-DD
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


// ============================================================================
// TESTING formatDate OVERLOADS
// ============================================================================

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║           Testing formatDate Overloads                    ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Test 1: Passing a Date object
console.log('Test 1: Passing Date object');
const dateObj = new Date('2024-03-15');
const formatted1 = formatDate(dateObj);
console.log(`Input: Date object (2024-03-15)`);
console.log(`Output: ${formatted1}`);
console.log(`Type checking: ✅ Accepts Date\n`);

// Test 2: Passing a string
console.log('Test 2: Passing string');
const dateString = '2024-12-25';
const formatted2 = formatDate(dateString);
console.log(`Input: "${dateString}"`);
console.log(`Output: ${formatted2}`);
console.log(`Type checking: ✅ Accepts string\n`);

// Test 3: Current date
console.log('Test 3: Current date');
const now = new Date();
const formatted3 = formatDate(now);
console.log(`Input: new Date() (current time)`);
console.log(`Output: ${formatted3}\n`);

// Test 4: Different string format
console.log('Test 4: Different date string formats');
const formatted4 = formatDate('December 25, 2024');
console.log(`Input: "December 25, 2024"`);
console.log(`Output: ${formatted4}\n`);

// Test 5: Invalid date string
console.log('Test 5: Invalid date string');
const formatted5 = formatDate('not-a-date');
console.log(`Input: "not-a-date"`);
console.log(`Output: ${formatted5}\n`);

// Test 6: Type checking (these would cause compile errors)
console.log('Test 6: Type safety');
// formatDate(12345); // ❌ Error: Argument of type 'number' is not assignable
// formatDate(null); // ❌ Error: Argument of type 'null' is not assignable
// formatDate(); // ❌ Error: Expected 1 argument, but got 0
console.log('✅ TypeScript only allows Date or string arguments\n');


// ============================================================================
// MORE COMPLEX OVERLOAD EXAMPLES
// ============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║        More Complex Overload Examples                     ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Example 1: Overloaded function with format options
function formatDateTime(date: Date, format: 'short'): string;
function formatDateTime(date: Date, format: 'long'): string;
function formatDateTime(date: string, format: 'short'): string;
function formatDateTime(date: string, format: 'long'): string;
function formatDateTime(date: Date | string, format: 'short' | 'long'): string {
  let dateObj: Date;

  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (format === 'short') {
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  } else {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return dateObj.toLocaleString('en-US', options);
  }
}

console.log('Example 1: formatDateTime with format options');
const testDate = new Date('2024-03-15T14:30:00');
console.log(`Short format: ${formatDateTime(testDate, 'short')}`);
console.log(`Long format: ${formatDateTime(testDate, 'long')}`);
console.log(`String input (short): ${formatDateTime('2024-12-25', 'short')}`);
console.log(`String input (long): ${formatDateTime('2024-12-25', 'long')}\n`);


// Example 2: Overloaded function with different return types
function parseValue(value: string): number;
function parseValue(value: number): string;
function parseValue(value: boolean): string;
function parseValue(value: string | number | boolean): string | number {
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  } else if (typeof value === 'number') {
    return value.toString();
  } else {
    return value ? 'true' : 'false';
  }
}

console.log('Example 2: parseValue with different return types');
const parsed1 = parseValue('42.5'); // Returns number
console.log(`parseValue('42.5'): ${parsed1} (type: ${typeof parsed1})`);

const parsed2 = parseValue(100); // Returns string
console.log(`parseValue(100): ${parsed2} (type: ${typeof parsed2})`);

const parsed3 = parseValue(true); // Returns string
console.log(`parseValue(true): ${parsed3} (type: ${typeof parsed3})\n`);


// Example 3: Overloaded function with optional parameters
function createUser(name: string): { name: string };
function createUser(name: string, email: string): { name: string; email: string };
function createUser(name: string, email: string, age: number): { name: string; email: string; age: number };
function createUser(name: string, email?: string, age?: number): any {
  const user: any = { name };
  
  if (email !== undefined) {
    user.email = email;
  }
  
  if (age !== undefined) {
    user.age = age;
  }
  
  return user;
}

console.log('Example 3: createUser with optional parameters');
const user1 = createUser('Alice');
console.log('User 1:', user1);

const user2 = createUser('Bob', 'bob@example.com');
console.log('User 2:', user2);

const user3 = createUser('Charlie', 'charlie@example.com', 30);
console.log('User 3:', user3);
console.log('');


// Example 4: Overloaded function with array vs single item
function processItems(item: string): string[];
function processItems(items: string[]): string[];
function processItems(input: string | string[]): string[] {
  const items = Array.isArray(input) ? input : [input];
  return items.map(item => item.toUpperCase());
}

console.log('Example 4: processItems with array or single item');
const result1 = processItems('hello'); // Corrected: Using result1
console.log(`Single item: ${result1}`); // Fixed: Now using the actual result1

const result2 = processItems(['hello', 'world', 'typescript']); // Corrected: Using result2
console.log(`Array: ${result2}\n`); // Fixed: Now using the actual result2


// ============================================================================
// PRACTICAL USE CASE: API Response Handler
// ============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║         Practical Use Case: API Response Handler          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// First define the User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Overloaded function for handling API responses
function handleResponse(data: User): string;
function handleResponse(data: User[]): string[];
function handleResponse(data: null): null;
function handleResponse(data: User | User[] | null): string | string[] | null {
  if (data === null) {
    return null;
  }
  
  if (Array.isArray(data)) {
    return data.map(user => `${user.name} (${user.email})`);
  }
  
  return `${data.name} (${data.email})`;
}

// Updated User interface with required role property
interface User {
  id: number;
  name: string;
  email: string;
  role: string; // required
  age?: number; // optional
}

// Single user
const singleUser: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin'
};

// Multiple users
const multipleUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' }
];

console.log('Single user response:');
const singleResponse = handleResponse(singleUser); // Need to handle as string
console.log(singleResponse);

console.log('\nMultiple users response:');
const multiResponse = handleResponse(multipleUsers); // Need to handle as string[]
console.log(multiResponse);

console.log('\nNull response:');
const nullResponse = handleResponse(null); // Need to handle as null
console.log(nullResponse);


// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║                        SUMMARY                             ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('✅ Function Overloads Benefits:');
console.log('   • Type-safe function calls with different signatures');
console.log('   • Better IntelliSense and autocomplete');
console.log('   • Clear API for function consumers');
console.log('   • Different return types based on input');
console.log('   • Compile-time type checking');
console.log('');
console.log('📝 Key Points:');
console.log('   • Overload signatures define the public API');
console.log('   • Implementation signature handles all cases');
console.log('   • Implementation signature is not visible to callers');
console.log('   • Order matters: most specific overloads first');
console.log('   • TypeScript picks the first matching overload');
console.log('');