#include<iostream>
using namespace std;

struct Node
{
    int data;
    Node* link;
};

int main() {

    Node* head = nullptr;
    Node* node1 = new Node{2, nullptr};
    Node* node2 = new Node{5, nullptr};
    Node* node3 = new Node{10, nullptr};
    Node* node4 = new Node{9, nullptr};

    head = node1;
    node1->link = node2;
    node2->link = node3;
    node3->link = node4;

    cout << head->data << " " << head->link->data << " " 
        << head->link->link->data << " " << head->link->link->link->data << " " 
        << endl;
    
    Node* newNode = new Node{90, nullptr};
      
    newNode->link = head->link->link;
    
    head->link->link = newNode;

    cout << head->data << " " << head->link->data << " " 
        << head->link->link->data << " " << head->link->link->link->data << " "
        << head->link->link->link->link->data 
        << endl;

    Node* temp = head->link->link->link->link;
    head->link->link->link->link = nullptr;
    delete temp;


    Node* trav = nullptr;
    trav = head;

    while (trav != nullptr){
        cout << trav->data << " " << endl;
        trav = trav->link;
    }


    return 0;
}
