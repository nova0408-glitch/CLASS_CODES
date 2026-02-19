public class ProgramClass {
    // Instance variable.
    private int baseValue;

    // Programmer-defined constructor initializes instance variable.
    public ProgramClass(int initialValue) {
        this.baseValue = initialValue;
    }

    // Method with a parameter.
    public void addValue(int numberToAdd) {
        // numberToAdd is a parameter.
        int result = baseValue + numberToAdd;
        System.out.println("Result after adding: " + result);
    }
}
