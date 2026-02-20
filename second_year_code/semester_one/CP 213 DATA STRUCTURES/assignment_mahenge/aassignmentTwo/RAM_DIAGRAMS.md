# RAM Diagrams - Assignment Two

Addresses shown below are sample addresses for learning. Real addresses differ on every run.

## 1. Structure Storage (`Student`)

When one student record is created:

```text
Student s at 0x500
+-------------------------------+
| surname = "Amani"             |
| registrationNumber = "R001"   |
| age = 4                       |
| weight = 16.2                 |
| height = 102.0                |
+-------------------------------+
```

The `struct` groups related fields into one memory object.

## 2. Linked List Node Links

Suppose first 3 students are loaded into linked list:

```text
head                                          tail
 |                                              |
 v                                              v
0x600: [Amani | next=0x640] -> 0x640: [Baraka | next=0x680] -> 0x680: [Chiku | next=null]
```

### `prepend(newStudent)` effect

Before:

```text
head -> 0x600 (Amani)
```

After prepending `C_Pre1` at `0x5C0`:

```text
newNode->next = old head (0x600)
head = newNode (0x5C0)
```

Now:

```text
head -> 0x5C0 (C_Pre1) -> 0x600 (Amani) -> ...
```

## 3. Queue Memory (FIFO)

After enqueue Amani, Baraka, Chiku:

```text
frontPtr                                     rearPtr
   |                                           |
   v                                           v
0x700:[Amani|next=0x740] -> 0x740:[Baraka|next=0x780] -> 0x780:[Chiku|next=null]
```

On dequeue:

```text
toDelete = frontPtr (0x700)
frontPtr = frontPtr->next (0x740)
delete 0x700
```

Now queue starts at Baraka.

## 4. Stack Memory (LIFO)

Push order: Amani, Baraka, Chiku

```text
After push Amani:
topPtr -> 0x800:[Amani|next=null]

After push Baraka:
topPtr -> 0x840:[Baraka|next=0x800] -> 0x800:[Amani|next=null]

After push Chiku:
topPtr -> 0x880:[Chiku|next=0x840] -> 0x840:[Baraka|next=0x800] -> ...
```

On pop:

```text
toDelete = topPtr (0x880)
topPtr = topPtr->next (0x840)
delete 0x880
```

The last pushed value is removed first.

## 5. Section (b), (c), (d): Drop 6 Students

Dropping from front repeats this operation:

```text
for 6 times:
    oldHead = head
    head = head->next
    delete oldHead
```

This physically frees the first six nodes from memory.

## 6. Bubble Sort Memory Movement (Ages)

Example ages: `[6, 4, 5, 4]`

Pass 1:

```text
Compare 6 and 4 -> swap using temp
temp=6, arr[0]=4, arr[1]=6
Array: [4,6,5,4]

Compare 6 and 5 -> swap
Array: [4,5,6,4]

Compare 6 and 4 -> swap
Array: [4,5,4,6]
```

Pass 2:

```text
Compare 4 and 5 -> no swap
Compare 5 and 4 -> swap
Array: [4,4,5,6]
```

Final ascending: `[4,4,5,6]`

For descending, the comparison operator reverses, so larger values are moved left.
