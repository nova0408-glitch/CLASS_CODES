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

    Node* findMin(Node* node) const {
        while (node && node->left) node = node->left;
        return node;
    }

    Node* remove(Node* node, int value) {
        if (!node) return nullptr;

        if (value < node->data) {
            node->left = remove(node->left, value);
            return node;
        }
        if (value > node->data) {
            node->right = remove(node->right, value);
            return node;
        }

        // Case 1: no child
        if (!node->left && !node->right) {
            delete node;
            return nullptr;
        }

        // Case 2: one child
        if (!node->left) {
            Node* temp = node->right;
            delete node;
            return temp;
        }
        if (!node->right) {
            Node* temp = node->left;
            delete node;
            return temp;
        }

        // Case 3: two children (replace with inorder successor)
        Node* successor = findMin(node->right);
        node->data = successor->data;
        node->right = remove(node->right, successor->data);
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
    void remove(int value) { root = remove(root, value); }

    void printInorder() const {
        inorder(root);
        cout << "\n";
    }
};

int main() {
    BST_ADT bst;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : values) bst.insert(v);

    cout << "Before delete: ";
    bst.printInorder();

    cout << "Delete 30 (two-child case)\n";
    bst.remove(30);

    cout << "After delete : ";
    bst.printInorder();
    return 0;
}
