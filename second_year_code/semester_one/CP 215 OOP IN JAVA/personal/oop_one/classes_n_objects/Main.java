package personal.oop_one.classes_n_objects;

/*/
class Lamp {
    // stores the value for light 
    // true if light is on 
    // false if light is off
    boolean isOn;

    // method to turn on the light 
    void turnOn() {
        isOn = true;
        System.out.println("Light on? " + isOn);
    }

    // Method to turn off the light 
    void turnOff() {
        isOn = false;
        System.out.println("Light on? " + isOn);
    }
}

public class Main {
    public static void main(String[] args) {

        // Create objects led and halogen 
        Lamp led = new Lamp();
        Lamp halogen = new Lamp();

        // turn on the light by 
        // callling method turnOn()
        halogen.turnOn();

        // turn of the ligt
        // by calling method turnOff
        led.turnOff();
    }
}
*/

// Creating class in the same object:
class Lamp {

    // stores the value for light 
    // true if light is on 
    // false if light is off 
    boolean isOn;

    // method to turn on the light 
    void turnOn() {
        isOn = true;
        System.out.println("Light on? " + isOn);

    }

    public static void main(String[] args) {

        // Create an object of Lamp 
        Lamp led = new Lamp();

        // access method using object
        led.turnOn();
    }
}

