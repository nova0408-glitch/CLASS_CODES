#include <iostream>

void printArray(const int arr[], int size) {
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i];
        if (i + 1 < size) {
            std::cout << " ";
        }
    }
    std::cout << "\n";
}

void bubbleSortWithTrace(int arr[], int size) {
    for (int pass = 0; pass < size - 1; ++pass) {
        std::cout << "Pass " << (pass + 1) << ":\n";

        for (int j = 0; j < size - 1 - pass; ++j) {
            std::cout << "  Compare arr[" << j << "]=" << arr[j]
                      << " and arr[" << (j + 1) << "]=" << arr[j + 1] << "\n";

            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                std::cout << "  Swap performed -> ";
                printArray(arr, size);
            }
        }
        std::cout << "  Array after pass " << (pass + 1) << ": ";
        printArray(arr, size);
    }
}

int main() {
    int arr[6] = {42, 17, 8, 99, 23, 4};

    std::cout << "Original array: ";
    printArray(arr, 6);

    bubbleSortWithTrace(arr, 6);

    std::cout << "Sorted array:   ";
    printArray(arr, 6);

    return 0;
}
