class Personel {

    private String name;
    private int age;
    private String phone_number;

    public String getName(){
        return this.name;
    }

    public String getPhone(){
        return this.phone_number;
    }

    public int getAge(){
        return this.age;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setAge(int age){
        this.age = age;
    }

    public void getDetails(){

    }
}

class Student extends Personel {
    String registration_number;
    String student_id;
    int yos;
    Course student_Course;

    public void getStudentDetails(){
        System.out.printf("REG_NO: %s\n STUDENT_ID: %s \n AGE: %d\n", registration_number, student_id, yos);
    }

    @Override
    public void getDetails(){
        System.out.println();

    }

}

class Teacher extends Personel {
    String staff_id;
    String department;

    @Override
    public void getDetails(){

    }

}

class Course {
    String name;
    int courseID;
    String instructor;

    public Course(String name, int courseId, String instructor){
        this.name = name;
        this.courseID = courseId;
        this.instructor = instructor;
    }

}

public class test {

    public static void main(String[] args) {
      
    
    }
}