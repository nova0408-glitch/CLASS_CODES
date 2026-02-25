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

Node* findMin(Node* root) {
    Node* cur = root;
    while (cur && cur->left_child) cur = cur->left_child;
    return cur;
}

Node* deleteBST(Node* root, int value) {
    if (!root) return nullptr;

    if (value < root->data) {
        root->left_child = deleteBST(root->left_child, value);
        return root;
    }
    if (value > root->data) {
        root->right_child = deleteBST(root->right_child, value);
        return root;
    }

    // Node found: 0-child case.
    if (!root->left_child && !root->right_child) {
        delete root;
        return nullptr;
    }

    // 1-child cases.
    if (!root->left_child) {
        Node* temp = root->right_child;
        delete root;
        return temp;
    }
    if (!root->right_child) {
        Node* temp = root->left_child;
        delete root;
        return temp;
    }

    // 2-child case: use inorder successor.
    Node* successor = findMin(root->right_child);
    root->data = successor->data;
    root->right_child = deleteBST(root->right_child, successor->data);
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
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int v : values) root = insertBST(root, v);

    cout << "Before delete: ";
    inorder(root);
    cout << "\n";

    cout << "Delete 30 (two-child case)\n";
    root = deleteBST(root, 30);

    cout << "After delete : ";
    inorder(root);
    cout << "\n";

    destroyTree(root);
    return 0;
}
