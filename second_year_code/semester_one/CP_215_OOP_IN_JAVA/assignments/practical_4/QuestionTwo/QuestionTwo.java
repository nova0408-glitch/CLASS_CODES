public class QuestionTwo {

    // Method to display a title passed as a string parameter.
    public static void myMethod(String title) {
        System.out.println(title);
    }

    // Method to add two integers and display the result.
    public static void addition(int a, int b) {
        int sum = a + b;
        System.out.println("Sum = " + sum);
    }

    public static void main(String[] args) {
        // Hardcoded values as requested in the question.
        myMethod("Adding two Integers:");
        addition(20, 15);
    }
}
