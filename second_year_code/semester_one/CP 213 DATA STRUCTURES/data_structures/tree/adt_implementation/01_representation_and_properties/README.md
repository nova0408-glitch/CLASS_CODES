# ADT: Representation and Properties

## Representation

This implementation uses linked nodes inside a class:

```cpp
struct Node {
    int data;
    Node* left;
    Node* right;
};
```

The tree has a private `root` pointer, and operations are class methods.

## Properties of Binary Trees

- A node has at most 2 children.
- Max nodes at level `L` is `2^L`.
- Max nodes in height `h` is `2^(h+1) - 1`.
- In a BST: left subtree values are smaller, right subtree values are larger.
