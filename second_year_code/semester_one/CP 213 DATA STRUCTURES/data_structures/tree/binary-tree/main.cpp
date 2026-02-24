#include <iostream>
using namespace std;

// Define structure 

struct Node {
	int data;
	Node* left;
	Node* right;
};

int main() {

	// Create nodes manually 
	Node* root = new Node{10, nullptr, nullptr};

	Node* node2 = new Node{20, nullptr, nullptr};

	Node* node3 = new Node{30, nullptr, nullptr};

	// Connect the nodes
	root->left = node2;
	root->right = node3;

	// Level 3 
	Node* node4 = new Node{20, nullptr, nullptr};
	Node* node5 = new Node{30, nullptr, nullptr}

	node2->left =  node4;
	node2->right = node5;
	
	// Display values 
	cout << "Root: " << root->data << endl;
	cout << "Left Child: " << root->left->data << endl;
	cout << "Right Child: " << root->right->data << endl;

	return 0;
}
