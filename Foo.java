class Vehicle {
    String type;
    String engine;

    public void get_details() {

    }
    
}

class Motorcycle extends Vehicle {
    String color;
    String model;

    @Override
    public void get_details(){
        System.out.println("MotorCycle");
    }

}

class Car extends Vehicle {
    String color;
    String model;
    String tyres;
}


public class Foo {

    public static void main(String[] args) {
        Motorcycle motorA = new Motorcycle();
        motorA.type = "Motorcyle";
        motorA.get_details(); 

        Car CarA  = new Car();
        CarA.get_details();
    }
    
}
