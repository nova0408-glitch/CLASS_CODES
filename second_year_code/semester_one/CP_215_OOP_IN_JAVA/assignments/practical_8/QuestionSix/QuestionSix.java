public class QuestionSix {

    public static void methodWithOwnTry() {
        try {
            // This line causes ArithmeticException.
            int result = 10 / 0;
            System.out.println("Result: " + result);

        } catch (NullPointerException e) {
            // This catch handles only NullPointerException.
            // ArithmeticException is not handled here.
            System.out.println("NullPointerException caught inside method.");
        }
    }

    public static void main(String[] args) {
        try {
            // Call method that has its own try-catch.
            methodWithOwnTry();

        } catch (ArithmeticException e) {
            // ArithmeticException slips to outer scope and is handled here.
            System.out.println("ArithmeticException caught in main (outer scope): " + e.getMessage());
        }
    }
}
