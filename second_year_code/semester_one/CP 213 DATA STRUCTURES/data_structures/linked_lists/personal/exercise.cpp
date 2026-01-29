#include <iostream>
using namespace std;

// A program that records student records


struct Hostel {
    int hostelName;
    int roomNo;
};

struct degreeProgramme {
    string name;
    int course_time;
};

struct student {
    int age;
    string name;
    string regNo;
    Hostel hostel_details;
    degreeProgramme program_details;
};


int main() {
    
    int n;
    cout << "Enter no. of Students: ";
    cin >> n;

    // create an array or student list of the type student
    student studentList[n];

    for (int i = 0; i < n; i++) {
        
        cout << "NAME: ";
        cin >> studentList[i].name;

        cout << "AGE: ";
        cin >> studentList[i].age; 

        cout << "REG NO. :";
        cin >> studentList[i].regNo;

        cout << "HOSTEL: ";
        cin >> studentList[i].hostel_details.hostelName;

        cout << "Room No.: ";
        cin >> studentList[i].hostel_details.roomNo;

        cout << "DEGREE PROGRAMME: ";
        cin >> studentList[i].program_details.name;

        cout << "COURSE TIME: ";
        cin >> studentList[i].program_details.course_time;

        cout << "\n\n====================================" << endl;

    }

    cout << endl << "=== DETAILS === " << endl;


    // Print the details of the entire array 

       for (int i = 0; i < n; i++) {
        
        cout << "NAME: ";
        cout << studentList[i].name << endl;

        cout << "AGE: ";
        cout << studentList[i].age << endl; 

        cout << "REG NO. :";
        cout << studentList[i].regNo << endl;

        cout << "HOSTEL: ";
        cout << studentList[i].hostel_details.hostelName << endl;

        cout << "Room No.: ";
        cout << studentList[i].hostel_details.roomNo << endl;

        cout << "DEGREE PROGRAMME: ";
        cout << studentList[i].program_details.name << endl;

        cout << "COURSE TIME: ";
        cout << studentList[i].program_details.course_time << endl;

        cout << "--------------------------------------" << endl;
    }


    return 0;
}