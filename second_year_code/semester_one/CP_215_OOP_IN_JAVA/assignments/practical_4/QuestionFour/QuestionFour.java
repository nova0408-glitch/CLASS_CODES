public class QuestionFour {

    // Method to add two integers and return the sum.
    public static int addition(int a, int b) {
        int sum = a + b;
        return sum;
    }

    // Method responsible for displaying output.
    public static void display(int a, int b) {
        int result = addition(a, b);
        System.out.println("The sum is: " + result);
    }

    public static void main(String[] args) {
        // Main calls display method.
        display(12, 8);
    }
}
