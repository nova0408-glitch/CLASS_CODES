package personal.oop_one;

// Engine class (the "part") - tightly coupled with Car
class Engine {
    String type;
    int horsepower;

    public Engine(String type, int horsepower) {
        this.type = type;
        this.horsepower = horsepower;
        System.out.println("Engine created: " + type);
    }

    public void start() {
        System.out.println("Engine (" + type + ") starting...");
    }

    // Demonstrating lifecycle dependency: finalizer (not recommended for general use, but for demo)
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Engine (" + type + ") destroyed.");
    }
}

// Car class (the "whole")
class CarComposition {
    String model;
    // Composition: Car owns its Engine
    Engine carEngine; // Member variable of type Engine

    public CarComposition(String model, String engineType, int engineHorsepower) {
        this.model = model;
        // The Engine is created within the Car's constructor
        this.carEngine = new Engine(engineType, engineHorsepower);
        System.out.println("Car '" + model + "' created with its engine.");
    }

    public void drive() {
        System.out.println("Driving " + model);
        carEngine.start();
    }

    // Demonstrating lifecycle dependency: finalizer (not recommended for general use, but for demo)
    @Override
    protected void finalize() throws Throwable {
        System.out.println("Car '" + model + "' destroyed. Its engine will also be destroyed.");
        // When the Car is garbage collected, its Engine will also become eligible for GC
    }
}

public class CompositionDemo {
    public static void main(String[] args) {
        System.out.println("Creating a car...");
        CarComposition myCar = new CarComposition("Sedan", "V6", 250);
        myCar.drive();

        System.out.println("\nDestroying the car (setting to null)...");
        myCar = null; // Making the Car object eligible for garbage collection

        // Requesting garbage collection (JVM may or may not run immediately)
        System.gc();

        try {
            // Give a little time for garbage collector to run (for demonstration)
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\nEnd of Composition Demo.");
    }
}