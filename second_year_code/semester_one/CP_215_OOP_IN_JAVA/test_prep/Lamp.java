class Light {


  private int lightMode;
  private int intensity;
  int mode;

  public static int size;

  public static String model;

  public static void test(){

  }

  public void run(){

  }

  // setters
  public void setLightMode(int x){
    this.lightMode = x;
  }

  // getter 
  public int getLightMode(int lightMode){
    return this.lightMode;
  }
}

public class Lamp {


  public static void main(String[] args) {

    Light.size = 3;
    Light.model = "Lamp Light";
    Light.test();
    
    Light lightOne = new Light();
    lightOne.run();

    lightOne.mode = 4;
    lightOne.setLightMode(4);
    
    
  }
}
