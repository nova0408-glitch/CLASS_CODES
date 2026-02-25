#include <iostream>
using namespace std;

class BinaryTreeADT {
private:
    struct Node {
        int data;
        Node* left;
        Node* right;
        explicit Node(int v) : data(v), left(nullptr), right(nullptr) {}
    };

    Node* root;

    void inorder(Node* node) const {
        if (!node) return;
        inorder(node->left);
        cout << node->data << " ";
        inorder(node->right);
    }

    void preorder(Node* node) const {
        if (!node) return;
        cout << node->data << " ";
        preorder(node->left);
        preorder(node->right);
    }

    void postorder(Node* node) const {
        if (!node) return;
        postorder(node->left);
        postorder(node->right);
        cout << node->data << " ";
    }

    void clear(Node* node) {
        if (!node) return;
        clear(node->left);
        clear(node->right);
        delete node;
    }

public:
    BinaryTreeADT() : root(nullptr) {}

    ~BinaryTreeADT() { clear(root); }

    // Build a sample tree manually for traversal demo.
    void buildSample() {
        root = new Node(50);
        root->left = new Node(30);
        root->right = new Node(70);
        root->left->left = new Node(20);
        root->left->right = new Node(40);
        root->right->left = new Node(60);
        root->right->right = new Node(80);
    }

    void printInorder() const { inorder(root); cout << "\n"; }
    void printPreorder() const { preorder(root); cout << "\n"; }
    void printPostorder() const { postorder(root); cout << "\n"; }
};

int main() {
    BinaryTreeADT tree;
    tree.buildSample();

    cout << "Inorder   : ";
    tree.printInorder();

    cout << "Preorder  : ";
    tree.printPreorder();

    cout << "Postorder : ";
    tree.printPostorder();
    return 0;
}
