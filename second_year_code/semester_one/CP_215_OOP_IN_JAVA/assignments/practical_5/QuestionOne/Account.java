public class Account {
    // Instance variables for account holder name and balance.
    private String name;
    private double balance;

    // Constructor to initialize instance variables.
    public Account(String name, double balance) {
        this.name = name;

        // Balance should not start as negative.
        if (balance > 0) {
            this.balance = balance;
        } else {
            this.balance = 0.0;
        }
    }

    // Setter for name.
    public void setName(String name) {
        this.name = name;
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

    // Getter for current balance.
    public double getBalance() {
        return balance;
    }
}
