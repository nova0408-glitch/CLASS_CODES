import java.util.ArrayList;
import java.util.List;
// uses-a relationship 


// Course class
class Course {
    String courseCode;
    String courseTitle;
    List<Student> enrolledStudents; // Many-to-many association

    public Course(String courseCode, String courseTitle) {
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.enrolledStudents = new ArrayList<>();
    }

    public void addStudent(Student student) {
        if (!enrolledStudents.contains(student)) {
            enrolledStudents.add(student);
            student.addCourse(this); // Maintain bi-directional relationship
        }
    }

    public void displayCourseInfo() {
        System.out.println("Course: " + courseCode + " - " + courseTitle);
        System.out.println("Enrolled Students:");
        if (enrolledStudents.isEmpty()) {
            System.out.println("  No students enrolled.");
        } else {
            for (Student student : enrolledStudents) {
                System.out.println("  - " + student.getName());
            }
        }
    }

    public String getCourseTitle() {
        return courseTitle;
    }
}

// Student class
class Student {
    String studentId;
    String name;
    List<Course> enrolledCourses; // Many-to-many association

    public Student(String studentId, String name) {
        this.studentId = studentId;
        this.name = name;
        this.enrolledCourses = new ArrayList<>();
    }

    public void addCourse(Course course) {
        if (!enrolledCourses.contains(course)) {
            enrolledCourses.add(course);
            course.addStudent(this); // Maintain bi-directional relationship
        }
    }

    public void displayStudentInfo() {
        System.out.println("Student ID: " + studentId + ", Name: " + name);
        System.out.println("Enrolled Courses:");
        if (enrolledCourses.isEmpty()) {
            System.out.println("  No courses enrolled.");
        } else {
            for (Course course : enrolledCourses) {
                System.out.println("  - " + course.getCourseTitle());
            }
        }
    }

    public String getName() {
        return name;
    }
}

public class AssociationDemo {
    public static void main(String[] args) {
        // Create Student objects
        Student alice = new Student("S001", "Alice Smith");
        Student bob = new Student("S002", "Bob Johnson");
        Student charlie = new Student("S003", "Charlie Brown");

        // Create Course objects
        Course maths = new Course("MATH101", "Introduction to Mathematics");
        Course programming = new Course("CS101", "Introduction to Programming");
        Course physics = new Course("PHY201", "Classical Physics");

        // Establish associations
        alice.addCourse(maths);
        alice.addCourse(programming);

        bob.addCourse(programming);
        bob.addCourse(physics);

        charlie.addCourse(maths);

        System.out.println("--- Student Information ---");
        alice.displayStudentInfo();
        System.out.println();
        bob.displayStudentInfo();
        System.out.println();
        charlie.displayStudentInfo();
        System.out.println("\n--- Course Information ---");
        maths.displayCourseInfo();
        System.out.println();
        programming.displayCourseInfo();
        System.out.println();
        physics.displayCourseInfo();
    }
}