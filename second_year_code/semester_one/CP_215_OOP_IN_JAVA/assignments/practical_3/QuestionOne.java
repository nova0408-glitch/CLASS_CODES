package CP_215_OOP_IN_JAVA.assignments.practical_3;
import java.util.Scanner;

public class QuestionOne {

    static float marks;
    static String grade = " ";

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        
        System.out.println("===== SIMPLE PROGRAM TO COMPUTE GRADES ====");
        System.out.print("Enter student grade: ");
        
        marks = input.nextFloat();

        if (marks > 0 && marks < 100){

            if (marks >= 0 && marks < 40) {
                grade = "C";
            } 
            else if (marks >= 40 && marks < 70) {
                grade = "B";
            }
            else if (marks >= 70 && marks <= 100){
                grade = "A";
            }

            System.out.println("The grade is: " + grade);
        }

        else {
            System.out.println("Error! Invalid input");
        }

        input.close();
    }
    
}
