class SavingsAccount {
    // Static variable shared by all savers.
    private static double annualInterestRate;

    // Instance variable for each saver's balance.
    private double savingsBalance;

    // Constructor to initialize savings balance.
    public SavingsAccount(double savingsBalance) {
        this.savingsBalance = savingsBalance;
    }

    // Calculate one month's interest and add it to the balance.
    public void calculateMonthlyInterest() {
        double monthlyInterest = (savingsBalance * annualInterestRate) / 12.0;
        savingsBalance = savingsBalance + monthlyInterest;
    }

    // Static method to change annual interest rate for all accounts.
    public static void modifyInterestRate(double newRate) {
        annualInterestRate = newRate;
    }

    // Getter for current savings balance.
    public double getSavingsBalance() {
        return savingsBalance;
    }
}

public class QuestionFive {
    public static void main(String[] args) {
        // Create two saver objects with given balances.
        SavingsAccount saver1 = new SavingsAccount(2000.00);
        SavingsAccount saver2 = new SavingsAccount(3000.00);

        // Set annual interest rate to 4%.
        SavingsAccount.modifyInterestRate(0.04);

        System.out.println("Balances for 12 months at 4% annual interest:");

        // Calculate and print balances for 12 months.
        for (int month = 1; month <= 12; month++) {
            saver1.calculateMonthlyInterest();
            saver2.calculateMonthlyInterest();

            System.out.printf("Month %d -> Saver1: %.2f, Saver2: %.2f%n",
                    month, saver1.getSavingsBalance(), saver2.getSavingsBalance());
        }

        // Set annual interest rate to 5% for next month.
        SavingsAccount.modifyInterestRate(0.05);
        saver1.calculateMonthlyInterest();
        saver2.calculateMonthlyInterest();

        System.out.println("\nAfter changing annual interest rate to 5% (next month):");
        System.out.printf("Saver1: %.2f%n", saver1.getSavingsBalance());
        System.out.printf("Saver2: %.2f%n", saver2.getSavingsBalance());
    }
}
