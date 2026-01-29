class Animal {

    void speak() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {

    @Override
    void speak() {
        System.out.println("Dog barks");
    }

    void fetch() {
        System.out.println("Dog fetches the ball");
    }
}

class Cat extends Animal {

    @Override
    void speak() {
        System.out.println("Cat meows");
    }
}

public class TestMain {

    public static void main(String[] args) {
        // =====================
        // UPCASTING
        // ===================
        Animal a = new Dog(); // upcasting (implicit , safe)

        // -- Compile time ---
        // Compiler only sees Animal
        // SO only animal methods are allowed
        a.speak();
        // a.fetch(); (will have a compile time error)
        // at RUNTIME it will acknowledge that it is a dog and will run the dog's method

        // ===============================
        // DOWNCASTING (SAFE)
        // // ============================

        if (a instanceof Dog) {
            Dog d = (Dog) a; // downcasting (explicit)

            // Now compiler knows it's a  Dog
            d.fetch(); // allowed now
            d.speak(); // Runs the dog version
        }

        // ===================================
        // DOWNCASTING (UNSAFE)
        // =================================

        Animal b = new Cat(); //upcasting again

        // This compiles
        // Dog x = (Dog) b;
        //
        //
        // ... crashes at runtime
        try {
            Dog x = (Dog) b; // ClassCastException
            x.fetch();
        } catch (ClassCastException e) {
            System.out.println("Runtime Error:" + e);
        }
    }
}
