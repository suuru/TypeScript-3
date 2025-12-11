// ============================================================================
// APPROACH 1: USING NAMESPACES (OLD WAY)
// ============================================================================

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║              APPROACH 1: Using Namespaces                 ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Namespace for mathematical operations
namespace MathUtils {
  // Private helper (not exported)
  function isValidNumber(n: number): boolean {
    return !isNaN(n) && isFinite(n);
  }

  // Public function
  export function add(a: number, b: number): number {
    if (!isValidNumber(a) || !isValidNumber(b)) {
      throw new Error('Invalid numbers');
    }
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    if (!isValidNumber(a) || !isValidNumber(b)) {
      throw new Error('Invalid numbers');
    }
    return a - b;
  }

  export function multiply(a: number, b: number): number {
    if (!isValidNumber(a) || !isValidNumber(b)) {
      throw new Error('Invalid numbers');
    }
    return a * b;
  }

  export function divide(a: number, b: number): number {
    if (!isValidNumber(a) || !isValidNumber(b)) {
      throw new Error('Invalid numbers');
    }
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }

  // Nested namespace
  export namespace Advanced {
    export function power(base: number, exponent: number): number {
      return Math.pow(base, exponent);
    }

    export function sqrt(n: number): number {
      if (n < 0) {
        throw new Error('Cannot calculate square root of negative number');
      }
      return Math.sqrt(n);
    }
  }
}

// Namespace for string utilities
namespace StringUtils {
  export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  export function reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  export function wordCount(str: string): number {
    return str.trim().split(/\s+/).length;
  }

  export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + '...';
  }
}

// Using namespaces
console.log('Using MathUtils namespace:');
console.log('10 + 5 =', MathUtils.add(10, 5));
console.log('10 - 5 =', MathUtils.subtract(10, 5));
console.log('10 * 5 =', MathUtils.multiply(10, 5));
console.log('10 / 5 =', MathUtils.divide(10, 5));
console.log('2^8 =', MathUtils.Advanced.power(2, 8));
console.log('√16 =', MathUtils.Advanced.sqrt(16));

console.log('\nUsing StringUtils namespace:');
console.log('Capitalize "hello" =', StringUtils.capitalize('hello'));
console.log('Reverse "hello" =', StringUtils.reverse('hello'));
console.log('Word count "Hello World TypeScript" =', StringUtils.wordCount('Hello World TypeScript'));
console.log('Truncate "Hello World" to 8 chars =', StringUtils.truncate('Hello World', 8));


// ============================================================================
// APPROACH 2: USING ES MODULES (MODERN WAY)
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║            APPROACH 2: Using ES Modules                   ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// ============================
// FILE: mathUtils.ts (simulated)
// ============================

// Private helper (not exported)
function isValidNumber(n: number): boolean {
  return !isNaN(n) && isFinite(n);
}

// Exported functions
export function add(a: number, b: number): number {
  if (!isValidNumber(a) || !isValidNumber(b)) {
    throw new Error('Invalid numbers');
  }
  return a + b;
}

export function subtract(a: number, b: number): number {
  if (!isValidNumber(a) || !isValidNumber(b)) {
    throw new Error('Invalid numbers');
  }
  return a - b;
}

export function multiply(a: number, b: number): number {
  if (!isValidNumber(a) || !isValidNumber(b)) {
    throw new Error('Invalid numbers');
  }
  return a * b;
}

export function divide(a: number, b: number): number {
  if (!isValidNumber(a) || !isValidNumber(b)) {
    throw new Error('Invalid numbers');
  }
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// ============================
// FILE: mathAdvanced.ts (simulated)
// ============================

export function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

export function sqrt(n: number): number {
  if (n < 0) {
    throw new Error('Cannot calculate square root of negative number');
  }
  return Math.sqrt(n);
}

// ============================
// FILE: stringUtils.ts (simulated)
// ============================

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

export function wordCount(str: string): number {
  return str.trim().split(/\s+/).length;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

// ============================
// FILE: main.ts (simulated)
// ============================

// Import specific functions (named imports)
// import { add, subtract, multiply, divide } from './mathUtils';
// import { power, sqrt } from './mathAdvanced';
// import { capitalize, reverse, wordCount, truncate } from './stringUtils';

// OR import everything with alias
// import * as MathUtils from './mathUtils';
// import * as MathAdvanced from './mathAdvanced';
// import * as StringUtils from './stringUtils';

console.log('Using ES Module imports:');
console.log('10 + 5 =', add(10, 5));
console.log('10 - 5 =', subtract(10, 5));
console.log('10 * 5 =', multiply(10, 5));
console.log('10 / 5 =', divide(10, 5));
console.log('2^8 =', power(2, 8));
console.log('√16 =', sqrt(16));

console.log('\nUsing string utilities:');
console.log('Capitalize "hello" =', capitalize('hello'));
console.log('Reverse "hello" =', reverse('hello'));
console.log('Word count "Hello World TypeScript" =', wordCount('Hello World TypeScript'));
console.log('Truncate "Hello World" to 8 chars =', truncate('Hello World', 8));


// ============================================================================
// COMPARISON: DIFFERENT IMPORT STYLES WITH ES MODULES
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║         ES Module Import Styles Comparison                ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('1. Named Imports (import specific functions):');
console.log('   import { add, subtract } from "./mathUtils";');
console.log('   Usage: add(5, 3)');
console.log('');

console.log('2. Namespace Import (import all with alias):');
console.log('   import * as MathUtils from "./mathUtils";');
console.log('   Usage: MathUtils.add(5, 3)');
console.log('');

console.log('3. Default Export (single main export):');
console.log('   // In mathUtils.ts:');
console.log('   export default function calculate() { ... }');
console.log('   // In main.ts:');
console.log('   import calculate from "./mathUtils";');
console.log('');

console.log('4. Mixed Imports:');
console.log('   import calculate, { add, subtract } from "./mathUtils";');
console.log('');

console.log('5. Renamed Imports:');
console.log('   import { add as sum, subtract as diff } from "./mathUtils";');
console.log('   Usage: sum(5, 3)');


// ============================================================================
// PRACTICAL EXAMPLE: USER MANAGEMENT
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║      Practical Example: User Management System            ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('--- NAMESPACE APPROACH ---\n');

namespace UserManagement {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  const users: User[] = [];
  let nextId = 1;

  export function createUser(name: string, email: string): User {
    const user: User = { id: nextId++, name, email };
    users.push(user);
    return user;
  }

  export function getUser(id: number): User | undefined {
    return users.find(u => u.id === id);
  }

  export function getAllUsers(): User[] {
    return [...users];
  }

  export function deleteUser(id: number): boolean {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  }
}

const user1 = UserManagement.createUser('Alice', 'alice@example.com');
const user2 = UserManagement.createUser('Bob', 'bob@example.com');
console.log('Created users:', UserManagement.getAllUsers());
console.log('Get user 1:', UserManagement.getUser(1));
UserManagement.deleteUser(2);
console.log('After deleting user 2:', UserManagement.getAllUsers());


console.log('\n--- ES MODULE APPROACH ---\n');

// ============================
// FILE: userService.ts (simulated)
// ============================

interface ModuleUser {
  id: number;
  name: string;
  email: string;
}

const moduleUsers: ModuleUser[] = [];
let moduleNextId = 1;

export function createModuleUser(name: string, email: string): ModuleUser {
  const user: ModuleUser = { id: moduleNextId++, name, email };
  moduleUsers.push(user);
  return user;
}

export function getModuleUser(id: number): ModuleUser | undefined {
  return moduleUsers.find(u => u.id === id);
}

export function getAllModuleUsers(): ModuleUser[] {
  return [...moduleUsers];
}

export function deleteModuleUser(id: number): boolean {
  const index = moduleUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    moduleUsers.splice(index, 1);
    return true;
  }
  return false;
}

// Usage (simulated import)
// import { createModuleUser, getModuleUser, getAllModuleUsers, deleteModuleUser } from './userService';

const moduleUser1 = createModuleUser('Charlie', 'charlie@example.com');
const moduleUser2 = createModuleUser('Diana', 'diana@example.com');
console.log('Created users:', getAllModuleUsers());
console.log('Get user 1:', getModuleUser(1));
deleteModuleUser(2);
console.log('After deleting user 2:', getAllModuleUsers());


// ============================================================================
// KEY DIFFERENCES SUMMARY
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║              KEY DIFFERENCES SUMMARY                      ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('NAMESPACES:');
console.log('✓ All code in single file');
console.log('✓ Access with dot notation (MathUtils.add)');
console.log('✓ Can have nested namespaces');
console.log('✓ Older TypeScript feature');
console.log('✓ No build tool required for simple cases');
console.log('✗ Not standard JavaScript');
console.log('✗ Global scope pollution risk');
console.log('✗ No tree-shaking optimization');
console.log('');

console.log('ES MODULES:');
console.log('✓ Separate files for organization');
console.log('✓ Standard JavaScript (ES6+)');
console.log('✓ Better tree-shaking (removes unused code)');
console.log('✓ Explicit dependencies with imports');
console.log('✓ Better IDE support and tooling');
console.log('✓ Works with modern bundlers (Webpack, Vite, etc.)');
console.log('✓ Can selectively import only what you need');
console.log('✗ Requires module system understanding');
console.log('');

console.log('RECOMMENDATION:');
console.log('💡 Use ES Modules for modern TypeScript projects');
console.log('💡 Namespaces are mainly for legacy code or type definitions');
console.log('💡 ES Modules provide better maintainability and performance');
console.log('');