package test_one;
class Circle {
    private float radius;
    boolean condition;

    public Circle(float radius){
        this.radius = radius;
    }
    
    public Circle(int diameter){
        this.radius = diameter / 2;
    }

    public Circle(){
        this.radius = 5;
    }

    public void getRadius(){
        System.out.println("Radius: "+ this.radius);
    }
    
}
