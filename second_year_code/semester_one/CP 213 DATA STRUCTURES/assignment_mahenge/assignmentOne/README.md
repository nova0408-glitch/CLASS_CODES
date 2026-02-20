# Assignment One: Compiled Assignment - 2026

This folder contains complete C++ solutions for all 8 questions from `Compiled Assignment - 2026.pdf`.

## Files

- `q1_linked_list.cpp` - Linked list of five integer nodes + first three links shown.
- `q2_queue_char.cpp` - Queue of five character nodes + first three links shown.
- `q3_stack_string.cpp` - Stack of five string nodes + push/pop memory movement trace.
- `q4_binary_tree.cpp` - Binary tree of integers with branching + first left node creation trace.
- `q5_postorder_traversal.cpp` - Post-order tree traversal implementation.
- `q6_bubble_sort.cpp` - Bubble sort on array size 6 with swap-by-swap trace.
- `q7_quick_sort.cpp` - Quick sort on array size 6 with first partition trace.
- `q8_merge_sort.cpp` - Merge sort on array size 6 with first merge trace.
- `RAM_DIAGRAMS.md` - Step-by-step memory diagrams.
- `LINE_BY_LINE.md` - Detailed explanation for each source file.

## Build And Run

Use `g++` with C++17:

```bash
g++ -std=c++17 -Wall -Wextra -pedantic q1_linked_list.cpp -o q1 && ./q1
g++ -std=c++17 -Wall -Wextra -pedantic q2_queue_char.cpp -o q2 && ./q2
g++ -std=c++17 -Wall -Wextra -pedantic q3_stack_string.cpp -o q3 && ./q3
g++ -std=c++17 -Wall -Wextra -pedantic q4_binary_tree.cpp -o q4 && ./q4
g++ -std=c++17 -Wall -Wextra -pedantic q5_postorder_traversal.cpp -o q5 && ./q5
g++ -std=c++17 -Wall -Wextra -pedantic q6_bubble_sort.cpp -o q6 && ./q6
g++ -std=c++17 -Wall -Wextra -pedantic q7_quick_sort.cpp -o q7 && ./q7
g++ -std=c++17 -Wall -Wextra -pedantic q8_merge_sort.cpp -o q8 && ./q8
```

## Concepts Covered

1. Singly Linked List
- Each node stores `data` and a pointer `next` to the next node.
- Dynamic memory allocation is done with `new`.
- Memory is released with `delete` to avoid leaks.

2. Queue (FIFO)
- `front` removes first, `rear` inserts last.
- Linked nodes allow dynamic growth.

3. Stack (LIFO)
- `push` adds at top.
- `pop` removes from top.
- Top pointer always tracks the latest inserted node.

4. Binary Tree
- Each node has two links: `left` and `right`.
- Manual creation shows exactly where nodes live in RAM and how pointers connect.

5. Post-order Traversal
- Visit order: Left subtree -> Right subtree -> Root.
- Recursion uses the call stack to remember parent nodes.

6. Bubble Sort
- Repeated adjacent comparisons.
- Larger values "bubble" to the right each pass.

7. Quick Sort
- Partition around pivot.
- Left side <= pivot, right side > pivot.
- Recursively sort both sides.

8. Merge Sort (Question 8)
- The PDF says "Q-Sort" but asks to show "first merge".
- This matches **Merge Sort**, so this solution implements merge sort.

## Study Order Recommendation

1. Start with `q1`, `q2`, `q3` for pointer basics.
2. Move to `q4` and `q5` for tree structure and recursion.
3. Finish with `q6`, `q7`, `q8` for sorting logic and data movement.
4. Read `RAM_DIAGRAMS.md` after each program run.
5. Use `LINE_BY_LINE.md` while reading source code to understand every statement.
