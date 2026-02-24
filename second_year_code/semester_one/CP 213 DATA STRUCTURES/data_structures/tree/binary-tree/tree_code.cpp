#include <iostream>
using namespace std;

struct Node {
	int data;
	Node* left;
	Node* right;
};

// Preorder: Root -> Left ->Right
void preorder(Node* root) {
	if (root == nullptr)
		return;

	cout << root->data << " ";
	preorder(root->left);
	preorder(root->right);
}

// Inorder: left -> Root -> Right 
void inorder(Node* root) {
	if (root == nullptr)
		return;

	inorder(root->left);
	cout << root->data << " ";
	inorder(root->right);
}

// Postorder: Left -> Right -> Root
void postorder(Node* root) {
	if (root == nullptr)
		return;

	postorder(root->left);
	postorder(root->right);
	cout << root->data << " ";
}


int main() {

	//Create nodes
	Node* root = new Node{50, nullptr, nullptr};
	Node* n1 = new Node{30, nullptr, nullptr};
	Node* n2 = new Node{70, nullptr, nullptr};
	Node* n3 = new Node{20, nullptr, nullptr};
	Node* n4 = new Node{40, nullptr, nullptr};
	Node* n5 = new Node{60, nullptr, nullptr};
	Node* n6 = new Node{80, nullptr, nullptr};

	// Connect nodes
	root->left = n1;
	root->right = n2;

	n1->left = n3;
	n1->right = n4;

	n2->left = n5;
	n2->right = n6;


	//  Traversals
	cout << "Preorder: ";
	preorder(root);

	cout << "\nInorder: ";
	preorder(root);

	cout << "\nPostorder: ";
	postorder(root);


	return 0;

}

