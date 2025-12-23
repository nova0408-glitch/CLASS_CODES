import java.util.*;

public class QuestionNine {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        float BMI, weight_kg, height_metres;

        System.out.println("BMI CALCULATOR");
        System.out.println("-----------------");

        System.out.println("BMI VALUES: ");
        System.out.println("----------------");
        System.out.println("Underweight: less than 18.5");
        System.out.println("Normal: 18.5 and 24.9");
        System.out.println("Overweight: between 25 and 29.9");
        System.out.println("Obese: 30 or greater");
        System.out.println("===========================");

        System.out.println("Calculate your BMI Now!");
        System.out.print("ENTER WEIGHT IN KGs: ");
        weight_kg = input.nextFloat();

        System.out.print("ENTER HEIGHT IN M: ");
        height_metres = input.nextFloat();

        BMI = weight_kg / (height_metres * height_metres);

        System.out.println("==== RESULTS ========");
        System.out.print("Your BMI results..., \nBMI: " + BMI + "\n");

        input.close();

    }
    
}
