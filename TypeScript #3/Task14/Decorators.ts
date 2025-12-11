// ============================================================================
// DECORATOR IMPLEMENTATION (Conceptual)
// ============================================================================
// Note: To use decorators in actual TypeScript, you need to enable:
// "experimentalDecorators": true in tsconfig.json

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║         TypeScript Method Decorators Example              ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Method decorator function
// target: class prototype
// propertyKey: method name
// descriptor: property descriptor
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Save the original method
  const originalMethod = descriptor.value;

  // Replace the method with a wrapper
  descriptor.value = function (...args: any[]) {
    console.log(`🔍 Calling method: ${propertyKey}`);
    console.log(`📝 Arguments: ${JSON.stringify(args)}`);
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
    
    // Call the original method
    const result = originalMethod.apply(this, args);
    
    console.log(`✅ Result: ${JSON.stringify(result)}`);
    console.log('---');
    
    return result;
  };

  return descriptor;
}

// ============================================================================
// APPLYING DECORATOR TO A CLASS
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user' }
  ];

  // Apply @log decorator to this method
  // @log
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // Apply @log decorator to this method too
  // @log
  createUser(name: string, email: string, role: string): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
      role
    };
    this.users.push(newUser);
    return newUser;
  }

  // @log
  deleteUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}


// ============================================================================
// TESTING THE DECORATED METHODS
// ============================================================================

console.log('Testing UserService with @log decorator:\n');

class UserService {
  private users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ];

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  createUser(name: string, email: string, role: string) {
    const id = this.users.length + 1;
    const newUser = { id, name, email, role };
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}


const userService = new UserService(); 

console.log('Test 1: Get user by ID');
const user = userService.getUserById(1);

console.log('\nTest 2: Get non-existent user');
const noUser = userService.getUserById(999);

console.log('\nTest 3: Create new user');
const newUser = userService.createUser('Diana', 'diana@example.com', 'moderator');

console.log('\nTest 4: Delete user');
const deleted = userService.deleteUser(2);


// ============================================================================
// MORE DECORATOR EXAMPLES
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║           More Decorator Examples                         ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// 1. Performance timing decorator
function measureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    
    console.log(`⏱️  Method ${propertyKey} took ${(end - start).toFixed(2)}ms`);
    
    return result;
  };

  return descriptor;
}


// 2. Validation decorator
function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // Check if all arguments are truthy
    if (args.some(arg => !arg && arg !== 0 && arg !== false)) {
      throw new Error(`Invalid arguments for ${propertyKey}: ${JSON.stringify(args)}`);
    }
    
    return originalMethod.apply(this, args);
  };

  return descriptor;
}


// 3. Cache decorator
function cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cacheMap = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const cacheKey = JSON.stringify(args);
    
    if (cacheMap.has(cacheKey)) {
      console.log(`💾 Cache hit for ${propertyKey}(${cacheKey})`);
      return cacheMap.get(cacheKey);
    }
    
    console.log(`🔍 Cache miss for ${propertyKey}(${cacheKey})`);
    const result = originalMethod.apply(this, args);
    cacheMap.set(cacheKey, result);
    
    return result;
  };

  return descriptor;
}


// 4. Retry decorator
function retry(times: number = 3) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      let lastError: any;
      
      for (let i = 0; i < times; i++) {
        try {
          return originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          console.log(`⚠️  Attempt ${i + 1}/${times} failed for ${propertyKey}`);
        }
      }
      
      throw lastError;
    };

    return descriptor;
  };
}


// ============================================================================
// APPLYING MULTIPLE DECORATORS
// ============================================================================

console.log('Example: Calculator with multiple decorators\n');

class calculator {
  // In real TypeScript with decorators enabled, you'd write:
  // @log
  // @measureTime
  add(a: number, b: number): number {
    return a + b;
  }

  // @cache
  // @measureTime
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  // @validate
  // @log
  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
  }
}

// Manually applying decorators to Calculator
const calcPrototype = calculator.prototype;

// Apply to add method
const addDescriptor = Object.getOwnPropertyDescriptor(calcPrototype, 'add')!;
measureTime(calcPrototype, 'add', addDescriptor);
log(calcPrototype, 'add', addDescriptor);
Object.defineProperty(calcPrototype, 'add', addDescriptor);

// Apply to fibonacci method
const fibDescriptor = Object.getOwnPropertyDescriptor(calcPrototype, 'fibonacci')!;
measureTime(calcPrototype, 'fibonacci', fibDescriptor);
cache(calcPrototype, 'fibonacci', fibDescriptor);
Object.defineProperty(calcPrototype, 'fibonacci', fibDescriptor);

// Apply to divide method
const divideDescriptor = Object.getOwnPropertyDescriptor(calcPrototype, 'divide')!;
log(calcPrototype, 'divide', divideDescriptor);
validate(calcPrototype, 'divide', divideDescriptor);
Object.defineProperty(calcPrototype, 'divide', divideDescriptor);

const calcu = new calculator();

console.log('--- Testing Calculator ---\n');
calcu.add(5, 3);

console.log('\n--- Testing Fibonacci with cache ---');
calcu.fibonacci(5);
console.log('\nCalling fibonacci(5) again:');
calcu.fibonacci(5); // Should hit cache

console.log('\n--- Testing divide with validation ---');
try {
  calcu.divide(10, 2);
} catch (error) {
  console.log('Error:', error);
}


// ============================================================================
// CLASS DECORATOR EXAMPLE
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║              Class Decorator Example                      ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Class decorator that adds timestamp to instances
function timestamp<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
    
    getCreationTime() {
      return this.createdAt.toISOString();
    }
  };
}

// In real TypeScript: @timestamp
class Product {
  constructor(public name: string, public price: number) {}
  
  getInfo(): string {
    return `${this.name}: $${this.price}`;
  }
}

// Manually applying class decorator
const TimestampedProduct = timestamp(Product);

const product = new TimestampedProduct('Laptop', 999);
console.log('Product:', product.getInfo());
console.log('Created at:', (product as any).getCreationTime());


// ============================================================================
// PROPERTY DECORATOR EXAMPLE
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║            Property Decorator Example                     ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Property decorator that makes property readonly
function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
    configurable: false
  });
}

// Property decorator for logging property access
function logProperty(target: any, propertyKey: string) {
  let value: any;

  const getter = function () {
    console.log(`📖 Getting ${propertyKey}: ${value}`);
    return value;
  };

  const setter = function (newVal: any) {
    console.log(`📝 Setting ${propertyKey} to: ${newVal}`);
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}


// ============================================================================
// PRACTICAL EXAMPLE: API SERVICE WITH DECORATORS
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║      Practical Example: API Service with Decorators       ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

class APIService {
  private baseURL = 'https://api.example.com';

  // @log
  // @retry(3)
  // @measureTime
  async fetchUser(id: number): Promise<User | null> {
    // Simulating API call
    console.log(`🌐 Fetching user ${id} from ${this.baseURL}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simulate response
    return {
      id,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    };
  }

  // @cache
  // @log
  async getCountries(): Promise<string[]> {
    console.log('🌍 Fetching countries list');
    await new Promise(resolve => setTimeout(resolve, 50));
    return ['USA', 'UK', 'Canada', 'Australia'];
  }
}

const apiService = new APIService();

console.log('Fetching user from API...');
apiService.fetchUser(1).then(user => {
  console.log('Received user:', user);
});


// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║                        SUMMARY                             ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('📚 TypeScript Decorators:');
console.log('');
console.log('✓ Method Decorators:');
console.log('  - Add behavior to methods (logging, timing, caching)');
console.log('  - Syntax: @decoratorName');
console.log('  - Applied at method declaration');
console.log('');
console.log('✓ Class Decorators:');
console.log('  - Modify or replace class constructor');
console.log('  - Add properties/methods to class');
console.log('');
console.log('✓ Property Decorators:');
console.log('  - Control property access');
console.log('  - Add validation or logging');
console.log('');
console.log('✓ Common Use Cases:');
console.log('  - Logging and debugging');
console.log('  - Performance monitoring');
console.log('  - Validation');
console.log('  - Caching');
console.log('  - Error handling and retry logic');
console.log('  - Authentication/Authorization');
console.log('');
console.log('📝 To Enable in TypeScript:');
console.log('  Add to tsconfig.json:');
console.log('  {');
console.log('    "compilerOptions": {');
console.log('      "experimentalDecorators": true,');
console.log('      "emitDecoratorMetadata": true');
console.log('    }');
console.log('  }');
console.log('');