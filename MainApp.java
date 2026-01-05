
class Student {
    
    private String name;
    int age;
    private String reg_no;

    // set details

    public void set_details(String name, int age, String reg_no){
        this.name = name;
        this.age = age;
        this.reg_no = reg_no;
    }

    // get details
    public void get_details() {
        System.out.println("NAME: "+ name + "\n" + "AGE: " + age + "\n"+ "REG_N0:" + reg_no + "\n");
    }
    
}

class Teacher {

    static String name;
    static int age;
    static String reg_no;

}

public class MainApp {
    public static void main(String[] args) {

        Student new_student = new Student();

        Teacher new_Teacher = new Teacher();
        Teacher.name = "James";

       

        new_student.age = 10;
        new_student.set_details("James", 21, "T24-03");
        new_student.get_details();
        

        
    }
    
}
