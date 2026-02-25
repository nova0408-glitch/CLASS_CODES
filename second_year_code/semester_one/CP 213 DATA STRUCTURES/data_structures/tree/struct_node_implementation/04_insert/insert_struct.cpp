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

Node* insertBST(Node* root, int value) {
    if (!root) return createNode(value);
    if (value < root->data) root->left_child = insertBST(root->left_child, value);
    else if (value > root->data) root->right_child = insertBST(root->right_child, value);
    return root;
}

void inorder(Node* root) {
    if (!root) return;
    inorder(root->left_child);
    cout << root->data << " ";
    inorder(root->right_child);
}

void destroyTree(Node* root) {
    if (!root) return;
    destroyTree(root->left_child);
    destroyTree(root->right_child);
    delete root;
}

int main() {
    Node* root = nullptr;

    cout << "Insert order: 50, 30, 70, 20, 40, 60, 80\n";
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : values) root = insertBST(root, v);

    cout << "Inorder after insertions: ";
    inorder(root);
    cout << "\n";

    destroyTree(root);
    return 0;
}
