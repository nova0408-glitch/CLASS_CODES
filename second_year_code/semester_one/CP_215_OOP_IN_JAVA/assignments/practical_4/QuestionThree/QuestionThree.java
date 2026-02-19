import java.util.Scanner;

public class QuestionThree {

    // Method to display the title.
    public static void myMethod(String title) {
        System.out.println(title);
    }

    // Method to add two numbers and display sum.
    public static void addition(int a, int b) {
        int sum = a + b;
        System.out.println("Sum = " + sum);
    }

    public static void main(String[] args) {
        // Scanner object to read user input.
        Scanner input = new Scanner(System.in);

        System.out.print("Enter title: ");
        String title = input.nextLine();

        System.out.print("Enter first integer: ");
        int num1 = input.nextInt();

        System.out.print("Enter second integer: ");
        int num2 = input.nextInt();

        // Calling methods with values from user.
        myMethod(title);
        addition(num1, num2);

        // Closing scanner to avoid resource leak.
        input.close();
    }
}
