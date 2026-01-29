#include <iostream>
using namespace std;


struct Node {
    string reg_no;
    string name;
    Node* link;
};


int main() {

    Node* head = nullptr;

    // Create a linked list of three elements
    Node* node1 = new Node{"T24-03-10000", "James", nullptr};
    Node* node2 = new Node{"T24-03-10111", "Neema", nullptr};
    Node* node3 = new Node{"T24-03-10222", "Sarah", nullptr};

    // Linking the nodes
    node1->link = node2;
    node2->link = node3;

    // Point the header pointer to the  first node
    head = node1;



    return 0;
}
