package CP_215_OOP_IN_JAVA.assignments.practical_3;
import java.util.Scanner;


public class QuestionThree {

    static int num;

    public static int findFactorialForLoop(int num){

        int product = 1;
        
        // Using a for loop
        for (int i = num; i > 0; i--){
            product = product * i;
        }

        return product;
    }

    public static int findFactorialWhileLoop(int num){

        int product = 1;        
        int i = num;

        while (i > 0){
            product = product * i;
            i --;

        }

        return product;
    }

    public static int findFactorialdoWhileLoop(int num){

        int product = 1;        
        int i = num;


        do {
            product = product * i;
            i--;
        } while (i > 0);

        return product;
    }

    public static void main(String[] args){

        Scanner input = new Scanner(System.in);

        System.out.println("=== PROGRAM TO FIND THE FACTORIAL OF A NUMBER ===");
        System.out.print("Enter the Number: ");
        num = input.nextInt();
        System.out.println("----------------------------------------");
        System.out.println("The Factorial of the Number (For Loop) is: "+ findFactorialForLoop(num));
        System.out.println("The Factorial of the Number (While Loop) is: "+ findFactorialWhileLoop(num));
        System.out.println("The Factorial of the Number (do-While Loop) is: "+ findFactorialdoWhileLoop(num));



        input.close();

    }
    
}
