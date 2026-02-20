public class Lab8Q7 {
    static void propagator1() {
        int x = 10 / 0;
        System.out.println(x);
    }

    static void propagator2() {
        try {
            propagator1();
        } catch (ArithmeticException e) {
            System.out.println("propagator2 caught exception, rethrowing...");
            throw e;
        }
    }

    public static void main(String[] args) {
        try {
            propagator2();
        } catch (ArithmeticException e) {
            System.out.println("main handled propagated exception:");
            e.printStackTrace();
        }
    }
}
