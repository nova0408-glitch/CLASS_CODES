public class Lab8Q6 {
    static void methodWithOwnTry() {
        try {
            String s = null;
            s.length(); // NullPointerException handled here

            int x = 10 / 0; // This line is never reached in this run
            System.out.println(x);
        } catch (NullPointerException e) {
            System.out.println("Inner method caught NullPointerException only.");
        }
    }

    static void methodThatLetsExceptionSlip() {
        try {
            int x = 10 / 0; // ArithmeticException not handled here
            System.out.println(x);
        } catch (NullPointerException e) {
            System.out.println("This catch does not match ArithmeticException.");
        }
    }

    public static void main(String[] args) {
        methodWithOwnTry();

        try {
            methodThatLetsExceptionSlip();
        } catch (ArithmeticException e) {
            System.out.println("Outer scope caught slipped exception: " + e);
        }
    }
}
