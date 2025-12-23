import java.util.*;

public class QuestionFive {
    
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        int product = 1; int sum = 0;
        int average;

        int nums[] = new int[3];

        for (int i = 0; i <= 2; i++) {
            System.out.printf("Enter number %d: ", i + 1);
            nums[i] = input.nextInt();            
        }

        for (int i = 0; i <= 2; i++){
            sum += nums[i];
            product *= nums[i];
        }

        
        average = sum / 3;

        int smallest = nums[0];
        int largest = nums[2];

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < smallest) {
                smallest = nums[i];
            
            }

            if (nums[i] > largest){
                largest = nums[i];
            }
            
        }


        System.out.println("==========================");
        System.out.printf("Sum: %d\n", sum);
        System.out.printf("Product: %d\n", product);
        System.out.printf("Average: %d\n", average);
        System.out.println("Smallest: " + smallest);
        System.out.println("Largest: " + largest);   


    }
}
