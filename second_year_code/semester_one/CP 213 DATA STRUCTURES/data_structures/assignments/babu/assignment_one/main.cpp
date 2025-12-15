#include <iostream>
using namespace std;

struct employee {
    int age;
    float worktime;
    char gender;
    string department;
    double salary;

};

int main() {
    employee emp;

    
    emp.age = 29;
    emp.worktime = 40.5;
    emp.gender = 'M';
    emp.department = "IT";
    emp.salary = 14000000.00;

    cout << "Employee Details\n";
    cout << "Age: " << emp.age << " years\n";
    cout << "Work Time: " << emp.worktime << " hourse/weel\n";
    cout << "Gender: " << emp.gender << endl;
    cout << "Department: " << emp.department << endl;
    cout << "Salary: TZS" << emp.salary << endl;

    
    if (emp.worktime > 40) {
        cout << "Status: Eligible for overtime consideration\n";

    }

    return 0;
}