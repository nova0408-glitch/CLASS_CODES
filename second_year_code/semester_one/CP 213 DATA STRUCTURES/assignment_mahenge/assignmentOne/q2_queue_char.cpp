#include <iostream>

struct QNode {
    char data;
    QNode* next;

    QNode(char value) : data(value), next(nullptr) {}
};

class CharQueue {
private:
    QNode* frontPtr;
    QNode* rearPtr;

public:
    CharQueue() : frontPtr(nullptr), rearPtr(nullptr) {}

    void enqueue(char value) {
        QNode* newNode = new QNode(value);

        if (rearPtr == nullptr) {
            frontPtr = rearPtr = newNode;
            return;
        }

        rearPtr->next = newNode;
        rearPtr = newNode;
    }

    bool dequeue() {
        if (frontPtr == nullptr) {
            return false;
        }

        QNode* toDelete = frontPtr;
        frontPtr = frontPtr->next;

        if (frontPtr == nullptr) {
            rearPtr = nullptr;
        }

        delete toDelete;
        return true;
    }

    void print() const {
        std::cout << "Queue values (front -> rear): ";
        QNode* current = frontPtr;
        while (current != nullptr) {
            std::cout << current->data;
            if (current->next != nullptr) {
                std::cout << " -> ";
            }
            current = current->next;
        }
        std::cout << "\n";
    }

    void showFirstThreeBuildAndLinks() const {
        std::cout << "\nHow the first three queue nodes are built and linked:\n";

        QNode* first = frontPtr;
        QNode* second = (first != nullptr) ? first->next : nullptr;
        QNode* third = (second != nullptr) ? second->next : nullptr;

        std::cout << "first  node address: " << first
                  << ", data: " << (first ? first->data : '-')
                  << ", next: " << (first ? first->next : nullptr) << "\n";

        std::cout << "second node address: " << second
                  << ", data: " << (second ? second->data : '-')
                  << ", next: " << (second ? second->next : nullptr) << "\n";

        std::cout << "third  node address: " << third
                  << ", data: " << (third ? third->data : '-')
                  << ", next: " << (third ? third->next : nullptr) << "\n";
    }

    ~CharQueue() {
        while (dequeue()) {
            // Keep deleting until queue is empty.
        }
    }
};

int main() {
    CharQueue queue;

    char values[5] = {'A', 'B', 'C', 'D', 'E'};
    for (char c : values) {
        queue.enqueue(c);
    }

    queue.print();
    queue.showFirstThreeBuildAndLinks();

    return 0;
}
