package personal.oop_one.constructor;



//  Constructor with No-Argument (private Class)
/*
public class Main {
    
    int i;

    // constructore with no parameter 
    private Main() {
        i = 5;
        System.out.println("Constructor is called");
    }

    public static void main(String[] args) {

        // callling the constructor without any parameter 
        Main obj = new Main();
        System.out.println("Value of i: " + obj.i);
    }
    
}
*/

// Constructor no=Arg for a Public Class
class Company {
    String name;

    // public constructor 
    public Company() {
        name = "Programiz";
    }
}


class Main {
    public static void main(String[] args) {       

        // object is created in another class 
        Company obj = new Company();
        System.out.println("Company name = " + obj.name);
    }
    
}