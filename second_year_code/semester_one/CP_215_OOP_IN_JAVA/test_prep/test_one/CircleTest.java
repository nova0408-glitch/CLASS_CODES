package test_one;

public class CircleTest {

    public static void main(String[] args) {

        // constructor without paramters call
        Circle circleOne = new Circle();
        circleOne.getRadius();

        // calling a constructor with single parameter
        float radius = 3.5f;
        Circle circleTwo = new Circle(radius);
        circleTwo.getRadius(); 

        System.out.println(circleTwo.condition);

    }    
}
