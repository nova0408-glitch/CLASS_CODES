# Struct Node: Introduction and Terminology

This style directly uses pointers with a plain struct:

```cpp
struct Node {
    int data;
    Node* left_child;
    Node* right_child;
};
```

- **Root**: starting node
- **Leaf**: node without children
- **Height**: longest root-to-leaf path (in edges)

Functions like `insertBST`, `searchBST`, `deleteBST` operate on `Node*`.
