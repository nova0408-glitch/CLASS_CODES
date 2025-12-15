package personal.oop_one.methods;

/*
class Main {



    // create a method 
    public int addNumbers(int a, int b) {
        int sum = a + b;
        // return value
        return sum; 
    }

    public static void main(String[] args) {

        int num1 = 25;
        int num2 = 15;

        // create an object of Main 
        Main obj = new Main();
        int result = obj.addNumbers(num1, num2);
        System.out.println("Sum is: " + result);

    }
    
}
*/


// Example2; Method return type 
class Main {
    // crete a method 
    public static int square(int num) {

        // return statement 
        return num * num;
    }

    public static void main(String[] args) {
        int result;

        // call the method 
        // store returned value to result 
        result = square(10);

        System.out.println("Squared value of 10 is: " + result);

    }
}