import java.io.IOException;

public class Lab8Q2 {
    static class ExceptionA extends Exception {
        ExceptionA(String message) {
            super(message);
        }
    }

    static class ExceptionB extends ExceptionA {
        ExceptionB(String message) {
            super(message);
        }
    }

    public static void main(String[] args) {
        try {
            throw new ExceptionA("Custom checked exception A");
        } catch (Exception e) {
            System.out.println("Caught as Exception: " + e.getClass().getSimpleName());
        }

        try {
            throw new ExceptionB("Custom checked exception B");
        } catch (Exception e) {
            System.out.println("Caught as Exception: " + e.getClass().getSimpleName());
        }

        try {
            throw new NullPointerException("NullPointerException demo");
        } catch (Exception e) {
            System.out.println("Caught as Exception: " + e.getClass().getSimpleName());
        }

        try {
            throw new IOException("IOException demo");
        } catch (Exception e) {
            System.out.println("Caught as Exception: " + e.getClass().getSimpleName());
        }
    }
}
