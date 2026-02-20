# Line-by-Line Guide - `assignmentTwo/main.cpp`

This guide explains all significant statement lines (blank lines are formatting only).

## Includes And Student Structure

- `1-6`: Include standard headers for sorting helpers, formatted printing, I/O, limits, strings, and vectors.
- `8`: Starts `Student` structure.
- `9`: `surname` field.
- `10`: `registrationNumber` field.
- `11`: `age` field.
- `12`: `weight` field.
- `13`: `height` field.
- `14`: Ends `Student` struct.

## Display Helpers

- `16`: Starts separator print function.
- `17`: Prints a horizontal line.
- `18`: Ends function.
- `20`: Starts one-student row printer.
- `21-26`: Prints index and fields in fixed-width columns.
- `27`: Ends function.
- `29`: Starts table header printer.
- `30-35`: Prints column names.
- `36`: Prints separator line under headers.
- `37`: Ends function.
- `39`: Starts vector-to-table printer.
- `40`: Prints section title.
- `41`: Prints table headers.
- `42`: Iterates students by index.
- `43`: Prints each student row.
- `45`: Checks if vector has no records.
- `46`: Prints `(no students)`.
- `48`: Ends function.

## Initial Data

- `50`: Starts function creating 10-student sample.
- `51-62`: Returns initializer list of 10 students (ages 4-6 as required).
- `63`: Ends function.

## Linked List Class

- `65`: Starts `StudentLinkedList` class.
- `66`: Private section.
- `67`: Starts internal node struct.
- `68`: Node stores `Student`.
- `69`: Pointer to next node.
- `71`: Node constructor copies student and sets `next=null`.
- `72`: Ends node struct.
- `74`: Head pointer declaration.
- `75`: Tail pointer declaration.
- `76`: Node count declaration.
- `78`: Public section.
- `79`: Constructor initializes empty list state.
- `81`: Starts `empty()`.
- `82`: Returns whether `head` is null.
- `83`: Ends `empty()`.
- `85`: Starts `size()`.
- `86`: Returns node count.
- `87`: Ends `size()`.
- `89`: Starts append operation.
- `90`: Allocates new node.
- `91`: Checks if list is empty.
- `92`: Empty case: new node is both head and tail.
- `93-96`: Non-empty case: link old tail to new node and move tail.
- `97`: Increments count.
- `98`: Ends append.
- `100`: Starts prepend operation.
- `101`: Allocates new node.
- `102`: Points new node to old head.
- `103`: Moves head to new node.
- `104`: Handles empty-list tail init.
- `105`: Sets tail if needed.
- `107`: Increments count.
- `108`: Ends prepend.
- `110`: Starts popFront operation.
- `111`: Empty-list guard.
- `112`: Return false if no node.
- `115`: Save old head for delete.
- `116`: Move head forward.
- `117`: If list became empty.
- `118`: Reset tail to null.
- `121`: Delete removed node.
- `122`: Decrement count.
- `123`: Return true.
- `124`: Ends popFront.
- `126`: Starts `loadFromVector`.
- `127`: Loop through input vector.
- `128`: Append each student.
- `130`: Ends loader.
- `132`: Starts `toVector` conversion.
- `133`: Result vector declaration.
- `134`: Reserve capacity for efficiency.
- `136`: Traversal pointer at head.
- `137`: Loop through nodes.
- `138`: Copy each node data to vector.
- `139`: Advance traversal pointer.
- `141`: Return vector copy.
- `142`: Ends conversion.
- `144`: Starts list print wrapper.
- `145`: Reuses table printer from vector form.
- `146`: Ends print wrapper.
- `148`: Starts clear function.
- `149`: Repeatedly pop front until empty.
- `150`: Comment explains purpose.
- `152`: Ends clear.
- `154`: Destructor starts.
- `155`: Calls clear for memory cleanup.
- `156`: Ends destructor.
- `157`: Ends linked list class.

## Queue Class

- `159`: Starts `StudentQueue` class.
- `160`: Private section.
- `161`: Node struct starts.
- `162`: Node stores one student.
- `163`: Pointer to next queue node.
- `165`: Constructor initializes node.
- `166`: Ends node struct.
- `168`: Front pointer declaration.
- `169`: Rear pointer declaration.
- `171`: Public section.
- `172`: Constructor initializes empty queue.
- `174`: Starts enqueue.
- `175`: Allocates new node.
- `176`: Empty queue check.
- `177`: First node becomes front and rear.
- `178`: Return from enqueue.
- `180`: Link old rear to new node.
- `181`: Move rear pointer.
- `182`: Ends enqueue.
- `184`: Starts dequeue.
- `185`: Empty queue guard.
- `186`: Return false if queue empty.
- `189`: Save node to remove.
- `190`: Move front forward.
- `192`: If queue became empty.
- `193`: Reset rear pointer.
- `196`: Delete removed node.
- `197`: Return true.
- `198`: Ends dequeue.
- `200`: Starts queue-to-vector conversion.
- `201`: Result vector declaration.
- `202`: Traversal pointer starts at front.
- `203`: Loop through queue nodes.
- `204`: Copy student into vector.
- `205`: Advance pointer.
- `207`: Return copied vector.
- `208`: Ends conversion.
- `210`: Starts queue print wrapper.
- `211`: Prints queue through shared table formatter.
- `212`: Ends print wrapper.
- `214`: Destructor starts.
- `215`: Repeatedly dequeue all nodes.
- `216`: Comment for cleanup.
- `218`: Ends destructor.
- `219`: Ends queue class.

## Stack Class

- `221`: Starts `StudentStack` class.
- `222`: Private section.
- `223`: Node struct starts.
- `224`: Node stores student.
- `225`: Link to next lower stack node.
- `227`: Node constructor.
- `228`: Ends node struct.
- `230`: Top pointer declaration.
- `232`: Public section.
- `233`: Constructor initializes empty stack.
- `235`: Starts push.
- `236`: Allocates new node.
- `237`: New node points to old top.
- `238`: Top pointer moves to new node.
- `239`: Ends push.
- `241`: Starts pop.
- `242`: Empty-stack check.
- `243`: Return false if empty.
- `246`: Save top node for deletion.
- `247`: Move top to next node.
- `248`: Delete old top.
- `249`: Return true.
- `250`: Ends pop.
- `252`: Starts stack-to-vector conversion.
- `253`: Result vector declaration.
- `254`: Traversal pointer starts at top.
- `255`: Loop through stack nodes.
- `256`: Copy node data.
- `257`: Move pointer downward.
- `259`: Return vector.
- `260`: Ends conversion.
- `262`: Starts stack print wrapper.
- `263`: Reuses table printer.
- `264`: Ends print wrapper.
- `266`: Destructor starts.
- `267`: Pops all nodes to free memory.
- `268`: Cleanup comment.
- `270`: Ends destructor.
- `271`: Ends stack class.

## Data Manipulation Helpers

- `273`: Starts function to create synthetic extra students.
- `274`: Vector for generated records.
- `276`: Loop `count` times.
- `277`: Temporary student object.
- `278`: Surname pattern e.g., `B_Add1`.
- `279`: Registration pattern e.g., `X201`.
- `280`: Age cycles through 4,5,6.
- `281`: Weight generated from index.
- `282`: Height generated from index.
- `283`: Stores generated record.
- `286`: Returns extras vector.
- `287`: Ends helper.
- `289`: Starts drop-six helper.
- `290`: Attempts exactly six removals.
- `291`: Stops early if list gets empty.
- `292`: Break exits loop.
- `295`: Ends helper.

## Section (a)

- `297`: Starts section (a) function.
- `298`: Prints section heading.
- `300`: Displays records as plain structure/vector data.
- `302`: Creates linked list instance.
- `303`: Loads initial sample into linked list.
- `304`: Displays linked list content.
- `306`: Creates queue instance.
- `307`: Iterates through initial records.
- `308`: Enqueues each record.
- `310`: Displays queue FIFO order.
- `312`: Creates stack instance.
- `313`: Iterates through initial records.
- `314`: Pushes each record.
- `316`: Displays stack LIFO order.
- `317`: Ends section (a).

## Section (b)

- `319`: Starts section (b).
- `320`: Prints heading for add-4 then drop-6.
- `322`: Creates working linked list.
- `323`: Loads initial sample.
- `325`: Generates 4 extra records.
- `326`: Iterates extras.
- `327`: Appends each extra at end (order preserved).
- `330`: Displays after adding 4.
- `332`: Removes six from front.
- `333`: Displays remaining records.
- `334`: Ends section (b).

## Section (c)

- `336`: Starts section (c).
- `337`: Prints heading for add-before-first.
- `339`: Creates linked list copy.
- `340`: Loads initial sample.
- `342`: Generates 5 prepended records.
- `344`: Comment explains reverse-iteration reason.
- `345`: Iterates extras backwards.
- `346`: Prepends each so final order becomes C_Pre1..C_Pre5.
- `349`: Displays list after insertion.
- `351`: Drops six from front.
- `352`: Displays remaining list.
- `353`: Ends section (c).

## Section (d)

- `355`: Starts section (d).
- `356`: Prints heading for append-3 then drop-6.
- `358`: Creates linked list.
- `359`: Loads initial sample.
- `361`: Generates 3 records.
- `362`: Iterates extras.
- `363`: Appends after last pupil.
- `366`: Displays after adding 3.
- `368`: Drops six from front.
- `369`: Displays remaining records.
- `370`: Ends section (d).

## Age/Bubble Sort Helpers

- `372`: Starts age printer helper.
- `373`: Prints label.
- `374`: Handles empty list.
- `375`: Prints `(none)`.
- `376`: Early return when empty.
- `379`: Iterates ages.
- `380`: Prints each age.
- `381`: Checks separator condition.
- `382`: Prints space between ages.
- `385`: Prints newline.
- `386`: Ends age printer.
- `388`: Starts bubble sort for ages.
- `389`: Stores vector size as `n`.
- `391`: Outer pass loop.
- `392`: Inner adjacent-compare loop.
- `393`: Chooses comparison based on sort direction.
- `394`: Swap only when needed.
- `395`: Temp stores first value.
- `396`: Moves second value left.
- `397`: Places temp right.
- `401`: Ends sort function.
- `403`: Starts age extraction from students.
- `404`: Creates ages vector.
- `405`: Reserve capacity.
- `407`: Iterates students.
- `408`: Pushes each student age.
- `411`: Returns ages vector.
- `412`: Ends extraction.

## Manual Input With Fallback

- `414`: Starts optional manual age input function.
- `415`: Prompts user for manual input choice.
- `416`: Default choice is `n`.
- `417`: Attempts to read choice.
- `418`: Clears stream error state on failure.
- `419`: Discards invalid input line.
- `420`: Fallback to ages from sample data.
- `423`: If user chooses not `y/Y`.
- `424`: Return fallback ages.
- `427`: Prompts for number of ages.
- `428`: Stores count.
- `429`: Validates count input.
- `430`: Clears stream on invalid count.
- `431`: Discards invalid line.
- `432`: Fallback to sample ages.
- `435`: Creates ages vector for manual input.
- `436`: Reserves capacity.
- `438`: Prompt to enter each age.
- `439`: Loop for `count` entries.
- `440`: Temp age variable.
- `441`: Attempts reading one age.
- `442`: Clear fail state if invalid age.
- `443`: Ignore invalid trailing input.
- `444`: Stop age-reading loop.
- `446`: Store valid age.
- `449`: If none were read successfully.
- `450`: Return fallback sample ages.
- `453`: Return manually entered ages.
- `454`: Ends function.

## Section (e)

- `456`: Starts section (e).
- `457`: Prints age-analysis heading.
- `459`: Gets manual ages or fallback ages.
- `461`: Displays accepted ages.
- `463`: Copies ages for ascending sort.
- `464`: Bubble sort ascending.
- `465`: Displays youngest-to-eldest.
- `467`: Copies ages for descending sort.
- `468`: Bubble sort descending.
- `469`: Displays eldest-to-youngest.
- `470`: Ends section (e).

## `main`

- `472`: Program entry point.
- `473`: Prints overall program title.
- `475`: Builds initial survey sample.
- `477`: Executes section (a).
- `478`: Executes section (b).
- `479`: Executes section (c).
- `480`: Executes section (d).
- `481`: Executes section (e).
- `483`: Returns success.
- `484`: Ends program.
