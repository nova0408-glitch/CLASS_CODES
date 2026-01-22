class Car {

    // display cost, of driving
    // Method overloading 
    // Change data types of parameters 
    // Change number parameters per function
    public void displayCost(int x){
        System.out.println("Int X, Was used.");
    }

    public void displayCost(float x){
        System.out.println("Float X, Was used.");

    }

    public void displayCost(double x){
        System.out.println("A double was passed.");
    }

    public void displayCost(String x){
        System.out.println("A string was passed");
    }

    // Overloading using different number of parameters
    public void displayCost(String x, float y){

    }

    public void displayCost(){

    }

   
}

public class Test {

    public static void main(String[] args){
        int num = 14;
        float numtwo = 20.45f;
        double numthree = 30.234;
        String word = "Yes";


        Car carOne = new Car();
        carOne.displayCost(word);
        carOne.displayCost(numthree);
        carOne.displayCost(numtwo);
        carOne.displayCost(num);
        carOne.displayCost();
    }
    
}
