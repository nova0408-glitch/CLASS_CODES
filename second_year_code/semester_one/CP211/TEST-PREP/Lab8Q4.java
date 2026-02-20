public class Lab8Q4 {
    static class SomeClass {
        SomeClass() throws Exception {
            throw new Exception("Constructor failed: object could not be created");
        }
    }

    public static void main(String[] args) {
        try {
            SomeClass obj = new SomeClass();
            System.out.println(obj);
        } catch (Exception e) {
            System.out.println("Caught exception from constructor: " + e.getMessage());
        }
    }
}
