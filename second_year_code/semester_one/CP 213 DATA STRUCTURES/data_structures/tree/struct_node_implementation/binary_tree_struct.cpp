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
    if (root == nullptr) {
        return;
    }
    inorder(root->left_child);
    cout << root->data << " ";
    inorder(root->right_child);
}

void preorder(Node* root) {
    if (root == nullptr) {
        return;
    }
    cout << root->data << " ";
    preorder(root->left_child);
    preorder(root->right_child);
}

void postorder(Node* root) {
    if (root == nullptr) {
        return;
    }
    postorder(root->left_child);
    postorder(root->right_child);
    cout << root->data << " ";
}

bool searchBST(Node* root, int target) {
    if (root == nullptr) {
        return false;
    }
    if (root->data == target) {
        return true;
    }
    if (target < root->data) {
        return searchBST(root->left_child, target);
    }
    return searchBST(root->right_child, target);
}

Node* insertBST(Node* root, int value) {
    if (root == nullptr) {
        return createNode(value);
    }

    if (value < root->data) {
        root->left_child = insertBST(root->left_child, value);
    } else if (value > root->data) {
        root->right_child = insertBST(root->right_child, value);
    }
    // Duplicate values are ignored in this teaching example.
    return root;
}

Node* findMin(Node* root) {
    Node* current = root;
    while (current != nullptr && current->left_child != nullptr) {
        current = current->left_child;
    }
    return current;
}

Node* deleteBST(Node* root, int value) {
    if (root == nullptr) {
        return nullptr;
    }

    if (value < root->data) {
        root->left_child = deleteBST(root->left_child, value);
        return root;
    }
    if (value > root->data) {
        root->right_child = deleteBST(root->right_child, value);
        return root;
    }

    // Node found. Handle the three delete cases.
    if (root->left_child == nullptr && root->right_child == nullptr) {
        delete root;
        return nullptr;
    }
    if (root->left_child == nullptr) {
        Node* temp = root->right_child;
        delete root;
        return temp;
    }
    if (root->right_child == nullptr) {
        Node* temp = root->left_child;
        delete root;
        return temp;
    }

    Node* successor = findMin(root->right_child);
    root->data = successor->data;
    root->right_child = deleteBST(root->right_child, successor->data);
    return root;
}

int heightBST(Node* root) {
    if (root == nullptr) {
        return -1;  // Empty tree has height -1.
    }
    int leftHeight = heightBST(root->left_child);
    int rightHeight = heightBST(root->right_child);
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

void destroyTree(Node* root) {
    if (root == nullptr) {
        return;
    }
    destroyTree(root->left_child);
    destroyTree(root->right_child);
    delete root;
}

int main() {
    Node* root = nullptr;

    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int value : values) {
        root = insertBST(root, value);
    }

    cout << "Inorder   : ";
    inorder(root);
    cout << "\n";

    cout << "Preorder  : ";
    preorder(root);
    cout << "\n";

    cout << "Postorder : ";
    postorder(root);
    cout << "\n";

    cout << "Search 40 : " << (searchBST(root, 40) ? "found" : "not found") << "\n";
    cout << "Search 99 : " << (searchBST(root, 99) ? "found" : "not found") << "\n";
    cout << "Height    : " << heightBST(root) << "\n";

    cout << "Delete 70\n";
    root = deleteBST(root, 70);
    cout << "Inorder after delete: ";
    inorder(root);
    cout << "\n";

    destroyTree(root);
    return 0;
}

