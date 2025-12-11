// ============================================================================
// CONDITIONAL TYPES IMPLEMENTATION
// ============================================================================

// 1. IsString<T> - Returns true if T is string, otherwise false
type IsString<T> = T extends string ? true : false;

// 2. ArrayElement<T> - Extracts element type from array, or never if not an array
type ArrayElement<T> = T extends (infer E)[] ? E : never;


// ============================================================================
// TESTING IsString<T>
// ============================================================================

// Test with string
type Test1 = IsString<string>;
// Result: true

// Test with number
type Test2 = IsString<number>;
// Result: false

// Test with boolean
type Test3 = IsString<boolean>;
// Result: false

// Test with string literal
type Test4 = IsString<'hello'>;
// Result: true (string literals extend string)

// Test with object
type Test5 = IsString<{ name: string }>;
// Result: false

// Test with any
type Test6 = IsString<any>;
// Result: boolean (any extends everything)

// Test with never
type Test7 = IsString<never>;
// Result: never (special case)


// Helper function to demonstrate IsString at runtime
function checkIsString<T>(value: T): IsString<T> {
  return (typeof value === 'string') as IsString<T>;
}

console.log('IsString<string>:', checkIsString('hello')); // true
console.log('IsString<number>:', checkIsString(42)); // false
console.log('IsString<boolean>:', checkIsString(true)); // false


// ============================================================================
// TESTING ArrayElement<T>
// ============================================================================

// Test with string array
type StringElement = ArrayElement<string[]>;
// Result: string

// Test with number array
type NumberElement = ArrayElement<number[]>;
// Result: number

// Test with non-array (string)
type NotArrayElement = ArrayElement<string>;
// Result: never

// Test with object array
interface ExtendUser {
  id: number;
  name: string;
}

type UserElement = ArrayElement<User[]>;
// Result: User

// Test with nested arrays
type NestedElement = ArrayElement<string[][]>;
// Result: string[]

// Test with tuple
type TupleElement = ArrayElement<[string, number]>;
// Result: string | number

// Test with readonly array
type ReadonlyElement = ArrayElement<readonly string[]>;
// Result: string

// Test with mixed array
type MixedElement = ArrayElement<(string | number)[]>;
// Result: string | number


// ============================================================================
// PRACTICAL EXAMPLES WITH ArrayElement
// ============================================================================

// Example 1: Generic function that works with arrays
function getFirstElement<T extends any[]>(arr: T): ArrayElement<T> | undefined {
  return arr[0];
}

const stringArray = ['hello', 'world'];
const firstString = getFirstElement(stringArray);
// Type: string | undefined
console.log('First string:', firstString);

const numberArray = [1, 2, 3, 4, 5];
const firstNumber = getFirstElement(numberArray);
// Type: number | undefined
console.log('First number:', firstNumber);

interface PublicUser {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  password: string;
}

type SimpleUser = Pick<User, 'id' | 'name'>;

const userArray: SimpleUser[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const firstUser = getFirstElement(userArray);
console.log('First user:', firstUser);



// Example 2: Type-safe array mapping
function mapArray<T extends any[], U>(
  arr: T,
  mapFn: (item: ArrayElement<T>) => U
): U[] {
  return arr.map(mapFn);
}

const strings = ['a', 'b', 'c'];
const lengths = mapArray(strings, (str) => str.length);
// str is typed as string
console.log('Lengths:', lengths);

const numbers = [1, 2, 3];
const doubled = mapArray(numbers, (num) => num * 2);
// num is typed as number
console.log('Doubled:', doubled);


// Example 3: Conditional type based on IsString
type ProcessResult<T> = IsString<T> extends true 
  ? { text: T; length: number }
  : { value: T; type: string };

function process<T>(input: T): ProcessResult<T> {
  if (typeof input === 'string') {
    return { text: input, length: input.length } as ProcessResult<T>;
  }
  return { value: input, type: typeof input } as ProcessResult<T>;
}

const stringResult = process('hello');
// Type: { text: string; length: number }
console.log('String result:', stringResult);

const numberResult = process(42);
// Type: { value: number; type: string }
console.log('Number result:', numberResult);


// ============================================================================
// ADVANCED CONDITIONAL TYPES
// ============================================================================

// IsArray<T> - Check if T is an array
type IsArray<T> = T extends any[] ? true : false;

type IsArrayTest1 = IsArray<string[]>; // true
type IsArrayTest2 = IsArray<string>; // false
type IsArrayTest3 = IsArray<number[]>; // true


// ArrayOrValue<T> - Return element type if array, otherwise return T
type ArrayOrValue<T> = T extends (infer E)[] ? E : T;

type ArrayOrValueTest1 = ArrayOrValue<string[]>; // string
type ArrayOrValueTest2 = ArrayOrValue<string>; // string
type ArrayOrValueTest3 = ArrayOrValue<number[]>; // number


// Flatten<T> - Flatten one level of array nesting
type Flatten<T> = T extends (infer E)[] ? E : T;

type FlattenTest1 = Flatten<string[][]>; // string[]
type FlattenTest2 = Flatten<number[]>; // number
type FlattenTest3 = Flatten<string>; // string


// DeepArrayElement<T> - Recursively extract deepest element type
type DeepArrayElement<T> = T extends (infer E)[]
  ? DeepArrayElement<E>
  : T;

type DeepTest1 = DeepArrayElement<string[][][]>; // string
type DeepTest2 = DeepArrayElement<number[][]>; // number
type DeepTest3 = DeepArrayElement<string>; // string


// ============================================================================
// COMPREHENSIVE EXAMPLES
// ============================================================================

// Example with ArrayElement<string[]>
type Example1 = ArrayElement<string[]>;
// Result: string
const ex1: Example1 = 'hello';
console.log('ArrayElement<string[]>:', ex1);

// Example with ArrayElement<number[]>
type Example2 = ArrayElement<number[]>;
// Result: number
const ex2: Example2 = 42;
console.log('ArrayElement<number[]>:', ex2);

// Example with ArrayElement<string>
type Example3 = ArrayElement<string>;
// Result: never
// const ex3: Example3 = 'hello'; // Error: Type 'string' is not assignable to type 'never'
console.log('ArrayElement<string>: never (cannot assign value)');


// Complex example combining both
type SmartProcess<T> = IsString<T> extends true
  ? T
  : T extends any[]
    ? ArrayElement<T>[]
    : T;

type SmartTest1 = SmartProcess<string>; // string
type SmartTest2 = SmartProcess<number[]>; // number[]
type SmartTest3 = SmartProcess<boolean>; // boolean


// ============================================================================
// UTILITY FUNCTIONS USING CONDITIONAL TYPES
// ============================================================================

// Function that only accepts arrays and returns element type
function processArray<T extends any[]>(
  arr: T
): ArrayElement<T>[] {
  return arr;
}

const strArr = processArray(['a', 'b', 'c']);
// Type: string[]
console.log('Processed string array:', strArr);

const numArr = processArray([1, 2, 3]);
// Type: number[]
console.log('Processed number array:', numArr);

// processArray('not an array'); // Error: Argument of type 'string' is not assignable


// Function that behaves differently based on IsString
function smartConvert<T>(value: T): IsString<T> extends true ? number : string {
  if (typeof value === 'string') {
    return value.length as any;
  }
  return String(value) as any;
}

const converted1 = smartConvert('hello');
// Type: number
console.log('String converted to length:', converted1);

const converted2 = smartConvert(123);
// Type: string
console.log('Number converted to string:', converted2);


// ============================================================================
// SUMMARY
// ============================================================================

console.log('=== Summary ===');
console.log('✓ IsString<T>: Returns true if T is string, false otherwise');
console.log('✓ ArrayElement<T>: Extracts element type from array, never if not array');
console.log('✓ ArrayElement<string[]>: string');
console.log('✓ ArrayElement<number[]>: number');
console.log('✓ ArrayElement<string>: never');
console.log('✓ Advanced conditional types: IsArray, ArrayOrValue, Flatten, DeepArrayElement');
console.log('✓ Practical examples with type-safe functions');