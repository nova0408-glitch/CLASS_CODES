// Class with constructor that can fail.
class SomeClass {
    public SomeClass() throws Exception {
        // Simulate constructor failure.
        throw new Exception("Constructor failed while creating SomeClass object.");
    }
}

public class QuestionFour {
    public static void main(String[] args) {
        try {
            // Try to create object.
            SomeClass object = new SomeClass();
            System.out.println(object);

        } catch (Exception e) {
            // Catch exception thrown by constructor.
            System.out.println("Caught exception from constructor: " + e.getMessage());
        }
    }
}
