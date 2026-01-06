import java.util.Scanner;

class Student {
    
    String name;
    int age;
    double double_age;
    private String reg_no;

    // set details

    // get details
    public void get_details() {
        System.out.println("NAME: "+ name + "\n" + "AGE: " + age + "\n"+ "REG_N0:" + reg_no + "\n");
    }
    
}

class Teacher {

    static String name;
    static int age;
    static String reg_no;

}

public class MainApp {
    public static void main(String[] args) {

        System.out.println("What is your age: ");
        Scanner input = new Scanner(System.in);
        int response = input.nextInt();

        if (response >= 18) {

            String name;
            String reg_no;
            int age;

            System.out.print("Enter NAME: ");
            name = input.nextLine();

            System.out.print("Age: ");
            age = input.nextInt();

            System.out.print("Reg No: ");
            age = input.nextInt();
            
            
            Student new_student = new Student("James", 28, "t24-03-2");

        }

        Student muksini = new Student();

        muksini.reg_no;

        

        
    }
    
}
