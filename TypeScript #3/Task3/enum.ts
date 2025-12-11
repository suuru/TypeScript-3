// Enum representation of roles
enum RoleEnum {
  Admin = 'admin',
  Manager = 'manager',
  Worker = 'worker'
}

// Literal union type representation of roles
type Role = 'admin' | 'manager' | 'worker';

// Function that works with both Role and RoleEnum
function canManageUsers(role: Role | RoleEnum): boolean {
  const roleStr = String(role);
  return roleStr === 'admin' || roleStr === 'manager';
}

// Corrected UserData type
// FIX: role must match Role union, not a different union ('admin' | 'user')
type UserData = {
  id: number;
  name: string;
  role: Role;  // FIXED
};

// Employee interface
interface Employee {
  id: string;
  name: string;
  role: RoleEnum;
}

export {};

const user: UserData = {
  id: 1,
  name: "John Doe",
  role: "admin"  // VALID
};

const employee: Employee = {
  id: '2',
  name: 'Jane Smith',
  role: RoleEnum.Manager  // VALID
};

console.log(`${user.name} can manage users: ${canManageUsers(user.role)}`);
console.log(`${employee.name} can manage users: ${canManageUsers(employee.role)}`);
