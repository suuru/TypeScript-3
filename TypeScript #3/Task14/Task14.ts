// ============================================================================
// DECORATORS — ONE-PAGE EXPLANATION (SIMPLE + PRACTICAL + CLEAN)
// ============================================================================

// Decorators = special functions applied to:
// - Classes
// - Methods
// - Properties
// - Parameters
//
// Purpose: add behavior, metadata, logging, DI, ORM config, etc.
// NOTE: Requires `"experimentalDecorators": true` in tsconfig.json.


// ============================================================================
// 1. CLASS DECORATOR
// ============================================================================
function ClassLogger(constructor: Function) {
  console.log("Class decorated:", constructor.name);
}

@ClassLogger
class UserService {
  constructor(public name: string) {}
}


// ============================================================================
// 2. METHOD DECORATOR
// ============================================================================
function LogMethod(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method called: ${methodName}`, "Args:", args);
    return original.apply(this, args);
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number) {
    return a + b;
  }
}


// ============================================================================
// 3. PROPERTY DECORATOR
// ============================================================================
function PropertyInfo(target: any, propertyKey: string) {
  console.log("Property decorated:", propertyKey);
}

class Product {
  @PropertyInfo
  title: string = "Laptop";
}


// ============================================================================
// 4. PARAMETER DECORATOR
// ============================================================================
function LogParam(target: any, method: string, index: number) {
  console.log(`Parameter decorator → Method: ${method}, Index: ${index}`);
}

class Order {
  checkout(@LogParam amount: number) {
    console.log("Checking out:", amount);
  }
}


// ============================================================================
// 5. PRACTICAL DECORATOR USE CASES
// ============================================================================

// Example: Method wrapper for logging (used in many libraries)
function LogExecution(
  target: any,
  method: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`[LOG] Executing ${method}`);
    return original.apply(this, args);
  };
  return descriptor;
}

class MessageService {
  @LogExecution
  send(message: string) {
    console.log("Sending:", message);
  }
}


// ============================================================================
// 6. WHY DECORATORS ARE USED
// ============================================================================
//
// - Logging
// - Dependency Injection frameworks (NestJS, Angular)
// - ORM metadata (TypeORM: @Entity, @Column)
// - Validation libraries
// - Cleaner, reusable metadata
//
// Example conceptual ORM-like decorators:
function Entity(constructor: Function) {
  console.log("[ORM] Entity registered:", constructor.name);
}

function Column(target: any, property: string) {
  console.log("[ORM] Column registered:", property);
}

@Entity
class UserEntity {
  @Column id!: number;
  @Column name!: string;
}


// ============================================================================
// 7. DECORATORS ARE EXPERIMENTAL
// ============================================================================
// Decorators depend on TS configuration. Native JS support is still evolving.
// TypeScript allows decorators but marks them as experimental.


// ============================================================================
// DEMO EXECUTION
// ============================================================================
console.log("\n=== DEMO ===");

const calc = new Calculator();
console.log("Result:", calc.add(2, 3));

const svc = new MessageService();
svc.send("Hello!");

const order = new Order();
order.checkout(500);


// ============================================================================
// END — ONE-PAGE DECORATORS SUMMARY
// ============================================================================
