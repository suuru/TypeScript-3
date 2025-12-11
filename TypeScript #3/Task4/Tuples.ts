// Using labeled tuple for better readability
namespace TupleDemo {
  type NameParts = [firstName: string, lastName: string];

  // Function that splits full name into first and last name
  function splitName(fullName: string): NameParts {
  const parts = fullName.trim().split(' ');
  
  if (parts.length === 0 || fullName.trim() === '') {
    return ['', ''];
  }
  
  if (parts.length === 1) {
    return [parts[0], ''];
  }
  
  // First part is firstName, rest joined as lastName
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  
  return [firstName, lastName];
}

// Alternative implementation with inline labeled tuple
function splitNameAlt(fullName: string): [firstName: string, lastName: string] {
  const parts = fullName.trim().split(' ');
  
  if (parts.length === 0 || fullName.trim() === '') {
    return ['', ''];
  }
  
  if (parts.length === 1) {
    return [parts[0], ''];
  }
  
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  
  return [firstName, lastName];
}

// Examples
const [first1, last1] = splitName('John Doe');
console.log(`First: ${first1}, Last: ${last1}`); // First: John, Last: Doe

const [first2, last2] = splitName('Mary Jane Watson');
console.log(`First: ${first2}, Last: ${last2}`); // First: Mary, Last: Jane Watson

const [first3, last3] = splitName('Madonna');
console.log(`First: ${first3}, Last: ${last3}`); // First: Madonna, Last: 

const [first4, last4] = splitName('');
console.log(`First: ${first4}, Last: ${last4}`); // First: , Last: 

// Using with object
interface Person {
  fullName: string;
  nameParts: NameParts;
}

const person: Person = {
  fullName: 'Alice Johnson',
  nameParts: splitName('Alice Johnson')
};
console.log(`Person: ${person.nameParts[0]} ${person.nameParts[1]}`);
}
console.log(`Person: ${person.nameParts[0]} ${person.nameParts[1]}`);