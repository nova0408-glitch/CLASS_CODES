#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* link;
};

// PUSH FUNCTION STEPS ( the same as adding a node at the head)
// 1. Create the New Node
// 2. Link the New Node to the Top element
// 3. Change the value of Top to the new Node
void push(Node*& top, int value){
    Node* n = new Node();
    n->data = value;
    n->link = top;
    top = n;
}
// POP FUNCTION STEPS (check if empty or not first) - the same as
// deleting node at the head of the linked list
// 1. Save temporary address of the top
// 2. assign the outvalue of the top data to a variable
// 3. Delete the temporary address
// 4. Update the top value
bool pop(Node*& top, int &outValue){
    if (top == nullptr) {
        return false;
    }

    Node* temp = top;
    outValue = top->data;
    top = top->link;
    delete temp;
    return true;
}

// DISPLAY STACK
void display(Node* top) {
    Node* current = top;
    cout << "Stack: ";
    while (current != nullptr) {
        cout << current->data << " ";
        current = current->link;
    }
    cout << "\n";
}

int main() {
    Node* stack = nullptr; // empty stack
    int x;

    // push operations
    push(stack, 10);
    push(stack, 20);
    push(stack, 30);
    push(stack, 40);
    push(stack, 5);
    push(stack, 20);

    cout << "==== The Stack After Adding Nodes ====" << endl;
    display(stack);


    cout << endl << endl << "=== STACK pops ===" << endl;
    // pop operations
    pop(stack, x);
    cout << "Popped: " << x << "\n";

    pop(stack, x);
    cout << "Popped: " << x << "\n";
    cout << endl << "Stack Display: " << endl;
    display(stack);

    return 0;
}
