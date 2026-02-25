#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left_child;
    Node* right_child;
};

Node* createNode(int value) {
    return new Node{value, nullptr, nullptr};
}

void inorder(Node* root) {
    if (!root) return;
    inorder(root->left_child);
    cout << root->data << " ";
    inorder(root->right_child);
}

void preorder(Node* root) {
    if (!root) return;
    cout << root->data << " ";
    preorder(root->left_child);
    preorder(root->right_child);
}

void postorder(Node* root) {
    if (!root) return;
    postorder(root->left_child);
    postorder(root->right_child);
    cout << root->data << " ";
}

void destroyTree(Node* root) {
    if (!root) return;
    destroyTree(root->left_child);
    destroyTree(root->right_child);
    delete root;
}

int main() {
    Node* root = createNode(50);
    root->left_child = createNode(30);
    root->right_child = createNode(70);
    root->left_child->left_child = createNode(20);
    root->left_child->right_child = createNode(40);
    root->right_child->left_child = createNode(60);
    root->right_child->right_child = createNode(80);

    cout << "Inorder   : ";
    inorder(root);
    cout << "\n";

    cout << "Preorder  : ";
    preorder(root);
    cout << "\n";

    cout << "Postorder : ";
    postorder(root);
    cout << "\n";

    destroyTree(root);
    return 0;
}
