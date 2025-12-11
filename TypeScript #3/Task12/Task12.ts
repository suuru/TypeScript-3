// ===============================
// CLASSES & ACCESS MODIFIERS
// ===============================
export {}
class User {
  public name: string;            // accessible anywhere
  private password: string;       // only inside this class
  protected role: string;         // inside class + subclasses
  readonly id: number;            // cannot be changed after creation

  constructor(id: number, name: string, password: string, role: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.role = role;
  }

  public introduce() {
    return `Hi, I'm ${this.name}`;
  }

  private revealPassword() {
    return this.password; // only internal
  }
}

// ===============================
// INHERITANCE (extends + super)
// ===============================
class Admin extends User {
  constructor(id: number, name: string, password: string) {
    super(id, name, password, "admin"); // call parent constructor
  }

  public getRole() {
    return this.role; // allowed because role is protected
  }
}

// ===============================
// INTERFACES & CLASSES (implements)
// ===============================
interface Loggable {
  log(): void;
}

class Logger implements Loggable {
  log() {
    console.log("Logging something...");
  }
}

// ===============================
// POLYMORPHISM
// ===============================
let user: User = new Admin(1, "Suuru", "secret123");
console.log(user.introduce()); // works
// user.getRole(); ❌ Not allowed (type is User, not Admin)

// ===============================
// ABSTRACT CLASSES
// ===============================
abstract class Shape {
  abstract area(): number; // must be implemented by subclasses

  describe() {
    return "This is a shape.";
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

const c = new Circle(5);
console.log(c.area());
console.log(c.describe());
