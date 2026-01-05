import java.util.*;

public class QuestionFour {

    public static void main(String[] args) {

        Scanner  input = new Scanner(System.in);

        System.out.print("Enter the first number: ");
        int first_number = input.nextInt();

        System.out.print("Enter the second number: ");
        int second_number = input.nextInt();

        System.out.println("=========================");
        System.out.printf("Sum: %d\n",(first_number + second_number));
        System.out.printf("Product: %d\n", (first_number * second_number));
        System.out.printf("Difference: %d\n", (first_number - second_number));
        System.out.printf("Quotient: %d\n", (first_number / second_number));
        
        input.close();
    }
    
}
