import java.util.*;

public class QuestionThree {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.println("Enter two integers.");
        System.out.print("Enter First Number: ");
        int first_number = input.nextInt();

        System.out.print("Enter Second Number: ");
        int second_number = input.nextInt();

        if (first_number > second_number) {
            System.out.printf("%d is larger.\n", first_number);
        } else if (first_number == second_number) {
            System.out.printf("The numbers are equal.\n");
        } else {
            System.out.printf("%s is larger\n", second_number);
        }
    }
    
}
