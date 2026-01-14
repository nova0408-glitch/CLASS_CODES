package CP_215_OOP_IN_JAVA.class_questoins;
import java.util.Scanner;

class Employee {
    private String firstName;
    private String lastName;
    private String employeeID;
    private String hireDate;

    public Employee (String firstName, String lastName, String employeeID, String hireDate){
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeID = employeeID;
        this.hireDate = hireDate;

    }

    public String getEmployeeID() {
        return employeeID;
    }

    public String getName(){
        String fullName = this.firstName + " " + this.lastName;
        return fullName;

    }

    public String getHireDate(){
        return this.hireDate;

    }
     
}

class Manager extends Employee {

    private String department;
    private int noOfSuboridnates;

    public Manager(String firstName, String lastName, String employeeID, String hireDate, String departement, int noOfSuboridnates){
        super(firstName, lastName, employeeID, hireDate);
        this.department = departement;
        this.noOfSuboridnates = noOfSuboridnates;
    }

    public String getdepartement(){
        return this.department;
    }

    public int getnoOfSubordinates(){
        return this.noOfSuboridnates;
    }

}

class SalesPerson extends Employee {
    String salesRegion;

    public SalesPerson(String firstName, String lastName, String employeeID, String hireDate, String salesRegion) {
        super(firstName, lastName, employeeID, hireDate);
        this.salesRegion = salesRegion;
    }

    String getSalesRegion(){
        return this.salesRegion;
    }
}


public class TestEmployee {

    public Employee createEmployee(){

        Scanner input = new Scanner(System.in);

        String firstName, lastName;
        String hireDate;
        String employeeID;

        System.out.println("===== Create EMPLOYEE ======");

        System.out.print("Enter First Name:");
        firstName = input.nextLine();

        System.out.print("Enter Last Name: ");
        lastName = input.nextLine();

        System.out.print("Enter Employee ID: ");
        employeeID = input.nextLine();

        System.out.print("Enter Hire Date: ");
        hireDate = input.nextLine();

        Employee employeeOne = new Employee(firstName, lastName, employeeID, hireDate);    

        return employeeOne;

    }

    public Manager createManager(){        
        Scanner input = new Scanner(System.in);
        String firstName, lastName;
        String hireDate;
        String employeeID;
        String department;
        int noOfSuboridnates;

        System.out.println("===== Create MANAGER ======");

        System.out.print("Enter First Name:");
        firstName = input.nextLine();

        System.out.print("Enter Last Name: ");
        lastName = input.nextLine();

        System.out.print("Enter Employee ID: ");
        employeeID = input.nextLine();

        System.out.print("Enter Hire Date: ");
        hireDate = input.nextLine();

        System.out.print("Enter Department:");
        department = input.nextLine();

        System.out.print("Enter no. of Subordinates: ");
        noOfSuboridnates = input.nextInt(); 


        Manager managerOne = new Manager(firstName, lastName, employeeID, hireDate, department, noOfSuboridnates);
        return managerOne;
    }

    public SalesPerson createSalesPerson(){

        Scanner input = new Scanner(System.in);
        String firstName, lastName;
        String hireDate;
        String employeeID;
        String salesRegion;   


        System.out.println("===== Create SALES PERSON ======");

        System.out.print("Enter First Name:");
        firstName = input.nextLine();

        System.out.print("Enter Last Name: ");
        lastName = input.nextLine();

        System.out.print("Enter Employee ID: ");
        employeeID = input.nextLine();

        System.out.print("Enter Hire Date: ");
        hireDate = input.nextLine();

        System.out.print("Enter Sales Region:");
        salesRegion = input.nextLine();


        SalesPerson salesPersonOne = new SalesPerson(firstName, lastName, employeeID, hireDate, salesRegion);
        input.close();


        return salesPersonOne;     

    }

    public void displayClasses(Employee employeeOne, Manager managerOne, SalesPerson salesPersonOne){
        System.out.println("==== SHOW CLASSES DETAILS =====");
        System.out.println("---- EMPLOYEE ----");
        System.out.println("----------------------");
        System.out.print("Name: ");
        System.out.println(employeeOne.getName());

        System.out.print("Employee ID: ");
        System.out.println(employeeOne.getEmployeeID());

        System.out.print("Hire Date: ");
        System.out.println(employeeOne.getHireDate());

        System.out.println("----------------------\n\n");

        System.out.println("---- MANAGER ----");
        System.out.println("----------------------");
        System.out.print("Name:");
        System.out.println(managerOne.getName());

        System.out.print("Employee ID: ");
        System.out.println(managerOne.getEmployeeID());

        System.out.print("Hire Date: ");
        System.out.println(managerOne.getHireDate());

        System.out.print("Department: ");
        System.out.println(managerOne.getdepartement());
        
        System.out.print("No. of Subordinates: ");
        System.out.println(managerOne.getnoOfSubordinates());

        System.out.println("----------------------\n\n");
        System.out.println("---- SALES PERSON ----");
        System.out.println("----------------------");
        System.out.print("Name:");
        System.out.println(salesPersonOne.getName());

        System.out.print("Employee ID: ");
        System.out.println(salesPersonOne.getEmployeeID());

        System.out.print("Hire Date: ");
        System.out.println(salesPersonOne.getHireDate());

        System.out.print("Sales Region: ");
        System.out.println(salesPersonOne.getSalesRegion());

        System.out.println("----------------------");    }

    public static void main(String[] args) {
        
        System.out.println("=== A SYSTEM RECORD EMPLOYEE, MANAGER AND SALES PERSON ===");
        
        TestEmployee main = new TestEmployee();

        Employee employeeOne = main.createEmployee();
        System.out.println();
        Manager managerOne = main.createManager();
        System.out.println();
        SalesPerson salespersonOne =  main.createSalesPerson();        
        System.out.println();
        main.displayClasses(employeeOne, managerOne, salespersonOne);

    }
    
}
