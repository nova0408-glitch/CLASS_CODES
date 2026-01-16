// Professor class (the "part")
// has-a (weak*)

class Professor {
    String name;
    String specialization;

    public Professor(String name, String specialization) {
        this.name = name;
        this.specialization = specialization;
    }

    public void teach() {
        System.out.println(name + " is teaching " + specialization + ".");
    }
}

// Department class (the "whole")
class Department {
    String departmentName;
    // Aggregation: Department has a Professor, but Professor can exist independently
    Professor headOfDepartment; // Member variable of type Professor

    public Department(String departmentName, Professor headOfDepartment) {
        this.departmentName = departmentName;
        this.headOfDepartment = headOfDepartment;
    }

    public void displayDepartmentInfo() {
        System.out.println("Department: " + departmentName);
        if (headOfDepartment != null) {
            System.out.print("Head of Department: ");
            headOfDepartment.teach(); // Demonstrating interaction
        } else {
            System.out.println("No head of department assigned.");
        }
    }
}

public class AggregationDemo {
    public static void main(String[] args) {
        // Create Professor objects independently
        Professor profSmith = new Professor("Dr. Smith", "Computer Science");
        Professor profJones = new Professor("Dr. Jones", "Physics");

        // Create Department objects, associating them with Professors
        Department csDepartment = new Department("Computer Science", profSmith);
        Department physicsDepartment = new Department("Physics", profJones);

        csDepartment.displayDepartmentInfo();
        physicsDepartment.displayDepartmentInfo();

        // Professor Smith can still exist even if csDepartment is gone
        System.out.println("\nDemonstrating independent existence:");
        profSmith.teach();
    }
}