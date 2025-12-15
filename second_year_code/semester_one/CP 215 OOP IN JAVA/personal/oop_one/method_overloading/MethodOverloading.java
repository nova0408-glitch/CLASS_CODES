package personal.oop_one.method_overloading;

/*
public class MethodOverloading {
    private static void display(int a){
        System.out.println("Arguments: " + a);
    }

    public static void display(int a, int b) {
        System.out.println("Arguments: " + a + " and " + b);
    }

    public static void main(String[] args) {
        display(1);
        display(1, 4);
    }
    
}
*/

public class MethodOverloading {

    // this method accepts int 
    private static void display(int a) {
        System.out.println("Got Integer data.");
    }

    // this method accepts String object 
    private static void display(String a){
        System.out.println("Got String object.");
    }

    private static void main(String[] args){
        display(1);
        display("Hello");
    }
}