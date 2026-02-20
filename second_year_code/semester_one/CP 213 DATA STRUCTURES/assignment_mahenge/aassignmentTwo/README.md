# Assignment Two: Lab - Queues - Stack - Bubble Sort

This folder contains a complete C++ solution for all sections (a) to (e) from `Lab - Queues - Stack - Bubble Sort.pdf`.

## File

- `main.cpp` - Full solution.
- `RAM_DIAGRAMS.md` - Memory movement diagrams (linked list, queue, stack, bubble sort).
- `LINE_BY_LINE.md` - Detailed line-by-line explanation of `main.cpp`.

## Build And Run

```bash
g++ -std=c++17 -Wall -Wextra -pedantic main.cpp -o assignmentTwo
./assignmentTwo
```

## What The Program Covers

1. `struct` concept
- `Student` structure stores: surname, registration number, age, weight, height.

2. Linked list concept
- A custom singly linked list stores student records dynamically.
- Supports append, prepend, drop-front, load-from-vector, and conversion back to vector.

3. Queue concept
- A custom queue class is implemented using linked nodes.
- Demonstrates FIFO behavior: first in, first out.

4. Stack concept
- A custom stack class is implemented using linked nodes.
- Demonstrates LIFO behavior: last in, first out.

5. Section (b)
- Add 4 students while preserving existing order (append).
- Drop 6 students from front.
- Display remaining records.

6. Section (c)
- Add 5 students before first pupil (prepend).
- Drop 6 students from front.
- Display remaining records.

7. Section (d)
- Add 3 students after last pupil (append).
- Drop 6 students from front.
- Display remaining records.

8. Section (e)
- Accept ages manually (optional).
- If manual input is skipped/invalid, use survey sample ages.
- Sort ages from youngest to eldest using bubble sort.
- Sort ages from eldest to youngest using bubble sort.

## Study Notes

- The code intentionally uses custom linked structures (instead of STL queue/stack) so memory pointers are visible for learning.
- `RAM_DIAGRAMS.md` shows how node pointers and array values move in memory.
- `LINE_BY_LINE.md` explains all important statement lines in the source.
