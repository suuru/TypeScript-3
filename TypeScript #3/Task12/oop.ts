// ============================================================================
// ABSTRACT BASE CLASS
// ============================================================================

abstract class Animal {
  // Properties
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Abstract method - must be implemented by subclasses
  abstract speak(): string;

  // Concrete method - shared by all animals
  getInfo(): string {
    return `${this.name} is ${this.age} years old`;
  }

  // Concrete method
  move(): string {
    return `${this.name} is moving`;
  }
}


// ============================================================================
// CONCRETE CLASSES EXTENDING ANIMAL
// ============================================================================

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  // Implement abstract method
  speak(): string {
    return `${this.name} says: Woof! Woof! 🐕`;
  }

  // Additional method specific to Dog
  fetch(): string {
    return `${this.name} is fetching the ball!`;
  }

  getBreed(): string {
    return this.breed;
  }
}


class Cat extends Animal {
  private indoor: boolean;

  constructor(name: string, age: number, indoor: boolean) {
    super(name, age);
    this.indoor = indoor;
  }

  // Implement abstract method
  speak(): string {
    return `${this.name} says: Meow! Meow! 🐱`;
  }

  // Additional method specific to Cat
  scratch(): string {
    return `${this.name} is scratching the furniture!`;
  }

  isIndoorCat(): boolean {
    return this.indoor;
  }
}


// ============================================================================
// POLYMORPHIC FUNCTION
// ============================================================================

function letTheAnimalSpeak(animal: Animal): void {
  console.log(animal.speak());
  console.log(animal.getInfo());
  console.log(animal.move());
  console.log('---');
}


// ============================================================================
// TESTING POLYMORPHISM
// ============================================================================

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║        Abstract Classes and Polymorphism Demo             ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Create instances
const dog1 = new Dog('Buddy', 3, 'Golden Retriever');
const dog2 = new Dog('Max', 5, 'German Shepherd');
const cat1 = new Cat('Whiskers', 2, true);
const cat2 = new Cat('Shadow', 4, false);

console.log('Creating animals:\n');
console.log('✅ Dog: Buddy (Golden Retriever)');
console.log('✅ Dog: Max (German Shepherd)');
console.log('✅ Cat: Whiskers (Indoor)');
console.log('✅ Cat: Shadow (Outdoor)\n');

// Polymorphism in action - same function works with different animal types
console.log('═══ Polymorphism: Let the animals speak! ═══\n');

letTheAnimalSpeak(dog1);
letTheAnimalSpeak(dog2);
letTheAnimalSpeak(cat1);
letTheAnimalSpeak(cat2);


// ============================================================================
// DEMONSTRATING POLYMORPHISM WITH ARRAYS
// ============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║           Polymorphism with Arrays                        ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Array of Animals - can hold any Animal subclass
const animals: Animal[] = [dog1, cat1, dog2, cat2];

console.log('All animals in the array:\n');
animals.forEach((animal, index) => {
  console.log(`Animal ${index + 1}:`);
  letTheAnimalSpeak(animal);
});


// ============================================================================
// MORE ANIMAL CLASSES
// ============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║           Adding More Animal Types                        ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

class Bird extends Animal {
  private canFly: boolean;

  constructor(name: string, age: number, canFly: boolean) {
    super(name, age);
    this.canFly = canFly;
  }

  speak(): string {
    return `${this.name} says: Tweet! Tweet! 🐦`;
  }

  fly(): string {
    if (this.canFly) {
      return `${this.name} is flying high!`;
    }
    return `${this.name} cannot fly`;
  }
}


class Cow extends Animal {
  private milkProduction: number; // liters per day

  constructor(name: string, age: number, milkProduction: number) {
    super(name, age);
    this.milkProduction = milkProduction;
  }

  speak(): string {
    return `${this.name} says: Moo! Moo! 🐄`;
  }

  getMilkProduction(): string {
    return `${this.name} produces ${this.milkProduction} liters of milk per day`;
  }
}


class Lion extends Animal {
  private pride: string;

  constructor(name: string, age: number, pride: string) {
    super(name, age);
    this.pride = pride;
  }

  speak(): string {
    return `${this.name} says: ROAR! ROAR! 🦁`;
  }

  hunt(): string {
    return `${this.name} from ${this.pride} pride is hunting!`;
  }
}


// Testing new animals
const bird = new Bird('Tweety', 1, true);
const cow = new Cow('Bessie', 6, 25);
const lion = new Lion('Simba', 8, 'Savannah');

console.log('New animals added:\n');
letTheAnimalSpeak(bird);
letTheAnimalSpeak(cow);
letTheAnimalSpeak(lion);


// ============================================================================
// ADVANCED POLYMORPHISM EXAMPLES
// ============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║         Advanced Polymorphism Examples                    ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Function that processes any animal
function introduceAnimal(animal: Animal): void {
  console.log(`Introducing: ${animal.getInfo()}`);
  console.log(animal.speak());
  
  // Type narrowing to access specific methods
  if (animal instanceof Dog) {
    console.log(`Breed: ${animal.getBreed()}`);
    console.log(animal.fetch());
  } else if (animal instanceof Cat) {
    console.log(`Indoor cat: ${animal.isIndoorCat()}`);
    console.log(animal.scratch());
  } else if (animal instanceof Bird) {
    console.log(animal.fly());
  } else if (animal instanceof Lion) {
    console.log(animal.hunt());
  }
  
  console.log('');
}

console.log('Introducing each animal with specific features:\n');
introduceAnimal(dog1);
introduceAnimal(cat1);
introduceAnimal(bird);
introduceAnimal(lion);


// ============================================================================
// PRACTICAL USE CASE: ANIMAL SHELTER
// ============================================================================

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║         Practical Use Case: Animal Shelter                ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

class AnimalShelter {
  private animals: Animal[] = [];

  addAnimal(animal: Animal): void {
    this.animals.push(animal);
    console.log(`✅ Added ${animal.getInfo()} to the shelter`);
  }

  listAllAnimals(): void {
    console.log(`\n📋 Shelter has ${this.animals.length} animals:`);
    this.animals.forEach((animal, index) => {
      console.log(`${index + 1}. ${animal.getInfo()}`);
    });
  }

  makeAllAnimalsSpeak(): void {
    console.log('\n🔊 Making all animals speak:');
    this.animals.forEach(animal => {
      console.log(animal.speak());
    });
  }

  findAnimalsByType<T extends Animal>(type: new (...args: any[]) => T): T[] {
    return this.animals.filter(animal => animal instanceof type) as T[];
  }
}

const shelter = new AnimalShelter();

shelter.addAnimal(new Dog('Rocky', 2, 'Bulldog'));
shelter.addAnimal(new Cat('Luna', 1, true));
shelter.addAnimal(new Dog('Charlie', 4, 'Beagle'));
shelter.addAnimal(new Cat('Oliver', 3, false));
shelter.addAnimal(new Bird('Polly', 2, true));

shelter.listAllAnimals();
shelter.makeAllAnimalsSpeak();

console.log('\n🔍 Finding specific animal types:');
const dogsInShelter = shelter.findAnimalsByType(Dog);
console.log(`\nDogs in shelter: ${dogsInShelter.length}`);
dogsInShelter.forEach(dog => {
  console.log(`- ${dog.getInfo()}, Breed: ${dog.getBreed()}`);
});

const catsInShelter = shelter.findAnimalsByType(Cat);
console.log(`\nCats in shelter: ${catsInShelter.length}`);
catsInShelter.forEach(cat => {
  console.log(`- ${cat.getInfo()}, Indoor: ${cat.isIndoorCat()}`);
});


// ============================================================================
// CANNOT INSTANTIATE ABSTRACT CLASS
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║         Abstract Class Restrictions                       ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// This would cause a compile error:
// const animal = new Animal('Generic', 5); // ❌ Error: Cannot create an instance of an abstract class

console.log('❌ Cannot instantiate abstract class directly');
console.log('✅ Must create instances of concrete subclasses (Dog, Cat, etc.)');


// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n\n╔════════════════════════════════════════════════════════════╗');
console.log('║                        SUMMARY                             ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('✅ Abstract Classes:');
console.log('   • Cannot be instantiated directly');
console.log('   • Define abstract methods that must be implemented');
console.log('   • Can have concrete methods shared by all subclasses');
console.log('   • Provide a common interface for related classes');
console.log('');
console.log('✅ Polymorphism:');
console.log('   • Same function works with different animal types');
console.log('   • Each animal implements speak() differently');
console.log('   • Type is determined at runtime');
console.log('   • Enables flexible and extensible code');
console.log('');
console.log('✅ Benefits:');
console.log('   • Code reusability through inheritance');
console.log('   • Type safety with TypeScript');
console.log('   • Easy to add new animal types');
console.log('   • Clean and maintainable architecture');
console.log('');