interface Language {
    
    final int num = 10;

    public void play();
    public void displayInfo(String country);

}


class Swahili implements Language {
    
    @Override
    public void play(){
        System.out.println("We play Swahili");

    }

    @Override
    public void displayInfo(String country){
        System.out.printf("%s speak Swahili a lot from there", country);
    }

    public void info(){

    }
}

public class Test {
    
}
