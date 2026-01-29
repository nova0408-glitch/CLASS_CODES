#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* link;
};

// PROCESS OF ENQUEUE (We insert at the rear or tail)
void enqueue(Node*& front, Node*& rear, int value) {
    Node* n = new Node;
    n->data = value;
    n->link = nullptr;

    if (front == nullptr){
        front = rear = n;
    } else {
        rear->link = n;
        rear = n;
    }
}

// PROCESS OF DEQUEUE (We remove from the front)
bool dequeue(Node*& front, Node*& rear, int &outValue) {
    if (front == nullptr){
        return false; // empty queue
    }

    Node* temp = front;
    outValue = front->data;
    front = front->link;

    // If the queue has now become empty
    if (front == nullptr){
        rear = nullptr;
    }

    delete temp;
    return true;
}


// DISPLAY QUEUE
void display(Node* front){
    Node* current = front;
    cout << "Queue: ";
    while (current != nullptr) {
        cout << current->data << " ";
        current = current->link;
    }
    cout << "\n";
}

int main() {
    Node* front = nullptr;
    Node* rear = nullptr;
    int x;

    // enqueue operations
    enqueue(front, rear, 10);
    enqueue(front, rear, 20);
    enqueue(front, rear, 30);

    cout << "=== Queue after enqueue ===" << endl;
    display(front);

    // dequeu operations
    dequeue(front, rear, x);
    cout << "Dequeued: " << x << "\n";

    dequeue(front, rear, x);
    cout << "Dequeued: " << x << endl;

    cout << "===== Queue after dequeue ====" << endl;
    display(front);

    return 0;
}
