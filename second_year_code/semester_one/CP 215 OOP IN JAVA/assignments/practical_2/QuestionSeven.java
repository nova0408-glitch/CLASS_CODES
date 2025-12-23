import java.util.*;

public class QuestionSeven {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        double radius, diameter, circumference, area;

        System.out.print("Enter radius: ");
        radius = input.nextDouble();


        diameter = radius * 2;
        circumference = 2 * Math.PI * radius;
        area = Math.PI * Math.pow(radius, 2);

        System.out.println("==============================");
        System.out.printf("Diameter = %.2f%n", diameter);
        System.out.printf("Circumference = %.2f%n", circumference);
        System.out.printf("Area = %.2f%n", area);
        
    }
    
}
