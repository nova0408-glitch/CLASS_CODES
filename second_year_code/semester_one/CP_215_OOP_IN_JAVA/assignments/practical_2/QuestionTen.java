import java.util.*;

public class QuestionTen {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        double total_miles, cost_gallon, average_miles_gallon, parking_fees, tolls;
        double driving_costs;
        double fuel_costs;

        System.out.println("ENTER THE COSTS FOR THE FOLLOWING: ");
        System.out.println("====================================");
        System.out.print("Total miles driven per day: \n");
        total_miles = input.nextDouble(); 

        System.out.print("Cost per gallon of gasoline: \n");
        cost_gallon = input.nextDouble();

        System.out.print("Average miles per gallon: \n");
        average_miles_gallon = input.nextDouble();

        System.out.print("Parking fees per day: \n");
        parking_fees = input.nextDouble();

        System.out.print("Tolls per day: \n");
        tolls = input.nextDouble();        

        double cost_mile = ((total_miles) / average_miles_gallon) * cost_gallon;

        driving_costs = cost_mile + parking_fees + tolls;

        double driving_costs_month = 30 * driving_costs;
        
        System.out.println("========================================");
        System.out.println("USER COST PER DAY:" + driving_costs_month);

        input.close();
        // Please cross-check the code
        
    }
    
}
