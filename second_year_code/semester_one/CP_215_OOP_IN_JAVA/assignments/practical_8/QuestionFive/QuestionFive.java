public class QuestionFive {

    // This method throws an exception first.
    public static void someMethod2() throws Exception {
        throw new Exception("Original exception from someMethod2.");
    }

    // This method catches and rethrows the same exception.
    public static void someMethod() throws Exception {
        try {
            someMethod2();
        } catch (Exception e) {
            System.out.println("Exception caught in someMethod. Rethrowing now...");
            throw e;
        }
    }

    public static void main(String[] args) {
        try {
            // Call method that rethrows exception.
            someMethod();
        } catch (Exception e) {
            // Catch rethrown exception and print full stack trace.
            System.out.println("Exception caught in main. Stack trace:");
            e.printStackTrace();
        }
    }
}
