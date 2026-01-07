package assignments.practical_6.QuestionTwo;

class Date {

    private int year;
    private int day;
    private int month;

    public Date(int day, int month, int year) {
        boolean isLeapYear;

        // Start by checking if it is a leap year
        // COndition for leap year 
        // And should not be divisible by 100
        // Divisble by four our by 400 (special case for centuries)

        if ((year%4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            isLeapYear = true;
        }
        else {
            isLeapYear = false;
        }

        if (month < 1 || month > 12) {
            System.out.println("Invalid Month");
            return;
        }

        // days in each of the 12 Months
        int [] daysInMonth = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

        if (month == 2 && isLeapYear){
            daysInMonth[1] = 29;

        }

        // CHecker to see if the days fall in the range 
        // Logic is if April is 4, then 4-1 will be  3
        // Arrays use indexes!

        if (day >= 1 && day <= daysInMonth[month - 1]) {
            this.year = year;
            this.day = day;
            this.month = month;
        }


    }

    public String toString(){
        String date;
        date  = Integer.toString(this.day) + " - "+  Integer.toString(this.month) + " - " +  Integer.toString(this.year);     
        
        return date;
    }

}

class Employee {

    private String firstName;
    private String lastName;

    Date birth_date; 
    Date hire_date;
    public Employee (String firstName, String lastName, Date birthDate, Date hireDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birth_date = birthDate;
        this.hire_date = hireDate;
    }
    
    @Override
    public String toString(){
        String details;

        details =  firstName + " " + lastName + "\nHire Date: " + this.hire_date.toString()
                    + "\nBirth Date: " + this.birth_date.toString();
        return details;
    }
}


class EmployeeTest {

    Date birthDate_one = new Date(8,4,2004);
    Date hireDate_one = new Date(10, 8, 2026);

    Date birthDate_two = new Date(9,4,2004);
    Date hireDate_two = new Date(20,8,2026);

    Employee employee_one = new Employee("James", "Herlock", birthDate_one, hireDate_one);

    Employee employee_two = new Employee("David", "Bert", birthDate_two, hireDate_two);

    

    public void employee_details() {
        
        System.out.println("---------Employee Details---------");
        System.out.println(employee_one.toString());
        System.out.println("-----------------------------------");
        System.out.println(employee_two.toString());

    }
}



// This has been added to test if the code works only...
public class QuestionTwo {
    
    public static void main(String[] args) {
        
        EmployeeTest employee = new EmployeeTest();
        employee.employee_details();
    }
}


