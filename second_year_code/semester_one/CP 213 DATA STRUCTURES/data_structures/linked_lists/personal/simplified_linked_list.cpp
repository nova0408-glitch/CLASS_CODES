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

    cout << "==== MEMORY ADDRESSES DISPLAY ====" << endl;
    cout << "Head Address:    " << head << endl;
    cout << "Node 1 Address:  "  << node1 << endl;
    cout << "Node 1 Link Field: " << node1->link << endl;
    cout << "Node 2 Address:  "  << node2 << endl;
    cout << "Node 2 Link Field: " << node2->link << endl;
    cout << "Node 3 Address:  "  << node3 << endl;
    cout << "Node 3 Link Field: " << node3->link << endl;

    // We can edit the name or values of the nodes as shown below
    // By traversing from the first node or using header
    // or by using the node if we know the name of the node
    node1->link->name = "Taddeo";
    node2->name = "Taddeo";

    // Insert Head
    // 1. Create the new Node
    // 2. Link NNew Node to the first Node
    // 3. Change the head, to point to the new Node

    Node* newNode = new Node{"T24-03-10555", "David", nullptr};
    newNode->link = head;
    head = newNode;

    cout << head->name << " -> " << head->link->name << " -> " << head->link->link->name << " -> " << head->link->link->link->name << endl;



    // Insert @ Tail
    // 1. Create the new Node
    // 2. Link the last node to the new Node

    Node* newNode2 =  new Node{"T24-03-10673", "Erick", nullptr};
    head->link->link->link->link = newNode2;

    cout << endl;
    cout << "==== AFTRER INSERTING AT TAIL ====" << endl;
    Node* current = head;
    int count = 1;
    while (current != nullptr){
        cout << count << ". " << current->reg_no << " " << current->name << endl;
        current = current->link;
        count++;
    }

    // Insert @Middle or within the linked list
    // 1. Create new Node
    // 2. Link the new Node to the next Node in the sequence
    // 3. Link the preceeding Node to the new Node

    Node* newNode3 = new Node{"T24-03-10200", "Kemmy", nullptr};
    // Linking Kemmy with Neema
    newNode3->link = head->link->link;
    // Linking James to Kemmy
    head->link->link = newNode3;

    cout << endl << endl;
    cout << "==== INSERTING IN THE MIDDLE ====" << endl;
    cout << "New list arrangement after adding Kemmy" << endl;
    current = head;
    count = 0;
    while (current != nullptr){
        cout << count << ". " << current->reg_no << " " << current->name << endl;
        current = current->link;
        count++;
    }

    // DELETING NODES FROM THE LINKED LISTS
    // Deleting Nodes @ HEAD
    // 1. Assign the head to a temporary pointer
    // 2. Link head to the second node
    // 3. Delete temporary pointer
    Node* temp = head;
    head = temp->link;
    delete temp;

    // Alternative , (if you know the exact name of the first node)
    // head = node1->link;
    // delete node1;

    cout << endl << endl;
    cout << "==== DELETING THE NODE @ HEAD ====" << endl;
    cout << "New list after deleting first Node" << endl;
    current = head;
    count = 1;
    while (current != nullptr){
        cout << count << ". " << current->reg_no << " " << current->name << endl;
        current = current->link;
        count++;
    }

    // Deleting Nodes @ TAIL
    // 1. Assign Last Node address to temp pointer
    // 2. Set Link field of the second last node to Null
    // 3. Delete the Final Node

    temp = head->link->link->link->link;
    head->link->link->link->link = nullptr;
    delete temp;

    cout << endl << endl;
    cout << "==== DELETING THE NODE @ TAIL ====" << endl;
    cout << "New list after deleting last Node" << endl;
    current = head;
    count = 1;
    while (current != nullptr){
        cout << count << ". " << current->reg_no << " " << current->name << endl;
        current = current->link;
        count++;
    }

    // Deleting Nodes @ MIDDLE
    // 1. Assign Node to delete to a temp pointer
    // 2. Set Link field of the the previous node to the node that follows after node to be deleted
    // 3. Delete the Final Node

    temp = head->link->link;
    head->link->link = temp->link;
    delete temp;

    cout << endl << endl;
    cout << "==== DELETING THE NODE @ MIDDLE ====" << endl;
    cout << "New list after deleting middle Node" << endl;
    current = head;
    count = 1;
    while (current != nullptr){
        cout << count << ". " << current->reg_no << " " << current->name << endl;
        current = current->link;
        count++;
    }

    return 0;
}
