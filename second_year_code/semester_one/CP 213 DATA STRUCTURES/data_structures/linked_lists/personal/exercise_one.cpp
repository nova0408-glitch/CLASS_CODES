#include<iostream>
using namespace std;

struct Node {
    int data;
    Node* link;
};


// Insert at head
void insertAthead(Node*& head, int value) {

    Node* newNode = new Node();
    newNode->data = value;
    newNode->link = head;

    head = newNode;
}

// Insert at tail
void insertAtTail(Node* head, int value) {

    Node* newNode = new Node();

    newNode->data = value;
    newNode->link = nullptr;

    Node* temp = head;

    while (temp->link != nullptr) {
        temp = temp->link;
    }
    temp->link = newNode;    
}


