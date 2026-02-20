#include <iostream>
#include <string>

struct SNode {
    std::string data;
    SNode* next;

    SNode(const std::string& value) : data(value), next(nullptr) {}
};

class StringStack {
private:
    SNode* topPtr;

public:
    StringStack() : topPtr(nullptr) {}

    void push(const std::string& value) {
        SNode* newNode = new SNode(value);
        newNode->next = topPtr;
        topPtr = newNode;

        std::cout << "PUSH  -> \"" << value << "\""
                  << " | new top address: " << topPtr
                  << " | next points to: " << topPtr->next << "\n";
    }

    bool pop(std::string& removedValue) {
        if (topPtr == nullptr) {
            return false;
        }

        SNode* toDelete = topPtr;
        removedValue = toDelete->data;
        topPtr = topPtr->next;

        std::cout << "POP   -> \"" << removedValue << "\""
                  << " | removed node address: " << toDelete
                  << " | new top: " << topPtr << "\n";

        delete toDelete;
        return true;
    }

    void print() const {
        std::cout << "Stack values (top -> bottom): ";
        SNode* current = topPtr;
        while (current != nullptr) {
            std::cout << current->data;
            if (current->next != nullptr) {
                std::cout << " -> ";
            }
            current = current->next;
        }
        std::cout << "\n";
    }

    void clearSilently() {
        while (topPtr != nullptr) {
            SNode* toDelete = topPtr;
            topPtr = topPtr->next;
            delete toDelete;
        }
    }

    ~StringStack() {
        clearSilently();
    }
};

int main() {
    StringStack stack;

    std::string values[5] = {
        "Dodoma", "Survey", "Queue", "Stack", "Algorithms"
    };

    std::cout << "Building stack of five strings:\n";
    for (const std::string& value : values) {
        stack.push(value);
    }

    stack.print();

    std::cout << "\nNow pop two values to show memory movement:\n";
    std::string removed;
    stack.pop(removed);
    stack.pop(removed);

    stack.print();

    return 0;
}
