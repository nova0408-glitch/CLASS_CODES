public class QuestionOne {
    public static void main(String[] args) {
        // Create two account objects.
        Account account1 = new Account("Alice", 500.0);
        Account account2 = new Account("Brian", 1200.0);

        // Show initial details.
        System.out.println(account1.getName() + " balance: " + account1.getBalance());
        System.out.println(account2.getName() + " balance: " + account2.getBalance());

        // Deposit sample amounts.
        account1.deposit(200.0);
        account2.deposit(300.0);

        // Show updated balances.
        System.out.println("After deposit:");
        System.out.println(account1.getName() + " balance: " + account1.getBalance());
        System.out.println(account2.getName() + " balance: " + account2.getBalance());
    }
}
