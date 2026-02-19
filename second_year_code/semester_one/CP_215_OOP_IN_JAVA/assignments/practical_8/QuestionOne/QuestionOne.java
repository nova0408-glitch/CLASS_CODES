// Custom parent exception class.
class ExceptionA extends Exception {
    public ExceptionA(String message) {
        super(message);
    }
}

// ExceptionB is a child of ExceptionA.
class ExceptionB extends ExceptionA {
    public ExceptionB(String message) {
        super(message);
    }
}

// ExceptionC is a child of ExceptionB.
class ExceptionC extends ExceptionB {
    public ExceptionC(String message) {
        super(message);
    }
}

public class QuestionOne {
    public static void main(String[] args) {
        // First test: throw ExceptionB and catch it using ExceptionA.
        try {
            throw new ExceptionB("This is ExceptionB.");
        } catch (ExceptionA e) {
            System.out.println("Caught by ExceptionA catch block: " + e.getMessage());
        }

        // Second test: throw ExceptionC and catch it using ExceptionA.
        try {
            throw new ExceptionC("This is ExceptionC.");
        } catch (ExceptionA e) {
            System.out.println("Caught by ExceptionA catch block: " + e.getMessage());
        }
    }
}
