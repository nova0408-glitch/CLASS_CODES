public class Lab8Q5 {
    static void someMethod2() throws Exception {
        throw new Exception("Initial exception from someMethod2");
    }

    static void someMethod() throws Exception {
        try {
            someMethod2();
        } catch (Exception e) {
            System.out.println("someMethod caught exception, now rethrowing...");
            throw e;
        }
    }

    public static void main(String[] args) {
        try {
            someMethod();
        } catch (Exception e) {
            System.out.println("main caught rethrown exception:");
            e.printStackTrace();
        }
    }
}
