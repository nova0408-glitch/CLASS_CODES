# Struct Node: Representation and Properties

## Representation

Linked representation:
- each node stores data and two child pointers
- missing child is `nullptr`

## Binary Tree Properties

- At most 2 children per node
- Max nodes at level `L` is `2^L`
- Max nodes with height `h` is `2^(h+1) - 1`

## BST Property

- left subtree values < current node value
- right subtree values > current node value
