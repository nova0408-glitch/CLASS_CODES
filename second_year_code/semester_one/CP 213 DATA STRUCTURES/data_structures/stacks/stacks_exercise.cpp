#include <iostream>
using namespace std;

struct Node {
    string name;
    int id;
    Node* link;
};

// PUSH FUNCTION STEPS ( the same as adding a node at the head)
// 1. Create the New Node
// 2. Link the New Node to the Top element
// 3. Change the value of Top to the new Node
void push(Node*& top, int input_id, string input_name){
    Node* n = new Node();
    n->id = input_id;
    n->name = input_name;
    n->link = top;
    top = n;
}
// POP FUNCTION STEPS (check if empty or not first) - the same as
// deleting node at the head of the linked list
// 1. Save temporary address of the top
// 2. assign the outvalue of the top data to a variable
// 3. Delete the temporary address
// 4. Update the top value
bool pop(Node*& top, int &outid, string &outname){
    if (top == nullptr) {
        return false;
    }

    Node* temp = top;
    outid = top->id;
    outname = top->name;
    top = top->link;
    delete temp;
    return true;
}

// DISPLAY STACK
void display(Node* top) {
    Node* current = top;
    cout << "Student Stack: " << endl;
    while (current != nullptr) {
        cout << current->id << ". " << current->name << " " << endl;
        current = current->link;
    }
    cout << "\n";
}

int main() {
    Node* stack = nullptr; // empty stack
    int id;
    string name;


    // push operations
    push(stack, 1, "James");
    push(stack, 2, "Neema");
    push(stack, 3, "John");
    push(stack, 4, "Alice");
    push(stack, 5, "Bob");
    push(stack, 2, "Charlie");

    cout << "==== The Stack After Adding Nodes ====" << endl;
    display(stack);


    cout << endl << endl << "=== STACK pops ===" << endl;
    // pop operations
    pop(stack, id, name);
    cout << "Popped: " << id << ". " << name << "\n";

    pop(stack, id, name);
    cout << "Popped: " << id << ". " << name << "\n";
    cout << endl << "Stack Display: " << endl;
    display(stack);

    return 0;
}
