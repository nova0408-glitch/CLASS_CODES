package assignments.practical_7.QuestionOne;
import java.util.Scanner;

abstract class Employee {
    private double salary;  

}

class SalariedEmployee extends Employee {
    private double salary;

    public SalariedEmployee(double salary){
        this.salary = salary;
    }

    public double get_salary(){
        return this.salary;
    }
}

class HourlyEmployee extends Employee {
    private double hourly_salary;
    private float hours;

    public HourlyEmployee(double hourly_salary, float hours){
        this.hourly_salary = hourly_salary;
        this.hours = hours;
    }    

    public double get_salary() {
        
        if ( hours > 40){
            this.hourly_salary = 1.5 * (this.hours) * this.hourly_salary;
            return this.hourly_salary;
        }

        else {
            this.hourly_salary = hours * this.hourly_salary;
            return this.hourly_salary;
        
        }       
    }
    
}

class CommissionEmployee extends Employee {
    private double salary;
    private double sales;
    private float sales_percentage;

    public CommissionEmployee(double sales, float sales_percentage){
        this.sales = sales;
        this.sales_percentage = sales_percentage;
    }


    public double get_salary(){
        this.salary = sales_percentage * sales;
        return this.salary;
    }
}

class BasePlusCommissionEmployee extends Employee {
    private double salary;
    private double sales;
    private double sales_percentage;

    public BasePlusCommissionEmployee(double salary, double sales, double sales_percentage) {
        this.salary = salary;
        this.sales = sales;
        this.sales_percentage = sales_percentage;
    }

    public double get_salary(){
        this.salary = this.salary + (this.sales_percentage * this.sales);
        return this.salary;
    }
}

public class QuestionOne {

    public static void main(String[] args) {

        double salary;
        double sales;
        float sales_percentage;
        float hours;


        Scanner input = new Scanner(System.in);


        System.out.println("======================================================");
        System.out.println("Payrol Calculator");
        System.out.println("------------------------------------------------------");

        System.out.println("====Please ENTER the following details for Employee Type====\n");
        System.out.println(">>>> Hourly Employee: <<<<");
        System.out.print("Hourly Salary: ");
        salary = input.nextDouble();

        System.out.print("Hours: ");
        hours = input.nextFloat();

        HourlyEmployee employee_one = new HourlyEmployee(salary, hours);        
        System.out.printf("Salary for Hourly Employee: %.2f \n", employee_one.get_salary());

        System.out.println("--------------------------------------------------------");
        System.out.println("\n\n>>>> Commission Employee: <<<<");
        System.out.print("Sales: ");
        sales = input.nextDouble();

        System.out.print("Sales Percentage: ");
        sales_percentage = input.nextFloat();

        CommissionEmployee employee_two = new CommissionEmployee(sales, sales_percentage);
        System.out.printf("Salary for Commission Employee %.2f \n", employee_two.get_salary());


        System.out.println("----------------------------------------------------");
        System.out.println("\n\n>>>> Salaried Employee: <<<<");
        System.out.print("Salary: ");
        salary = input.nextDouble();

        SalariedEmployee employee_three = new SalariedEmployee(salary);
        System.out.printf("Salary for Commission Employee %.2f \n", employee_three.get_salary());


        System.out.println("---------------------------------------------------");
        System.out.println("\n\n>>>> Base Plus Commission Employee: <<<<");
        System.out.print("Salary: ");
        salary = input.nextDouble();

        System.out.print("Sales: ");
        sales= input.nextDouble();

        System.out.print("Sales Percentage: ");
        sales_percentage = input.nextFloat();

        BasePlusCommissionEmployee employee_four = new BasePlusCommissionEmployee(salary, sales, sales_percentage);
        System.out.printf("Salary for Commission Employee %.2f \n", employee_four.get_salary());


    }
    
}
