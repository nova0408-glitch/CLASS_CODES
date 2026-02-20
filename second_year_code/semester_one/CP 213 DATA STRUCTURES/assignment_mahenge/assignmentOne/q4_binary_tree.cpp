#include <iostream>

struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int value) : data(value), left(nullptr), right(nullptr) {}
};

void printInOrder(TreeNode* node) {
    if (node == nullptr) {
        return;
    }
    printInOrder(node->left);
    std::cout << node->data << " ";
    printInOrder(node->right);
}

void destroyTree(TreeNode* node) {
    if (node == nullptr) {
        return;
    }
    destroyTree(node->left);
    destroyTree(node->right);
    delete node;
}

int main() {
    // Create the root node.
    TreeNode* root = new TreeNode(50);

    // Create the first left-side node and attach it to root.
    TreeNode* firstLeft = new TreeNode(30);
    root->left = firstLeft;

    // Add one right-side node to make at least one branching level.
    root->right = new TreeNode(70);

    // Add children under the left node to show one more branching level.
    firstLeft->left = new TreeNode(20);
    firstLeft->right = new TreeNode(40);

    std::cout << "Binary tree created (in-order traversal): ";
    printInOrder(root);
    std::cout << "\n\n";

    std::cout << "How the first left-side node is created and gets data:\n";
    std::cout << "root address: " << root << ", root->data: " << root->data << "\n";
    std::cout << "firstLeft address: " << firstLeft
              << ", firstLeft->data: " << firstLeft->data << "\n";
    std::cout << "root->left now stores: " << root->left << " (points to firstLeft)\n";

    destroyTree(root);
    return 0;
}
