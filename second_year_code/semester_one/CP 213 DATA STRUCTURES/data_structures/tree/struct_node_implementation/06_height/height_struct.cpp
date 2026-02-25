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

int heightBST(Node* root) {
    if (!root) return -1; // Empty tree has height -1.
    int leftH = heightBST(root->left_child);
    int rightH = heightBST(root->right_child);
    return 1 + (leftH > rightH ? leftH : rightH);
}

void destroyTree(Node* root) {
    if (!root) return;
    destroyTree(root->left_child);
    destroyTree(root->right_child);
    delete root;
}

int main() {
    Node* root = nullptr;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : values) root = insertBST(root, v);

    cout << "Height of BST: " << heightBST(root) << "\n";

    destroyTree(root);
    return 0;
}
