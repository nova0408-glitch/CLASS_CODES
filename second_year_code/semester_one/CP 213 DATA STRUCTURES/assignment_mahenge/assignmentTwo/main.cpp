#include <algorithm>
#include <iomanip>
#include <iostream>
#include <limits>
#include <string>
#include <vector>

struct Student {
    std::string surname;
    std::string registrationNumber;
    int age;
    double weight;
    double height;
};

void printSeparator() {
    std::cout << "------------------------------------------------------------\n";
}

void printStudent(const Student& s, int index) {
    std::cout << std::left << std::setw(4) << index
              << std::setw(14) << s.surname
              << std::setw(12) << s.registrationNumber
              << std::setw(6) << s.age
              << std::setw(8) << s.weight
              << std::setw(8) << s.height << "\n";
}

void printStudentTableHeader() {
    std::cout << std::left << std::setw(4) << "#"
              << std::setw(14) << "Surname"
              << std::setw(12) << "RegNo"
              << std::setw(6) << "Age"
              << std::setw(8) << "Weight"
              << std::setw(8) << "Height" << "\n";
    printSeparator();
}

void printStudentsFromVector(const std::vector<Student>& students, const std::string& title) {
    std::cout << "\n" << title << "\n";
    printStudentTableHeader();
    for (std::size_t i = 0; i < students.size(); ++i) {
        printStudent(students[i], static_cast<int>(i + 1));
    }
    if (students.empty()) {
        std::cout << "(no students)\n";
    }
}

std::vector<Student> createInitialSample() {
    return {
        {"Amani", "R001", 4, 16.2, 102.0},
        {"Baraka", "R002", 5, 18.1, 107.5},
        {"Chiku", "R003", 4, 15.8, 100.2},
        {"Doto", "R004", 6, 20.0, 111.3},
        {"Elias", "R005", 5, 17.4, 105.8},
        {"Farida", "R006", 4, 16.0, 101.9},
        {"Grace", "R007", 6, 19.2, 110.4},
        {"Hawa", "R008", 5, 18.3, 108.0},
        {"Imani", "R009", 4, 15.5, 99.7},
        {"Juma", "R010", 6, 20.4, 112.1},
    };
}

class StudentLinkedList {
private:
    struct Node {
        Student data;
        Node* next;

        explicit Node(const Student& s) : data(s), next(nullptr) {}
    };

    Node* head;
    Node* tail;
    int count;

public:
    StudentLinkedList() : head(nullptr), tail(nullptr), count(0) {}

    bool empty() const {
        return head == nullptr;
    }

    int size() const {
        return count;
    }

    void append(const Student& s) {
        Node* newNode = new Node(s);
        if (tail == nullptr) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
        ++count;
    }

    void prepend(const Student& s) {
        Node* newNode = new Node(s);
        newNode->next = head;
        head = newNode;
        if (tail == nullptr) {
            tail = newNode;
        }
        ++count;
    }

    bool popFront() {
        if (head == nullptr) {
            return false;
        }

        Node* toDelete = head;
        head = head->next;
        if (head == nullptr) {
            tail = nullptr;
        }

        delete toDelete;
        --count;
        return true;
    }

    void loadFromVector(const std::vector<Student>& students) {
        for (const Student& s : students) {
            append(s);
        }
    }

    std::vector<Student> toVector() const {
        std::vector<Student> result;
        result.reserve(static_cast<std::size_t>(count));

        Node* current = head;
        while (current != nullptr) {
            result.push_back(current->data);
            current = current->next;
        }
        return result;
    }

    void print(const std::string& title) const {
        printStudentsFromVector(toVector(), title);
    }

    void clear() {
        while (popFront()) {
            // Keep deleting nodes.
        }
    }

    ~StudentLinkedList() {
        clear();
    }
};

class StudentQueue {
private:
    struct Node {
        Student data;
        Node* next;

        explicit Node(const Student& s) : data(s), next(nullptr) {}
    };

    Node* frontPtr;
    Node* rearPtr;

public:
    StudentQueue() : frontPtr(nullptr), rearPtr(nullptr) {}

    void enqueue(const Student& s) {
        Node* newNode = new Node(s);
        if (rearPtr == nullptr) {
            frontPtr = rearPtr = newNode;
            return;
        }
        rearPtr->next = newNode;
        rearPtr = newNode;
    }

    bool dequeue() {
        if (frontPtr == nullptr) {
            return false;
        }

        Node* toDelete = frontPtr;
        frontPtr = frontPtr->next;

        if (frontPtr == nullptr) {
            rearPtr = nullptr;
        }

        delete toDelete;
        return true;
    }

    std::vector<Student> toVector() const {
        std::vector<Student> result;
        Node* current = frontPtr;
        while (current != nullptr) {
            result.push_back(current->data);
            current = current->next;
        }
        return result;
    }

    void print(const std::string& title) const {
        printStudentsFromVector(toVector(), title);
    }

    ~StudentQueue() {
        while (dequeue()) {
            // Free queue nodes.
        }
    }
};

class StudentStack {
private:
    struct Node {
        Student data;
        Node* next;

        explicit Node(const Student& s) : data(s), next(nullptr) {}
    };

    Node* topPtr;

public:
    StudentStack() : topPtr(nullptr) {}

    void push(const Student& s) {
        Node* newNode = new Node(s);
        newNode->next = topPtr;
        topPtr = newNode;
    }

    bool pop() {
        if (topPtr == nullptr) {
            return false;
        }

        Node* toDelete = topPtr;
        topPtr = topPtr->next;
        delete toDelete;
        return true;
    }

    std::vector<Student> toVector() const {
        std::vector<Student> result;
        Node* current = topPtr;
        while (current != nullptr) {
            result.push_back(current->data);
            current = current->next;
        }
        return result;
    }

    void print(const std::string& title) const {
        printStudentsFromVector(toVector(), title);
    }

    ~StudentStack() {
        while (pop()) {
            // Free stack nodes.
        }
    }
};

std::vector<Student> createExtraStudents(const std::string& labelPrefix, int count, int regStart) {
    std::vector<Student> extras;

    for (int i = 0; i < count; ++i) {
        Student s;
        s.surname = labelPrefix + std::to_string(i + 1);
        s.registrationNumber = "X" + std::to_string(regStart + i);
        s.age = 4 + (i % 3);
        s.weight = 15.0 + i;
        s.height = 99.0 + (i * 2.5);
        extras.push_back(s);
    }

    return extras;
}

void dropSixStudentsFromFront(StudentLinkedList& list) {
    for (int i = 0; i < 6; ++i) {
        if (!list.popFront()) {
            break;
        }
    }
}

void sectionA(const std::vector<Student>& initial) {
    std::cout << "\nSECTION (a): Enter/display using Structure, Linked List, Queue, Stack\n";

    printStudentsFromVector(initial, "[Structure] Initial sample of students");

    StudentLinkedList linkedList;
    linkedList.loadFromVector(initial);
    linkedList.print("[Linked List] Same students stored as linked nodes");

    StudentQueue queue;
    for (const Student& s : initial) {
        queue.enqueue(s);
    }
    queue.print("[Queue] FIFO order (front to rear)");

    StudentStack stack;
    for (const Student& s : initial) {
        stack.push(s);
    }
    stack.print("[Stack] LIFO order (top to bottom)");
}

void sectionB(const std::vector<Student>& initial) {
    std::cout << "\nSECTION (b): Add 4 details (order preserved), then drop 6 students\n";

    StudentLinkedList list;
    list.loadFromVector(initial);

    std::vector<Student> extras = createExtraStudents("B_Add", 4, 201);
    for (const Student& s : extras) {
        list.append(s);
    }

    list.print("After adding 4 students at the end");

    dropSixStudentsFromFront(list);
    list.print("After dropping 6 students from the front");
}

void sectionC(const std::vector<Student>& initial) {
    std::cout << "\nSECTION (c): Add 5 details before first pupil, then drop 6 students\n";

    StudentLinkedList list;
    list.loadFromVector(initial);

    std::vector<Student> extras = createExtraStudents("C_Pre", 5, 301);

    // Insert in reverse so final displayed order is C_Pre1, C_Pre2, ... C_Pre5 before old first.
    for (auto it = extras.rbegin(); it != extras.rend(); ++it) {
        list.prepend(*it);
    }

    list.print("After adding 5 students before the first pupil");

    dropSixStudentsFromFront(list);
    list.print("After dropping 6 students from the front");
}

void sectionD(const std::vector<Student>& initial) {
    std::cout << "\nSECTION (d): Add 3 details after last pupil, then drop 6 students\n";

    StudentLinkedList list;
    list.loadFromVector(initial);

    std::vector<Student> extras = createExtraStudents("D_End", 3, 401);
    for (const Student& s : extras) {
        list.append(s);
    }

    list.print("After adding 3 students after the last pupil");

    dropSixStudentsFromFront(list);
    list.print("After dropping 6 students from the front");
}

void printAges(const std::vector<int>& ages, const std::string& label) {
    std::cout << label;
    if (ages.empty()) {
        std::cout << "(none)\n";
        return;
    }

    for (std::size_t i = 0; i < ages.size(); ++i) {
        std::cout << ages[i];
        if (i + 1 < ages.size()) {
            std::cout << " ";
        }
    }
    std::cout << "\n";
}

void bubbleSortAges(std::vector<int>& ages, bool ascending) {
    int n = static_cast<int>(ages.size());

    for (int pass = 0; pass < n - 1; ++pass) {
        for (int j = 0; j < n - 1 - pass; ++j) {
            bool shouldSwap = ascending ? (ages[j] > ages[j + 1]) : (ages[j] < ages[j + 1]);
            if (shouldSwap) {
                int temp = ages[j];
                ages[j] = ages[j + 1];
                ages[j + 1] = temp;
            }
        }
    }
}

std::vector<int> extractAges(const std::vector<Student>& students) {
    std::vector<int> ages;
    ages.reserve(students.size());

    for (const Student& s : students) {
        ages.push_back(s.age);
    }

    return ages;
}

std::vector<int> manualAgeInputOrDefault(const std::vector<Student>& fallbackStudents) {
    std::cout << "\nDo you want to manually enter ages for section (e)? (y/n): ";
    char choice = 'n';
    if (!(std::cin >> choice)) {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        return extractAges(fallbackStudents);
    }

    if (choice != 'y' && choice != 'Y') {
        return extractAges(fallbackStudents);
    }

    std::cout << "How many age values will you enter? ";
    int count = 0;
    if (!(std::cin >> count) || count <= 0) {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        return extractAges(fallbackStudents);
    }

    std::vector<int> ages;
    ages.reserve(static_cast<std::size_t>(count));

    std::cout << "Enter " << count << " ages:\n";
    for (int i = 0; i < count; ++i) {
        int age = 0;
        if (!(std::cin >> age)) {
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            break;
        }
        ages.push_back(age);
    }

    if (ages.empty()) {
        return extractAges(fallbackStudents);
    }

    return ages;
}

void sectionE(const std::vector<Student>& initial) {
    std::cout << "\nSECTION (e): Age analysis (youngest->eldest and eldest->youngest)\n";

    std::vector<int> ages = manualAgeInputOrDefault(initial);

    printAges(ages, "Accepted age details: ");

    std::vector<int> ascending = ages;
    bubbleSortAges(ascending, true);
    printAges(ascending, "Youngest to eldest: ");

    std::vector<int> descending = ages;
    bubbleSortAges(descending, false);
    printAges(descending, "Eldest to youngest: ");
}

int main() {
    std::cout << "CP 213 LAB: Queues, Stack, Bubble Sort (Complete Solution)\n";

    std::vector<Student> initialSample = createInitialSample();

    sectionA(initialSample);
    sectionB(initialSample);
    sectionC(initialSample);
    sectionD(initialSample);
    sectionE(initialSample);

    return 0;
}
