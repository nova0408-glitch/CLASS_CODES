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

bool searchBST(Node* root, int target) {
    if (!root) return false;
    if (root->data == target) return true;
    if (target < root->data) return searchBST(root->left_child, target);
    return searchBST(root->right_child, target);
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

    cout << "Search 60: " << (searchBST(root, 60) ? "found" : "not found") << "\n";
    cout << "Search 25: " << (searchBST(root, 25) ? "found" : "not found") << "\n";

    destroyTree(root);
    return 0;
}
