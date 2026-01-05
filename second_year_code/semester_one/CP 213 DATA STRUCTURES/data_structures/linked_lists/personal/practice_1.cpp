#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* link;
};


// Insert at head 
void insertAtHead(Node*& head, int value) {
    Node* newNode = new Node {value, head};
    head = newNode;
}

// Insert at tail 
void insertAttail(Node*& head, int value) {
    Node* newNode = new Node{value, nullptr};
    if (!head) {
        head = newNode;
        return;
    }

    Node* temp = head;
    

    while (temp->link != nullptr) {
        temp = temp->link;
    }

    temp->link = newNode;

}

// Delte head 
void deleteHead(Node*& head) {
    if(!head) return;
    Node* temp = head;
    head = head->link;
    delete temp;
}


// Delete tail 
void deleteTail(Node*& head) {
    if (!head) return;
    if (!head->link) {
        delete head;
        head == nullptr;
        return;
    }

    Node* temp = head;
    while (temp->link->link != nullptr) {
        temp = temp->link;
    }
    
    delete temp->link;
    temp->link = nullptr;
}

// Search for value 
bool search(Node* head, int value) {
    Node* temp = head;
    while(temp) {
        if (temp->data == value) return true;
        temp = temp->link;
    }

    return false;
}

// Print list 
void printList(Node* head) {
    Node* current = head;
    while(current != nullptr) {
        cout << current->data << " -> ";
        current = current->link;
    }

    cout << "NULL\n" << endl;
}

int main() {
    Node* head = nullptr;

    insertAtHead(head, 3);
    insertAtHead(head, 2);
    insertAttail(head, 5);

    printList(head);

    deleteHead(head);
    deleteTail(head);

    printList(head);

    cout << "Search 3: " << (search(head, 3) ? "Found\n" : "Not found\n");
    cout << "Search 4: " << (search(head, 4) ? "Found\n" : "Not found\n");

    return 0;
}