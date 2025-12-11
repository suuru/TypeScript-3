// Function that splits full name into first and last name
function splitName(fullName) {
    var parts = fullName.trim().split(' ');
    if (parts.length === 0 || fullName.trim() === '') {
        return ['', ''];
    }
    if (parts.length === 1) {
        return [parts[0], ''];
    }
    // First part is firstName, rest joined as lastName
    var firstName = parts[0];
    var lastName = parts.slice(1).join(' ');
    return [firstName, lastName];
}
// Alternative implementation with inline labeled tuple
function splitNameAlt(fullName) {
    var parts = fullName.trim().split(' ');
    if (parts.length === 0 || fullName.trim() === '') {
        return ['', ''];
    }
    if (parts.length === 1) {
        return [parts[0], ''];
    }
    var firstName = parts[0];
    var lastName = parts.slice(1).join(' ');
    return [firstName, lastName];
}
// Examples
var _a = splitName('John Doe'), first1 = _a[0], last1 = _a[1];
console.log("First: ".concat(first1, ", Last: ").concat(last1)); // First: John, Last: Doe
var _b = splitName('Mary Jane Watson'), first2 = _b[0], last2 = _b[1];
console.log("First: ".concat(first2, ", Last: ").concat(last2)); // First: Mary, Last: Jane Watson
var _c = splitName('Madonna'), first3 = _c[0], last3 = _c[1];
console.log("First: ".concat(first3, ", Last: ").concat(last3)); // First: Madonna, Last: 
var _d = splitName(''), first4 = _d[0], last4 = _d[1];
console.log("First: ".concat(first4, ", Last: ").concat(last4)); // First: , Last: 
var person = {
    fullName: 'Alice Johnson',
    nameParts: splitName('Alice Johnson')
};
console.log("Person: ".concat(person.nameParts[0], " ").concat(person.nameParts[1]));
