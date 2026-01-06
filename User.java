class Account {
    String name;
    int age;
    private double balance;


    public void view_balance(String name){
        this.name = name;
        System.out.println(this.name + this.balance);

    }

    public void set_name(String name){
        this.name = name;
    }

}

public class User {

    public static void main(String[] args) {
        
        Account muksini = new Account();
        
    }
    
}
