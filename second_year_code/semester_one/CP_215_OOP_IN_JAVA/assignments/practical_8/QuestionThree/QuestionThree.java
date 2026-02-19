public class QuestionThree {
    public static void main(String[] args) {
        try {
            // This line causes NumberFormatException.
            Integer.parseInt("CP215");

            // This line will not run because exception is thrown above.
            System.out.println("Conversion successful.");

        } catch (NumberFormatException e) {
            // Catch subclass first (correct order).
            System.out.println("Caught NumberFormatException first: " + e.getMessage());

        } catch (Exception e) {
            // Catch superclass after subclass.
            System.out.println("Caught by general Exception catch: " + e.getMessage());
        }

        // Important note:
        // If you put catch(Exception e) BEFORE catch(NumberFormatException e),
        // Java compiler gives an error because the second catch becomes unreachable.
    }
}
