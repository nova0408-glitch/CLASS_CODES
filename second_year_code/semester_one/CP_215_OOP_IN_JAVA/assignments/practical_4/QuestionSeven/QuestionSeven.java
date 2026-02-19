import java.util.Scanner;

public class QuestionSeven {
    public static void main(String[] args) {
        // Scanner for user input.
        Scanner input = new Scanner(System.in);

        // Create object from Student class.
        Student student = new Student();

        System.out.print("Enter student name: ");
        student.setName(input.nextLine());

        System.out.print("Enter registration number: ");
        student.setRegNumber(input.nextLine());

        System.out.print("Enter year of study: ");
        student.setYearOfStudy(input.nextInt());

        // Clear newline before reading next string.
        input.nextLine();

        System.out.print("Enter gender: ");
        student.setGender(input.nextLine());

        // Display values using get methods.
        System.out.println("\nStudent Details");
        System.out.println("Name: " + student.getName());
        System.out.println("Reg Number: " + student.getRegNumber());
        System.out.println("Year of Study: " + student.getYearOfStudy());
        System.out.println("Gender: " + student.getGender());

        input.close();
    }
}
