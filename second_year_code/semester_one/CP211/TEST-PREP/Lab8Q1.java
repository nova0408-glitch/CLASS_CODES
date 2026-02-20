public class Lab8Q1 {
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

    static class ExceptionC extends ExceptionB {
        ExceptionC(String message) {
            super(message);
        }
    }

    public static void main(String[] args) {
        try {
            throw new ExceptionB("Thrown ExceptionB");
        } catch (ExceptionA e) {
            System.out.println("Caught by catch(ExceptionA): " + e.getClass().getSimpleName());
        }

        try {
            throw new ExceptionC("Thrown ExceptionC");
        } catch (ExceptionA e) {
            System.out.println("Caught by catch(ExceptionA): " + e.getClass().getSimpleName());
        }
    }
}
