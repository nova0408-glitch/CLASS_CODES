import java.util.Scanner;

public class QuestionFive {

    // Overloaded method for two integers.
    public static int addition(int a, int b) {
        return a + b;
    }

    // Overloaded method for two doubles.
    public static double addition(double a, double b) {
        return a + b;
    }

    // Overloaded method for three integers.
    public static int addition(int a, int b, int c) {
        return a + b + c;
    }

    // Overloaded method for string concatenation.
    public static String addition(String a, String b) {
        return a + b;
    }

    public static void main(String[] args) {
        // Scanner to read all values from keyboard.
        Scanner input = new Scanner(System.in);

        System.out.print("Enter first integer: ");
        int int1 = input.nextInt();
        System.out.print("Enter second integer: ");
        int int2 = input.nextInt();

        System.out.print("Enter first double: ");
        double double1 = input.nextDouble();
        System.out.print("Enter second double: ");
        double double2 = input.nextDouble();

        System.out.print("Enter third integer: ");
        int int3 = input.nextInt();

        // Clear newline left by nextInt.
        input.nextLine();

        System.out.print("Enter first string: ");
        String text1 = input.nextLine();
        System.out.print("Enter second string: ");
        String text2 = input.nextLine();

        // Displaying results in main method.
        System.out.println("Integer addition (2 numbers): " + addition(int1, int2));
        System.out.println("Double addition (2 numbers): " + addition(double1, double2));
        System.out.println("Integer addition (3 numbers): " + addition(int1, int2, int3));
        System.out.println("String concatenation: " + addition(text1, text2));

        input.close();
    }
}
