package personal.oop_one.stat;


class Test {

    // statio variable 
    static int max = 10;

    // non-static variable 
    int min = 5;
}

public class Variable {
    public static void main(String[] args) {
        Test obj =  new Test();

        // access teh non-static variable 
        System.out.println("min + 1 = " + (obj.min + 1));

        // access teh static variable
        System.out.println("max + 1 = " + (Test.max + 1));
    }
    
}
