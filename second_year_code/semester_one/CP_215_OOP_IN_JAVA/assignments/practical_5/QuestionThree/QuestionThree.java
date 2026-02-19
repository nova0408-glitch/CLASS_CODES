class Employee {
    // Static variable shared by all Employee objects.
    private static int count = 0;

    // Constructor increments count whenever object is created.
    public Employee() {
        count++;
    }

    // Static method to return current count.
    public static int getCount() {
        return count;
    }
}

public class QuestionThree {
    public static void main(String[] args) {
        // Before creating objects.
        System.out.println("Initial Employee count: " + Employee.getCount());

        // Create two Employee objects.
        Employee e1 = new Employee();
        Employee e2 = new Employee();

        // After creating objects.
        System.out.println("Employee count after creating two objects: " + Employee.getCount());

        // These lines only avoid unused variable warnings in some IDEs.
        System.out.println("Object references: " + e1 + " and " + e2);
    }
}
