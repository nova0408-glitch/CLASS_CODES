#include<iostream>
using namespace std;



int main() {

    int a, b , c;

    a = 5;
    b = 10;
    c = 20;

    int arr[3] = {3, 5, 6}
;
    cout << "Address of A: " << &a << endl;
    cout << "Address of B: " << &b << endl;
    cout << "Address of C: " << &c << endl;

    cout << "Addresses of the Array Indexes" << endl;
    cout << "Address of index 0: "<<  &(arr[0]) << endl;
    cout << "Address of index 1: "<<  &(arr[1]) << endl;
    cout << "Address of index 2: "<< &(arr[2]) << endl;



    return 0;
}