#include <iostream>
using namespace std;

int main() {
    int a = 10;
    int* ptr = &a;
    cout << "Value of a: " << a << endl;
    cout << "Address of a: " << &a << endl;
    cout << "Value of ptr: " << ptr << endl;
    cout << "Value pointed by ptr: " << *ptr << endl;
    *ptr = 20;
    cout << "===============================" << endl;
    cout << "New value of a: " << a << endl;
    cout << "Value of ptr after modification: " << ptr << endl;
    cout << "Address of a: " << &a << endl;
    cout << "Value pointed by ptr: " << *ptr << endl;
}
