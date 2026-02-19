public class QuestionSeven {

    // First method that throws ArithmeticException.
    public static void propagator1() {
        int number = 50 / 0;
        System.out.println(number);
    }

    // Second method that calls propagator1 and rethrows exception.
    public static void propagator2() {
        try {
            propagator1();
        } catch (ArithmeticException e) {
            System.out.println("Exception caught in propagator2, rethrowing...");
            throw e;
        }
    }

    public static void main(String[] args) {
        try {
            // Call propagator2 from main.
            propagator2();
        } catch (ArithmeticException e) {
            // Handle rethrown exception and print stack trace.
            System.out.println("Exception caught in main. Stack trace:");
            e.printStackTrace();
        }
    }
}
