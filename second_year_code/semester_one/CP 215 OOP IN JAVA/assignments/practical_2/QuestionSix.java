import java.util.*;

public class QuestionSix {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("ENTER YOUR NAME: ");
        String name = input.nextLine();

        System.out.print("ENTER YOUR AGE: ");
        int age = input.nextInt();

        System.out.printf("Hello, %s! You are %d years old.\n", name, age);
    }
    
}
