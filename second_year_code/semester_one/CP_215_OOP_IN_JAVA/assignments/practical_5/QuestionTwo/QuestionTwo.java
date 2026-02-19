class Account {
    // Instance variables for account holder name and balance.
    private String name;
    private double balance;

    // Constructor to initialize account details.
    public Account(String name, double balance) {
        this.name = name;

        // Prevent negative starting balance.
        if (balance > 0) {
            this.balance = balance;
        } else {
            this.balance = 0.0;
        }
    }

    // Getter for name.
    public String getName() {
        return name;
    }

    // Method to deposit money.
    public void deposit(double amount) {
        if (amount > 0) {
            balance = balance + amount;
        }
    }

    // Method to withdraw money with validation.
    public void withdraw(double amount) {
        if (amount <= balance) {
            balance = balance - amount;
        } else {
            System.out.println("Withdrawal amount exceeded account balance.");
        }
    }

    // Getter for balance.
    public double getBalance() {
        return balance;
    }
}

public class QuestionTwo {
    public static void main(String[] args) {
        // Create account object.
        Account account = new Account("Charles", 1000.0);

        // Show current balance.
        System.out.println("Initial balance: " + account.getBalance());

        // Test valid withdrawal.
        account.withdraw(300.0);
        System.out.println("Balance after withdrawing 300: " + account.getBalance());

        // Test invalid withdrawal.
        account.withdraw(1000.0);
        System.out.println("Balance after invalid withdrawal: " + account.getBalance());
    }
}
