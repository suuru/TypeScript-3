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