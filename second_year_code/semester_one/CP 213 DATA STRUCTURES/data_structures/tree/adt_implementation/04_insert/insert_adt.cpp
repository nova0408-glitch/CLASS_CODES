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

    void inorder(Node* node) const {
        if (!node) return;
        inorder(node->left);
        cout << node->data << " ";
        inorder(node->right);
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

    void printInorder() const {
        inorder(root);
        cout << "\n";
    }
};

int main() {
    BST_ADT bst;

    cout << "Insert order: 50, 30, 70, 20, 40, 60, 80\n";
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : values) bst.insert(v);

    cout << "Inorder after insertions: ";
    bst.printInorder();
    return 0;
}
