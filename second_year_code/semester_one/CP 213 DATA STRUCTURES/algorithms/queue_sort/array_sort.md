## array_sort.cpp Explanation

This program sorts the values in `q` by repeatedly moving the smallest remaining value to the `sorted` array. It treats the array `q` like a queue: it can rotate by moving the front element to the back, and it can dequeue by removing the front.

### Step-by-step algorithm
1) Initialize:
   - `q` holds the unsorted values.
   - `sorted` is empty.
   - `currentSize` tracks how many values remain in `q`.
2) For each position `i` in `sorted` (0 to 6):
   - Find the minimum value among `q[0..currentSize-1]`.
   - Rotate `q` until that minimum value is at the front (index 0).
   - Dequeue the front (the minimum) into `sorted[i]`.
   - Shift `q` left to remove the front and reduce `currentSize`.
3) Print the `sorted` array.

This is a selection-style sort using queue rotations instead of swapping.

### RAM Diagram (single column)
Each row shows the full memory state after each outer-loop iteration completes (after the dequeue and shrink).

| State |
| --- |
| Step 0 (initial): `q=[23, 5, 17, 9, 30, 2, 14]`, `sorted=[_, _, _, _, _, _, _]`, `currentSize=7` |
| Step 1 (min=2): `q=[14, 23, 5, 17, 9, 30]`, `sorted=[2, _, _, _, _, _, _]`, `currentSize=6` |
| Step 2 (min=5): `q=[17, 9, 30, 14, 23]`, `sorted=[2, 5, _, _, _, _, _]`, `currentSize=5` |
| Step 3 (min=9): `q=[30, 14, 23, 17]`, `sorted=[2, 5, 9, _, _, _, _]`, `currentSize=4` |
| Step 4 (min=14): `q=[17, 30, 23]`, `sorted=[2, 5, 9, 14, _, _, _]`, `currentSize=3` |
| Step 5 (min=17): `q=[30, 23]`, `sorted=[2, 5, 9, 14, 17, _, _]`, `currentSize=2` |
| Step 6 (min=23): `q=[30]`, `sorted=[2, 5, 9, 14, 17, 23, _]`, `currentSize=1` |
| Step 7 (min=30): `q=[]`, `sorted=[2, 5, 9, 14, 17, 23, 30]`, `currentSize=0` |
