/**
 * ----------------------------------------------------------
 * WHY TYPESCRIPT EXISTS (in practice)
 * ----------------------------------------------------------
 * A real system fetches data from an API, validates it,
 * transforms it, and returns it to the application.
 *
 * TypeScript ensures:
 *  - The API returns what we expect
 *  - We don’t forget null/undefined cases
 *  - We avoid hidden runtime errors
 *  - IDE autocompletes the data shape
 */



// ----------------------------------------------------------
// BASIC TYPES: string, number, boolean, bigint, symbol
// ----------------------------------------------------------

type UserID = string;
const SYSTEM_TAG: symbol = Symbol("system-id");


// ----------------------------------------------------------
// Realistic user data type
// ----------------------------------------------------------

interface UserProfile {
  id: UserID;
  name: string;
  age: number;
  email: string | null;   // strictNullChecks → must handle null
  isActive: boolean;
}



// ----------------------------------------------------------
// MOCK ASYNC API
// void, null, undefined, unknown, never included
// ----------------------------------------------------------

// Simulates fetching JSON from API
async function fetchUserFromAPI(id: UserID): Promise<unknown> {
  // unknown → must validate before using
  return {
    id,
    name: "Suuru",
    age: 30,
    email: null,          // strictNullChecks example
    isActive: true,
  };
}



// ----------------------------------------------------------
// SAFE VALIDATION (unknown → typed UserProfile)
// ----------------------------------------------------------

function validateUser(data: unknown): UserProfile {
  // Type checking to avoid unsafe assumptions
  if (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data &&
    "age" in data &&
    "email" in data &&
    "isActive" in data
  ) {
    return data as UserProfile;
  }

  return fail("User data is invalid"); // never
}



// ----------------------------------------------------------
// SAFE SERVICE FUNCTION
// ----------------------------------------------------------

async function getUserProfile(id: UserID): Promise<UserProfile> {
  const data = await fetchUserFromAPI(id);
  return validateUser(data);
}



// ----------------------------------------------------------
// BUSINESS LOGIC (using strong typing)
// ----------------------------------------------------------

function getWelcomeMessage(user: UserProfile): string {
  // strictNullChecks → email might be null
  const emailInfo = user.email ?? "No email provided";
  return `Welcome ${user.name}! (${emailInfo})`;
}



// ----------------------------------------------------------
// UTILITY FUNCTIONS (demonstrate void, never)
// ----------------------------------------------------------

function logActivity(message: string): void {
  console.log("ACTIVITY:", message);
}



// ----------------------------------------------------------
// RUN EXAMPLE
// noImplicitAny, noImplicitThis, strictBindCallApply all apply
// ----------------------------------------------------------

async function main() {
  const user = await getUserProfile("USER_123");

  logActivity("Fetched user " + user.id);

  const msg = getWelcomeMessage(user);
  console.log(msg);
}

main().catch(console.error);
function fail(arg0: string): UserProfile {
    throw new Error("Function not implemented.");
}

