// ============================================================================
// CUSTOM UTILITY TYPES IMPLEMENTATION
// ============================================================================

// 1. MyPartial<T> - Makes all properties optional
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// 2. MyReadonly<T> - Makes all properties readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 3. Mutable<T> - Removes readonly from all properties
// Uses -readonly modifier to remove readonly
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};


// ============================================================================
// USER INTERFACE FOR TESTING
// ============================================================================

export{}
interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: string;
}


// ============================================================================
// TESTING CUSTOM UTILITY TYPES
// ============================================================================

// Test MyPartial<T>
type PartialUser = MyPartial<User>;
// Result: { id?: number; name?: string; email?: string; age?: number; role?: string; }

const partialUser: PartialUser = {
  name: 'Alice'
  // All other properties are optional
};
console.log('MyPartial works:', partialUser);


// Test MyReadonly<T>
type ReadonlyUser = MyReadonly<User>;
// Result: { readonly id: number; readonly name: string; readonly email: string; readonly age?: number; readonly role: string; }

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: 'Bob',
  email: 'bob@example.com',
  role: 'admin'
};
// readonlyUser.name = 'Charlie'; // Error: Cannot assign to 'name' because it is a read-only property
console.log('MyReadonly works:', readonlyUser);


// Test Mutable<T>
type MutableUser = Mutable<User>;
// Result: { id: number; name: string; email: string; age?: number; role: string; }
// Note: 'id' is no longer readonly!

const mutableUser: MutableUser = {
  id: 2,
  name: 'David',
  email: 'david@example.com',
  role: 'user'
};
mutableUser.id = 3; // This works now! id is no longer readonly
mutableUser.name = 'Dave';
console.log('Mutable works:', mutableUser);


// ============================================================================
// USING BUILT-IN UTILITY TYPES ON USER INTERFACE
// ============================================================================

// 1. Pick<User, K> - Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;
// Result: { readonly id: number; name: string; }

const userPreview: UserPreview = {
  id: 4,
  name: 'Eve'
};
console.log('Pick example:', userPreview);


// 2. Pick multiple properties
type UserCredentials = Pick<User, 'email' | 'role'>;
// Result: { email: string; role: string; }

const credentials: UserCredentials = {
  email: 'frank@example.com',
  role: 'moderator'
};
console.log('Pick (credentials):', credentials);


// 3. Omit<User, K> - Exclude specific properties
type UserWithoutId = Omit<User, 'id'>;
// Result: { name: string; email: string; age?: number; role: string; }

const userNoId: UserWithoutId = {
  name: 'Grace',
  email: 'grace@example.com',
  role: 'user'
};
console.log('Omit example:', userNoId);


// 4. Omit multiple properties
type PrivateUser = Omit<User, 'id' | 'email'>;
// Result: { name: string; age?: number; role: string; }

const User: PublicUser = {
  name: 'Henry',
  role: 'guest'
};
console.log('Omit (multiple):', PublicUser);


// 5. Required<User> - Make all properties required
type RequiredUser = Required<User>;
// Result: { readonly id: number; name: string; email: string; age: number; role: string; }
// Note: age is now required!

const requiredUser: RequiredUser = {
  id: 5,
  name: 'Ivy',
  email: 'ivy@example.com',
  age: 28, // Must provide age now
  role: 'admin'
};
console.log('Required example:', requiredUser);


// ============================================================================
// COMBINING UTILITY TYPES
// ============================================================================

// Combine MyPartial and Pick
type PartialUserPreview = MyPartial<Pick<User, 'name' | 'email'>>;
// Result: { name?: string; email?: string; }

const partialPreview: PartialUserPreview = {
  name: 'Jack'
};


// Combine Mutable and Pick
type MutableUserCredentials = Mutable<Pick<User, 'id' | 'email'>>;
// Result: { id: number; email: string; } (id is now mutable)

const mutableCreds: MutableUserCredentials = {
  id: 6,
  email: 'kate@example.com'
};
mutableCreds.id = 7; // Works because Mutable removed readonly


// Combine MyReadonly and Omit
type ReadonlyUserWithoutId = MyReadonly<Omit<User, 'id'>>;
// Result: { readonly name: string; readonly email: string; readonly age?: number; readonly role: string; }

const readonlyNoId: ReadonlyUserWithoutId = {
  name: 'Laura',
  email: 'laura@example.com',
  role: 'user'
};


// ============================================================================
// PRACTICAL USE CASES
// ============================================================================

// Use case 1: Update function with partial updates
function updateUser(user: User, updates: MyPartial<User>): User {
  return { ...user, ...updates };
}

const originalUser: User = {
  id: 8,
  name: 'Mike',
  email: 'mike@example.com',
  age: 30,
  role: 'user'
};

const updatedUser = updateUser(originalUser, { age: 31, role: 'admin' });
console.log('Updated user:', updatedUser);


// Use case 2: Create mutable copy of readonly object
function createMutableCopy<T>(obj: T): Mutable<T> {
  return { ...obj } as Mutable<T>;
}

const readonlyConfig: MyReadonly<User> = {
  id: 9,
  name: 'Nancy',
  email: 'nancy@example.com',
  role: 'admin'
};

const mutableConfig = createMutableCopy(readonlyConfig);
mutableConfig.id = 10; // Now we can modify it
console.log('Mutable copy:', mutableConfig);


// Use case 3: Form state management
interface FormState<T> {
  values: MyPartial<T>;
  errors: MyPartial<Record<keyof T, string>>;
  touched: MyPartial<Record<keyof T, boolean>>;
}

const userFormState: FormState<User> = {
  values: {
    name: 'Oscar',
    email: 'oscar@example.com'
  },
  errors: {
    email: 'Invalid email format'
  },
  touched: {
    email: true
  }
};

console.log('Form state:', userFormState);


// Use case 4: API response types
type UserCreatePayload = Omit<User, 'id'>; // User data without id
type UserUpdatePayload = MyPartial<Omit<User, 'id'>>; // Partial updates without id

function createUserAPI(payload: UserCreatePayload): User {
  return {
    id: Math.floor(Math.random() * 1000),
    ...payload
  };
}

function updateUserAPI(id: number, payload: UserUpdatePayload): User {
  // Simulated update
  return {
    id,
    name: payload.name || 'Default',
    email: payload.email || 'default@example.com',
    role: payload.role || 'user'
  };
}

const newUser = createUserAPI({
  name: 'Paul',
  email: 'paul@example.com',
  role: 'user'
});

const partialUpdate = updateUserAPI(newUser.id, { name: 'Paula' });
console.log('API examples:', { newUser, partialUpdate });


// ============================================================================
// SUMMARY
// ============================================================================

console.log('=== Summary ===');
console.log('✓ MyPartial<T>: Custom implementation making properties optional');
console.log('✓ MyReadonly<T>: Custom implementation making properties readonly');
console.log('✓ Mutable<T>: Removes readonly modifiers from properties');
console.log('✓ Pick<User, K>: Demonstrated selecting specific properties');
console.log('✓ Omit<User, K>: Demonstrated excluding specific properties');
console.log('✓ Required<User>: Demonstrated making all properties required');
console.log('✓ Combined utility types for complex transformations');
console.log('✓ Practical use cases implemented');
