// Success response type with generic data
type SuccessResponse<T> = {
  status: 'success';
  data: T;
};

// Error response type with message
type ErrorResponse = {
  status: 'error';
  message: string;
};

// Union type for API responses
export {};
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// User type
type User = {
  id: number;
  name: string;
  email: string;
};

// Admin type
type Admin = {
  role: 'admin';
  permissions: string[];
  accessLevel: number;
};

// AdminUser as intersection of User and Admin
type AdminUser = User & Admin;

// User interface with readonly id and optional name
interface UserInterface {
  readonly id: number;
  email: string;
  name?: string;
}

// UserDTO as type alias with similar fields
type UserDTO = {
  readonly id: number;
  email: string;
  name?: string;
};

// Utility type examples
type RequiredUser = Required<UserInterface>; // Makes all properties required (name is now required)
type ReadonlyUser = Readonly<UserInterface>; // Makes all properties readonly

// Example functions demonstrating usage
function handleUserResponse(response: ApiResponse<User>) {
  if (response.status === 'success') {
    // TypeScript knows response.data exists here
    console.log('User:', response.data.name);
  } else {
    // TypeScript knows response.message exists here
    console.log('Error:', response.message);
  }
}

// Example responses
const successExample: ApiResponse<User> = {
  status: 'success',
  data: { id: 1, name: 'John Doe', email: 'john@example.com' }
};

const errorExample: ApiResponse<User> = {
  status: 'error',
  message: 'User not found'
};

// Example AdminUser
const adminExample: AdminUser = {
  id: 1,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  permissions: ['read', 'write', 'delete'],
  accessLevel: 10
};

// UserInterface examples
const userExample: UserInterface = {
  id: 1,
  email: 'user@example.com'
  // name is optional
};

// userExample.id = 2; // Error: Cannot assign to 'id' because it is a read-only property

// RequiredUser example - name is now required
const requiredUserExample: RequiredUser = {
  id: 2,
  email: 'required@example.com',
  name: 'Required Name' // Must provide name
};

// ReadonlyUser example - all properties are readonly
const readonlyUserExample: ReadonlyUser = {
  id: 3,
  email: 'readonly@example.com',
  name: 'Readonly User'
};
// readonlyUserExample.email = 'new@example.com'; // Error: all properties are readonly