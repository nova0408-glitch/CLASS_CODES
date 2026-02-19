import java.io.IOException;

// ExceptionA is a checked exception.
class ExceptionA extends Exception {
    public ExceptionA(String message) {
        super(message);
    }
}

// ExceptionB extends ExceptionA.
class ExceptionB extends ExceptionA {
    public ExceptionB(String message) {
        super(message);
    }
}

public class QuestionTwo {

    // Method that throws ExceptionA.
    public static void throwExceptionA() throws ExceptionA {
        throw new ExceptionA("ExceptionA was thrown.");
    }

    // Method that throws ExceptionB.
    public static void throwExceptionB() throws ExceptionB {
        throw new ExceptionB("ExceptionB was thrown.");
    }

    // Method that throws NullPointerException.
    public static void throwNullPointer() {
        throw new NullPointerException("NullPointerException was thrown.");
    }

    // Method that throws IOException.
    public static void throwIO() throws IOException {
        throw new IOException("IOException was thrown.");
    }

    public static void main(String[] args) {
        // Each try block catches using catch(Exception e).
        try {
            throwExceptionA();
        } catch (Exception e) {
            System.out.println("Caught with Exception: " + e);
        }

        try {
            throwExceptionB();
        } catch (Exception e) {
            System.out.println("Caught with Exception: " + e);
        }

        try {
            throwNullPointer();
        } catch (Exception e) {
            System.out.println("Caught with Exception: " + e);
        }

        try {
            throwIO();
        } catch (Exception e) {
            System.out.println("Caught with Exception: " + e);
        }
    }
}
