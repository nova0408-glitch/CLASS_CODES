#include<iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

int main() {

    Node* newNode = new Node();

    newNode->data = 5;
    newNode->next = newNode;

    cout << "Address of the new Node: " << newNode << endl;
    cout << "Data inside the Address: " <<  newNode->data << endl;
    cout << "Content inside the next field: " << newNode->next << endl;


    // Creating a linked list with Nodes 
    Node* first_node = new Node();
    Node* second_node = new Node();
    Node* third_node = new Node();

    first_node->data = 5;
    second_node->data = 10;
    third_node->data = 30;

    first_node->next = second_node;
    second_node->next = third_node;
    third_node->next = nullptr;


    cout << first_node->data << " -> " << (*second_node).data << " -> " << third_node->data << endl;
    cout << "===========================" << endl;
    cout << "First Node Address: " << first_node << endl;
    cout << "First Node Next Value:" << first_node->next << endl << endl;
    cout << "Second Node Address: " << second_node << endl;
    cout << "Second Node Next Value: " << second_node->next << endl << endl;
    cout << "Third Node Address: " << third_node << endl;
    cout << "Third Node Next Value: " << third_node->next << endl;



    return 0;
}