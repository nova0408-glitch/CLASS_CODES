#include <iostream>
using namespace std;

class BinarySearchTreeADT {
private:
    struct Node {
        int data;
        Node* left;
        Node* right;

        explicit Node(int value) : data(value), left(nullptr), right(nullptr) {}
    };

    Node* root;

    Node* insert(Node* node, int value) {
        if (node == nullptr) {
            return new Node(value);
        }

        if (value < node->data) {
            node->left = insert(node->left, value);
        } else if (value > node->data) {
            node->right = insert(node->right, value);
        }
        // Duplicate values are ignored to keep the example simple.
        return node;
    }

    bool search(Node* node, int value) const {
        if (node == nullptr) {
            return false;
        }
        if (node->data == value) {
            return true;
        }
        if (value < node->data) {
            return search(node->left, value);
        }
        return search(node->right, value);
    }

    Node* findMin(Node* node) const {
        while (node != nullptr && node->left != nullptr) {
            node = node->left;
        }
        return node;
    }

    Node* remove(Node* node, int value) {
        if (node == nullptr) {
            return nullptr;
        }

        if (value < node->data) {
            node->left = remove(node->left, value);
            return node;
        }
        if (value > node->data) {
            node->right = remove(node->right, value);
            return node;
        }

        // Node found: now handle the three delete cases.
        if (node->left == nullptr && node->right == nullptr) {
            delete node;
            return nullptr;
        }
        if (node->left == nullptr) {
            Node* temp = node->right;
            delete node;
            return temp;
        }
        if (node->right == nullptr) {
            Node* temp = node->left;
            delete node;
            return temp;
        }

        // Two-child case: replace with inorder successor.
        Node* successor = findMin(node->right);
        node->data = successor->data;
        node->right = remove(node->right, successor->data);
        return node;
    }

    int height(Node* node) const {
        if (node == nullptr) {
            return -1;  // Empty tree has height -1 (edge-count definition).
        }
        int leftHeight = height(node->left);
        int rightHeight = height(node->right);
        return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
    }

    void inorder(Node* node) const {
        if (node == nullptr) {
            return;
        }
        inorder(node->left);
        cout << node->data << " ";
        inorder(node->right);
    }

    void preorder(Node* node) const {
        if (node == nullptr) {
            return;
        }
        cout << node->data << " ";
        preorder(node->left);
        preorder(node->right);
    }

    void postorder(Node* node) const {
        if (node == nullptr) {
            return;
        }
        postorder(node->left);
        postorder(node->right);
        cout << node->data << " ";
    }

    void clear(Node* node) {
        if (node == nullptr) {
            return;
        }
        clear(node->left);
        clear(node->right);
        delete node;
    }

public:
    BinarySearchTreeADT() : root(nullptr) {}

    ~BinarySearchTreeADT() {
        clear(root);
    }

    void insert(int value) {
        root = insert(root, value);
    }

    bool search(int value) const {
        return search(root, value);
    }

    void remove(int value) {
        root = remove(root, value);
    }

    int height() const {
        return height(root);
    }

    void printInorder() const {
        inorder(root);
        cout << "\n";
    }

    void printPreorder() const {
        preorder(root);
        cout << "\n";
    }

    void printPostorder() const {
        postorder(root);
        cout << "\n";
    }
};

int main() {
    BinarySearchTreeADT bst;

    // Same sample values used in many BST examples.
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int value : values) {
        bst.insert(value);
    }

    cout << "Inorder   : ";
    bst.printInorder();

    cout << "Preorder  : ";
    bst.printPreorder();

    cout << "Postorder : ";
    bst.printPostorder();

    cout << "Search 60 : " << (bst.search(60) ? "found" : "not found") << "\n";
    cout << "Search 25 : " << (bst.search(25) ? "found" : "not found") << "\n";
    cout << "Height    : " << bst.height() << "\n";

    cout << "Delete 30 (node with two children)\n";
    bst.remove(30);

    cout << "Inorder after delete: ";
    bst.printInorder();

    return 0;
}

