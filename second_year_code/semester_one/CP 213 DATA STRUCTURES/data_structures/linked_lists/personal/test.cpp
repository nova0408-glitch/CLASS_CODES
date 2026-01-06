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


    // Creating a linked list with Nodes 
    Node* first_node = new Node();
    Node* second_node = new Node();
    Node* third_node = new Node();

    first_node->data = 5;
    second_node->data = 10;
    third_node->data = 30;

    Node* head = first_node;

    first_node->next = second_node;
    second_node->next = third_node;
    third_node->next = nullptr;


    cout << third_node->next << endl;




    return 0;
}