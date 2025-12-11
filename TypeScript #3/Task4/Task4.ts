// ================================
// Tuple Types in TypeScript
// ================================

// 1️⃣ Basic tuple: fixed-length array with known types at each position

// ...existing code...
let systemUser: [string, number]; // [name, age]

// Correct assignment (use the variable name, not a type name)
systemUser = ['Suuru', 30];

console.log(`Name: ${systemUser[0]}, Age: ${systemUser[1]}`);

// 2️⃣ Optional tuple elements
let coordinates: [number, number, number?]; // x, y, optional z
// ...existing code...

coordinates = [10, 20];     // valid
coordinates = [10, 20, 30]; // also valid

console.log(`Coordinates: ${coordinates.join(', ')}`);

// 3️⃣ Labeled tuple elements (conceptual, TS 4.0+)
let rgb: [red: number, green: number, blue: number] = [255, 128, 64];
console.log(`RGB Color: ${rgb[0]}, ${rgb[1]}, ${rgb[2]}`);

// 4️⃣ Tuples as key-value pairs
let entry: [string, number] = ['apples', 10];
console.log(`Item: ${entry[0]}, Quantity: ${entry[1]}`);

// 5️⃣ Function returning multiple values using tuple
function getUserInfo(): [string, number] {
  return ['Ada', 25];
}

const [userName, userAge] = getUserInfo();
console.log(`User: ${userName}, Age: ${userAge}`);

// ================================
// Summary of tuple features:
// - Fixed-length arrays with known types
// - Optional elements via ?
// - Conceptual labeled elements for readability
// - Useful for key-value pairs, function multiple returns
// ================================
