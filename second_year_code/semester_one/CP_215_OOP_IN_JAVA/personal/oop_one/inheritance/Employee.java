public class Employee {
    private String name;
    private int id;
    private double salary;

    public void setDetails(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    public void display(String name, int id){
        System.out.println("Name: " + this.name);
        System.out.println("Id: "+this.id);

    }

    public static void main(String[] args) {
        Employee employee_one = new Employee();
        Employee employee_two = new Employee();

        employee_one.name= "James";
        employee_one.id = 2;
        employee_one.salary = 2300;

        employee_two.name = "Amon";
        employee_two.id = 3;
        employee_two.salary = 43000;

        employee_one.setDetails("Karius", 100, 2000);
        employee_one.display("Barkinabe", 2);
    }
}

class Programmer extends Employee {
    
}