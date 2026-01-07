package personal.oop_one;

// Superclass (Parent Class)
class Vehicle {
    String brand;
    int year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    public void startEngine() {
        System.out.println("Vehicle engine started.");
    }

    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Year: " + year);
    }
}

// Subclass (Child Class) - Car inherits from Vehicle
class Car extends Vehicle {
    int numberOfDoors;

    public Car(String brand, int year, int numberOfDoors) {
        super(brand, year); // Call to superclass constructor
        this.numberOfDoors = numberOfDoors;
    }

    // Car-specific method
    public void honk() {
        System.out.println("Car honks: Beep beep!");
    }

    // Overriding a method from the superclass
    @Override
    public void displayInfo() {
        super.displayInfo(); // Call superclass method
        System.out.println("Number of Doors: " + numberOfDoors);
    }
}

// Subclass (Child Class) - Motorcycle inherits from Vehicle
class Motorcycle extends Vehicle {
    boolean hasSidecar;

    public Motorcycle(String brand, int year, boolean hasSidecar) {
        super(brand, year);
        this.hasSidecar = hasSidecar;
    }

    // Motorcycle-specific method
    public void wheelie() {
        System.out.println("Motorcycle performing a wheelie!");
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Has Sidecar: " + hasSidecar);
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Car myCar = new Car("Toyota", 2022, 4);
        Motorcycle myMotorcycle = new Motorcycle("Harley-Davidson", 2023, false);

        System.out.println("--- Car Info ---");
        myCar.startEngine();
        myCar.displayInfo();
        myCar.honk();

        System.out.println("\n--- Motorcycle Info ---");
        myMotorcycle.startEngine();
        myMotorcycle.displayInfo();
        myMotorcycle.wheelie();
    }
}