#include <iostream>
using namespace std;

struct Student {
    int age;
    string  name;
};


int main() {

    Student  student_one;
    Student student_two;

    Student* ptr = &student_one;
    
    ptr->age = 30;
    ptr->name = "James";

    cout << "Student Name: " << ptr->name << endl;
    cout << "Student Age: " << ptr->age << endl;



}