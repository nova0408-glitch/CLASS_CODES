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

int partitionWithTrace(int arr[], int low, int high, bool trace) {
    int pivot = arr[high];
    int i = low - 1;

    if (trace) {
        std::cout << "First partition trace:\n";
        std::cout << "Pivot = arr[" << high << "] = " << pivot << "\n";
    }

    for (int j = low; j < high; ++j) {
        if (trace) {
            std::cout << "Check arr[" << j << "]=" << arr[j]
                      << " against pivot " << pivot << "\n";
        }

        if (arr[j] <= pivot) {
            ++i;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            if (trace) {
                std::cout << "  Swap arr[" << i << "] and arr[" << j << "] -> ";
                printArray(arr, 6);
            }
        }
    }

    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    if (trace) {
        std::cout << "Place pivot at index " << (i + 1) << " -> ";
        printArray(arr, 6);
    }

    return i + 1;
}

void quickSort(int arr[], int low, int high, bool& firstTraceDone) {
    if (low < high) {
        bool traceNow = !firstTraceDone;
        int pivotIndex = partitionWithTrace(arr, low, high, traceNow);
        firstTraceDone = true;

        quickSort(arr, low, pivotIndex - 1, firstTraceDone);
        quickSort(arr, pivotIndex + 1, high, firstTraceDone);
    }
}

int main() {
    int arr[6] = {29, 10, 14, 37, 13, 25};

    std::cout << "Original array: ";
    printArray(arr, 6);

    bool firstTraceDone = false;
    quickSort(arr, 0, 5, firstTraceDone);

    std::cout << "Sorted array:   ";
    printArray(arr, 6);

    return 0;
}
