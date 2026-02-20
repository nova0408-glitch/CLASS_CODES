#include <iostream>
#include <vector>

struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int value) : data(value), left(nullptr), right(nullptr) {}
};

void postOrder(TreeNode* node, std::vector<int>& order) {
    if (node == nullptr) {
        return;
    }

    postOrder(node->left, order);
    postOrder(node->right, order);
    order.push_back(node->data);
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
    // Build a small binary tree:
    // root 10; left subtree (5 with children 2 and 7);
    // right subtree (15 with children 12 and 20).
    TreeNode* root = new TreeNode(10);
    root->left = new TreeNode(5);
    root->right = new TreeNode(15);
    root->left->left = new TreeNode(2);
    root->left->right = new TreeNode(7);
    root->right->left = new TreeNode(12);
    root->right->right = new TreeNode(20);

    std::vector<int> traversalOrder;
    postOrder(root, traversalOrder);

    std::cout << "Post-order traversal (Left, Right, Root): ";
    for (std::size_t i = 0; i < traversalOrder.size(); ++i) {
        std::cout << traversalOrder[i];
        if (i + 1 < traversalOrder.size()) {
            std::cout << " -> ";
        }
    }
    std::cout << "\n";

    destroyTree(root);
    return 0;
}
