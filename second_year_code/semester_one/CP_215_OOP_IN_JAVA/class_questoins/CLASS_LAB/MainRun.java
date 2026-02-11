package CLASS_LAB;

abstract class Animal {

    int age;
    String habitat;

    public void eat() {}

    abstract void move();
}

interface Flyable {
    public void fly(int altitude);
    public void land();

    default void flying() {
        System.out.println("The animal is Flying in the Air.");
    }
}

interface Swimmable {
    public void swim(double depth);
}

class Bird extends Animal implements Flyable {

    @Override
    public void move() {
        System.out.println("Bird is flying");
    }

    @Override
    public void fly(int altitude) {
        System.out.printf("Bird is flying %d m high.\n", altitude);
    }

    @Override
    public void land() {
        System.out.println("Bird has landed.");
    }
}

class Fish extends Animal implements Swimmable {

    @Override
    public void move() {
        System.out.println("The fish is swimming");
    }

    @Override
    public void swim(double depth) {
        System.out.printf("The fish is %.2f m deep.\n", depth);
    }
}

class Bat extends Animal implements Flyable, Swimmable {

    public void fly(int altitude) {
        System.out.printf("Bat is flying %d m high.\n", altitude);
    }

    public void move() {
        System.out.println("Bat is flying");
    }

    public void land() {
        System.out.println("Bat has landed.");
    }

    public void swim(double depth) {
        System.out.printf("Bat is swimming %.2f m deep.\n", depth);
    }
}

public class MainRun {

    public static void main(String[] args) {
        Animal bird = new Bird();
        Animal fish = new Fish();
        Animal bat = new Bat();

        System.out.println("===== UPCASTING DEMO =====");
        System.out.print("Animal morphs to a bird: ");
        bird.move();

        System.out.print("Animal morphs to a fish: ");
        fish.move();

        System.out.print("Animal morphs to a bat: ");
        bat.move();

        System.out.println("==== DOWNCASTING DEMO =====");
        if (bird instanceof Bird) {
            Bird bird_obj = (Bird) bird;
            bird_obj.fly(100);
            System.out.print("Default Method Implementation: ");
            bird_obj.flying();
        }

        // Another way of downcasting:
        if (bird instanceof Flyable) {
            ((Flyable) bird).fly(100);
        }

        if (fish instanceof Swimmable) {
            ((Swimmable) fish).swim(5.0);
        }

        if (bat instanceof Flyable && bat instanceof Swimmable) {
            ((Flyable) bat).fly(100);
            ((Swimmable) bat).swim(5.0);
        }

        /* Downcasting the following leads to an error:
        Bird fish_obj = (Bird) fish;
        fish_obj.fly(100);

        Message:
        Exception in thread "main" java.lang.ClassCastException: class CLASS_LAB.Fish
        cannot be cast to class CLASS_LAB.Bird (CLASS_LAB.Fish and CLASS_LAB.Bird are
        in unnamed module of loader 'app') at CLASS_LAB.MainRun.main(MainRun.java:105)



        */
    }
}
