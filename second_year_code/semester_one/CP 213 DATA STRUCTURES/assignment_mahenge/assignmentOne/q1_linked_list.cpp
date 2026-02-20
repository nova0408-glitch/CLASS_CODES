#include <iostream>

struct Node {
    int data;
    Node* next;

    Node(int value) : data(value), next(nullptr) {}
};

void append(Node*& head, int value) {
    Node* newNode = new Node(value);

    if (head == nullptr) {
        head = newNode;
        return;
    }

    Node* current = head;
    while (current->next != nullptr) {
        current = current->next;
    }
    current->next = newNode;
}

void printList(Node* head) {
    std::cout << "Linked List values: ";
    Node* current = head;
    while (current != nullptr) {
        std::cout << current->data;
        if (current->next != nullptr) {
            std::cout << " -> ";
        }
        current = current->next;
    }
    std::cout << "\n";
}

void showFirstThreeLinks(Node* head) {
    std::cout << "\nHow the first three nodes are linked:\n";

    Node* first = head;
    Node* second = (first != nullptr) ? first->next : nullptr;
    Node* third = (second != nullptr) ? second->next : nullptr;

    std::cout << "first  node address: " << first
              << ", data: " << (first ? first->data : -1)
              << ", next: " << (first ? first->next : nullptr) << "\n";

    std::cout << "second node address: " << second
              << ", data: " << (second ? second->data : -1)
              << ", next: " << (second ? second->next : nullptr) << "\n";

    std::cout << "third  node address: " << third
              << ", data: " << (third ? third->data : -1)
              << ", next: " << (third ? third->next : nullptr) << "\n";
}

void destroyList(Node*& head) {
    while (head != nullptr) {
        Node* toDelete = head;
        head = head->next;
        delete toDelete;
    }
}

int main() {
    Node* head = nullptr;

    int values[5] = {10, 20, 30, 40, 50};
    for (int value : values) {
        append(head, value);
    }

    printList(head);
    showFirstThreeLinks(head);

    destroyList(head);
    return 0;
}
