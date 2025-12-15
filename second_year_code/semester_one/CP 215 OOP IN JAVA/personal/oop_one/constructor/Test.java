package personal.oop_one.constructor;

// Parameterized Constructor 
public class Test {

    String languages;

    // constructor accepting single value 
    Test(String lang) {
        languages = lang;
        System.out.println(languages + " Programming Langauge");
    }

    public static void main(String[] args) {

        // call constructor by passing a single value 
        Test obj1 = new Test("Java");
        Test obj2 = new Test("Python");
        Test obj3 = new Test("C");

    }
    
}
