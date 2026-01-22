#include <iostream>
using namespace std;

int main() {
    int a[7] = {23, 5, 17, 9, 30, 2, 14};
    int n = 7;

    for (int i = 0; i < n; i++) {
        // 1. Find the minimum in the remaining 'unsorted' part
        int minVal = a[i];
        for (int j = i; j < n; j++) {
            if (a[j] < minVal) minVal = a[j];
        }

        // 2. Rotate the unsorted part (from index i to n-1) 
        // until minVal is at a[i]
        while (a[i] != minVal) {
            int front = a[i]; // Save the front of the current queue
            for (int k = i; k < n - 1; k++) {
                a[k] = a[k + 1]; // Shift left within the unsorted part
            }
            a[n - 1] = front; // Put old front at the very end
        }
        // Now a[i] is the smallest, it's considered 'Sorted'
    }

    cout << "Sorted in-place: ";
    for (int i = 0; i < n; i++) cout << a[i] << " ";
    return 0;
}