public class Lab8Q3 {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException("Subclass of RuntimeException");
        } catch (IllegalArgumentException e) {
            System.out.println("Caught subclass first: " + e.getClass().getSimpleName());
        } catch (RuntimeException e) {
            System.out.println("Caught superclass next: " + e.getClass().getSimpleName());
        }

        /*
         * Wrong order example (will NOT compile):
         *
         * try {
         *     throw new IllegalArgumentException("demo");
         * } catch (RuntimeException e) {
         *     // superclass catch first
         * } catch (IllegalArgumentException e) {
         *     // unreachable catch block -> compiler error
         * }
         */
    }
}
