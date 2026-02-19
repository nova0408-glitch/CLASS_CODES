public class QuestionTen {
    public static void main(String[] args) {
        // Create two Employee objects.
        Employee employee1 = new Employee("John", "Kato", 1200.0);
        Employee employee2 = new Employee("Sarah", "Nambi", 1500.0);

        // Display yearly salaries before raise.
        System.out.println("Before 10% raise:");
        System.out.println(employee1.getFirstName() + " " + employee1.getLastName()
                + " Yearly Salary: " + employee1.getYearlySalary());
        System.out.println(employee2.getFirstName() + " " + employee2.getLastName()
                + " Yearly Salary: " + employee2.getYearlySalary());

        // Give each employee a 10% raise.
        employee1.setMonthlySalary(employee1.getMonthlySalary() * 1.10);
        employee2.setMonthlySalary(employee2.getMonthlySalary() * 1.10);

        // Display yearly salaries after raise.
        System.out.println("\nAfter 10% raise:");
        System.out.println(employee1.getFirstName() + " " + employee1.getLastName()
                + " Yearly Salary: " + employee1.getYearlySalary());
        System.out.println(employee2.getFirstName() + " " + employee2.getLastName()
                + " Yearly Salary: " + employee2.getYearlySalary());
    }
}
