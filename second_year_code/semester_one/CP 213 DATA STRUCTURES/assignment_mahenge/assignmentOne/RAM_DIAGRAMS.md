# RAM Diagrams - Assignment One

The addresses below (`0x100`, `0x120`, etc.) are example addresses used for learning. Real addresses change every run.

## Q1: Linked List (First Three Nodes)

After inserting `10, 20, 30, 40, 50`:

```text
head
 |
 v
0x100: [data=10 | next=0x120] ---> 0x120: [data=20 | next=0x140] ---> 0x140: [data=30 | next=0x160] ---> ...
```

Memory idea:
- `head` stores address `0x100`.
- Node at `0x100` points to node at `0x120`.
- Node at `0x120` points to node at `0x140`.

## Q2: Queue (First Three Nodes)

After enqueue `A, B, C, D, E`:

```text
frontPtr                                              rearPtr
   |                                                     |
   v                                                     v
0x200: [A | next=0x220] -> 0x220: [B | next=0x240] -> 0x240: [C | next=0x260] -> ... -> [E | next=null]
```

Memory idea:
- `frontPtr` points to oldest element (`A`).
- `rearPtr` points to newest element (`E`).
- Links move forward in insertion order.

## Q3: Stack Push/Pop Movement

### After pushes: `Dodoma`, `Survey`, `Queue`, `Stack`, `Algorithms`

```text
topPtr
  |
  v
0x350: ["Algorithms" | next=0x330]
0x330: ["Stack"      | next=0x310]
0x310: ["Queue"      | next=0x2F0]
0x2F0: ["Survey"     | next=0x2D0]
0x2D0: ["Dodoma"     | next=null ]
```

### First pop

```text
remove node 0x350
new topPtr = 0x330
```

### Second pop

```text
remove node 0x330
new topPtr = 0x310
```

## Q4: First Left Node Creation

```text
root = new TreeNode(50) at 0x400
firstLeft = new TreeNode(30) at 0x420
root->left = firstLeft
```

Diagram:

```text
0x400: [data=50 | left=0x420 | right=0x440]
0x420: [data=30 | left=0x460 | right=0x480]
```

## Q5: Post-order Traversal RAM/Call Stack Idea

Tree:

```text
        10
      /    \
     5      15
    / \    /  \
   2   7  12  20
```

Recursive call stack movement (simplified):

```text
postOrder(10)
 -> postOrder(5)
    -> postOrder(2)
       -> output 2
    -> postOrder(7)
       -> output 7
    -> output 5
 -> postOrder(15)
    -> postOrder(12)
       -> output 12
    -> postOrder(20)
       -> output 20
    -> output 15
 -> output 10
```

Final order in memory vector: `[2, 7, 5, 12, 20, 15, 10]`

## Q6: Bubble Sort Data Exchange

Initial array: `[42, 17, 8, 99, 23, 4]`

First swaps:

```text
Compare 42 and 17 -> swap
[17, 42, 8, 99, 23, 4]

Compare 42 and 8 -> swap
[17, 8, 42, 99, 23, 4]

Compare 99 and 23 -> swap
[17, 8, 42, 23, 99, 4]

Compare 99 and 4 -> swap
[17, 8, 42, 23, 4, 99]
```

`temp` variable temporarily stores one value during each swap.

## Q7: Quick Sort First Partition

Initial array: `[29, 10, 14, 37, 13, 25]`

```text
pivot = 25 (last element)
i starts at -1
```

Walk:

```text
j=0: 29 > 25, do nothing
a=[29,10,14,37,13,25]

j=1: 10 <= 25 -> i=0, swap a[0],a[1]
a=[10,29,14,37,13,25]

j=2: 14 <= 25 -> i=1, swap a[1],a[2]
a=[10,14,29,37,13,25]

j=3: 37 > 25, do nothing

j=4: 13 <= 25 -> i=2, swap a[2],a[4]
a=[10,14,13,37,29,25]

final pivot swap a[i+1]=a[3] with a[5]
a=[10,14,13,25,29,37]
```

Pivot placed at correct final index `3`.

## Q8: Merge Sort First Merge

Initial array: `[38, 27, 43, 3, 9, 82]`

During the first merge operation on smallest subarrays:

```text
Left half  = [38]
Right half = [27]
```

Compare and write back:

```text
27 is smaller -> arr[left] = 27
Copy remaining 38 -> next cell
```

Array state after first merge:

```text
[27, 38, 43, 3, 9, 82]
```
