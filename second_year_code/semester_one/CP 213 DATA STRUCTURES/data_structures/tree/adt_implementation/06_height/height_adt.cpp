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

    int height(Node* node) const {
        if (!node) return -1; // empty tree height by edge-count definition
        int leftH = height(node->left);
        int rightH = height(node->right);
        return 1 + (leftH > rightH ? leftH : rightH);
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
    int height() const { return height(root); }
};

int main() {
    BST_ADT bst;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : values) bst.insert(v);

    cout << "Height of BST: " << bst.height() << "\n";
    return 0;
}
