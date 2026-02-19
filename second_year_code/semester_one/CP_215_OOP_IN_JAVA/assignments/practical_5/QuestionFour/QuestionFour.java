class Rectangle {
    // Instance variables with default values.
    private double length = 1.0;
    private double width = 1.0;

    // Setter for length with validation.
    public void setLength(double length) {
        if (length > 0.0 && length < 20.0) {
            this.length = length;
        } else {
            System.out.println("Length must be > 0.0 and < 20.0");
        }
    }

    // Setter for width with validation.
    public void setWidth(double width) {
        if (width > 0.0 && width < 20.0) {
            this.width = width;
        } else {
            System.out.println("Width must be > 0.0 and < 20.0");
        }
    }

    // Getter for length.
    public double getLength() {
        return length;
    }

    // Getter for width.
    public double getWidth() {
        return width;
    }

    // Method to calculate area.
    public double area() {
        return length * width;
    }

    // Method to calculate perimeter.
    public double perimeter() {
        return 2 * (length + width);
    }
}

public class QuestionFour {
    public static void main(String[] args) {
        // Create rectangle object.
        Rectangle rect = new Rectangle();

        // Set valid values.
        rect.setLength(8.5);
        rect.setWidth(4.0);

        // Display rectangle details.
        System.out.println("Length: " + rect.getLength());
        System.out.println("Width: " + rect.getWidth());
        System.out.println("Area: " + rect.area());
        System.out.println("Perimeter: " + rect.perimeter());
    }
}
