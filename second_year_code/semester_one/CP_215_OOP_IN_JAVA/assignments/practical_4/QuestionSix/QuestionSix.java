class Student {
    // Instance variables.
    private String name;
    private String regNumber;
    private int yearOfStudy;
    private String gender;

    // Setter for name.
    public void setName(String name) {
        this.name = name;
    }

    // Setter for registration number.
    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    // Setter for year of study.
    public void setYearOfStudy(int yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    // Setter for gender.
    public void setGender(String gender) {
        this.gender = gender;
    }

    // Getter for name.
    public String getName() {
        return name;
    }

    // Getter for registration number.
    public String getRegNumber() {
        return regNumber;
    }

    // Getter for year of study.
    public int getYearOfStudy() {
        return yearOfStudy;
    }

    // Getter for gender.
    public String getGender() {
        return gender;
    }
}

public class QuestionSix {
    public static void main(String[] args) {
        // Create student object.
        Student student = new Student();

        // Hardcoded values passed through method calls.
        student.setName("Mary Auma");
        student.setRegNumber("CP215/2025/001");
        student.setYearOfStudy(2);
        student.setGender("Female");

        // Display values using get methods.
        System.out.println("Name: " + student.getName());
        System.out.println("Reg Number: " + student.getRegNumber());
        System.out.println("Year of Study: " + student.getYearOfStudy());
        System.out.println("Gender: " + student.getGender());
    }
}
