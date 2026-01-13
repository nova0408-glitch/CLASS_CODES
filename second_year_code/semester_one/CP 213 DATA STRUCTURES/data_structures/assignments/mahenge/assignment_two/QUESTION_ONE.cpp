#include<iostream>
using namespace std;

struct Student {
    string username;
    int password;
    Student* link;
};

int main() {

    Student* head = nullptr;

    // Constructing the nodes
    Student* student1 = new Student{ "kabeyo", 1234, nullptr};
    Student* student2 = new Student{ "tadeyo", 4563, nullptr};
    Student* student3 = new Student{ "rombo", 4593, nullptr};
    Student* student4 = new Student{ "takila", 3259, nullptr};
    Student* student5 = new Student{ "nayola", 4302, nullptr};
    Student* student6 = new Student{ "keddy", 5003, nullptr};
    Student* student7 = new Student{ "dalson", 3004, nullptr};
    Student* student8 = new Student{ "olkot", 2003, nullptr};
    Student* student9 = new Student{ "marino", 4005, nullptr};
    Student* student10 = new Student{"naya", 4560 , nullptr};
    // Linking the nodes
    student1->link = student2;
    student2->link = student3;
    student3->link = student4;
    student4->link = student5;
    student5->link = student6;
    student6->link = student7;
    student7->link = student8;
    student8->link = student9;
    student9->link = student10;

    // Defining head
    head = student1;

    // Temporary pointer for traversing
    Student* traversing = head;

    int i = 0;
    cout << "===== STUDENT USERNAMES AND PASSOWRDS ========" << endl;    
    while (traversing != nullptr) {
        cout << (i + 1) << ": ";
        cout << "Username: " << traversing->username << endl;
        cout << "   Password: " << traversing->password << endl;
        cout << "----------------------------" << endl;
        traversing = traversing->link;
        i+=1;
    }
    

    return 0;
  
}