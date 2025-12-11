"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Enum representation of roles
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Admin"] = "admin";
    RoleEnum["Manager"] = "manager";
    RoleEnum["Worker"] = "worker";
})(RoleEnum || (RoleEnum = {}));
// Function that works with both Role and RoleEnum
function canManageUsers(role) {
    var roleStr = String(role);
    return roleStr === 'admin' || roleStr === 'manager';
}
var user = {
    id: 1,
    name: "John Doe",
    role: "admin" // VALID
};
var employee = {
    id: '2',
    name: 'Jane Smith',
    role: RoleEnum.Manager // VALID
};
console.log("".concat(user.name, " can manage users: ").concat(canManageUsers(user.role)));
console.log("".concat(employee.name, " can manage users: ").concat(canManageUsers(employee.role)));
