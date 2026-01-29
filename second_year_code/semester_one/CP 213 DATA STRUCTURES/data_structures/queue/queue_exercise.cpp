#include <iostream>
using namespace std;

struct Student {
    int id;
    string name;
    double fees;
    Student* link;
};

// PROCESS OF ENQUEUE (We insert at the rear or tail)
void enqueue(Student*& front, Student*& rear, int id, string name, double fees) {
    Student* n = new Student;
    n->id = id;
    n->name = name;
    n->fees = fees;
    n->link = nullptr;

    if (front == nullptr){
        front = rear = n;
    } else {
        rear->link = n;
        rear = n;
    }
}

// PROCESS OF DEQUEUE (We remove from the front)
bool dequeue(Student*& front, Student*& rear, int& id, string& name, double& fees) {
    if (front == nullptr){
        return false; // empty queue
    }

    Student* temp = front;
    id = temp->id;
    name = temp->name;
    fees = temp->fees;
    front = front->link;

    // If the queue has now become empty
    if (front == nullptr){
        rear = nullptr;
    }

    delete temp;
    return true;
}


// DISPLAY QUEUE
void display(Student* front){
    Student* current = front;
    cout << "Queue: "<< endl;
    while (current != nullptr) {
        cout << current->id << ". ";
        cout << current->name << " ";
        cout << current->fees << endl;
        current = current->link;
    }
    cout << "\n";
}

int main() {
    Student* front = nullptr;
    Student* rear = nullptr;
    int id;
    string name;
    double fees;

    // enqueue operations
    enqueue(front, rear, 10, "Chanuo", 1000);
    enqueue(front, rear, 20, "Glory", 2000);
    enqueue(front, rear, 30, "Stella", 3000);

    cout << "=== Queue after enqueue ===" << endl;
    display(front);

    // dequeu operations
    dequeue(front, rear, id, name, fees);
    cout << "Dequeued: " << id << ". " << name << " " << fees << "\n";

    dequeue(front, rear, id, name, fees);
    cout << "Dequeued: " << id << ". " << name << " " << fees << endl;

    cout << "===== Queue after dequeue ====" << endl;
    display(front);

    return 0;
}
