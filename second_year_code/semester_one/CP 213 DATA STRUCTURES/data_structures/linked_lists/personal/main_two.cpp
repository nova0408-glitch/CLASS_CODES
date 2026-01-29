#include <iostream>
using namespace std;


struct Hostel {
    string hostelName;
    int roomNo;
};

struct student {
    int age;
    string phoneNumber;
    string regNo;
    Hostel hostel_details;
};


int main() {
    // create object of student 
    student student_one = student();

    // Access members using dot operator 
    student_one.age = 15;
    student_one.phoneNumber = "071353298";
    student_one.regNo = "t24-54";

    // Direct initialization of variables
    student student_two;
    student_two = {18, "07134536535", "t24-02"};

   // Nesting structs 
   string detail = student_one.hostel_details.hostelName = "Block 5";
   int x = student_one.hostel_details.roomNo = 10;

   cout << detail << endl;
   cout << x << endl;

   



    return 0;
}