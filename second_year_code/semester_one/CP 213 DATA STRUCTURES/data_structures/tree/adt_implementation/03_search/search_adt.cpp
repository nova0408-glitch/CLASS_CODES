#include <iostream>
using namespace std;

class BST_ADT {
private:
    struct Node {
        int data;
        Node* left;
        Node* right;
        explicit Node(int v) : data(v), left(nullptr), right(nullptr) {}
    };

    Node* root;

    Node* insert(Node* node, int value) {
        if (!node) return new Node(value);
        if (value < node->data) node->left = insert(node->left, value);
        else if (value > node->data) node->right = insert(node->right, value);
        return node;
    }

    bool search(Node* node, int target) const {
        if (!node) return false;
        if (node->data == target) return true;
        if (target < node->data) return search(node->left, target);
        return search(node->right, target);
    }

    void clear(Node* node) {
        if (!node) return;
        clear(node->left);
        clear(node->right);
        delete node;
    }

public:
    BST_ADT() : root(nullptr) {}
    ~BST_ADT() { clear(root); }

    void insert(int value) { root = insert(root, value); }
    bool search(int target) const { return search(root, target); }
};

int main() {
    BST_ADT bst;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : values) bst.insert(v);

    cout << "Search 60: " << (bst.search(60) ? "found" : "not found") << "\n";
    cout << "Search 25: " << (bst.search(25) ? "found" : "not found") << "\n";
    return 0;
}
