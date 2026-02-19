class VariableDemo {
    // Class variable (static variable).
    public static String university = "Makerere University";

    // Instance variable.
    public String studentName;

    // Constructor to set instance variable.
    public VariableDemo(String studentName) {
        this.studentName = studentName;
    }

    // Class method (static method).
    public static void showClassVariable() {
        System.out.println("University (class variable): " + university);
    }

    // Instance method.
    public void showInstanceAndLocalVariables() {
        // Local variable inside method.
        int marks = 85;

        System.out.println("Student Name (instance variable): " + studentName);
        System.out.println("Marks (local variable): " + marks);
    }
}

public class QuestionEight {
    public static void main(String[] args) {
        // Create objects to use instance variables and instance method.
        VariableDemo studentOne = new VariableDemo("Alice");
        VariableDemo studentTwo = new VariableDemo("Brian");

        // Call class method.
        VariableDemo.showClassVariable();

        // Call instance methods.
        studentOne.showInstanceAndLocalVariables();
        studentTwo.showInstanceAndLocalVariables();
    }
}
