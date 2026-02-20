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

void merge(int arr[], int left, int mid, int right, bool& firstMergeShown) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int* leftPart = new int[n1];
    int* rightPart = new int[n2];

    for (int i = 0; i < n1; ++i) {
        leftPart[i] = arr[left + i];
    }
    for (int j = 0; j < n2; ++j) {
        rightPart[j] = arr[mid + 1 + j];
    }

    if (!firstMergeShown) {
        std::cout << "First merge details:\n";
        std::cout << "Left half: ";
        for (int i = 0; i < n1; ++i) {
            std::cout << leftPart[i] << (i + 1 < n1 ? " " : "\n");
        }
        std::cout << "Right half: ";
        for (int j = 0; j < n2; ++j) {
            std::cout << rightPart[j] << (j + 1 < n2 ? " " : "\n");
        }
    }

    int i = 0;
    int j = 0;
    int k = left;

    while (i < n1 && j < n2) {
        if (leftPart[i] <= rightPart[j]) {
            arr[k] = leftPart[i];
            ++i;
        } else {
            arr[k] = rightPart[j];
            ++j;
        }
        ++k;
    }

    while (i < n1) {
        arr[k] = leftPart[i];
        ++i;
        ++k;
    }

    while (j < n2) {
        arr[k] = rightPart[j];
        ++j;
        ++k;
    }

    if (!firstMergeShown) {
        std::cout << "After first merge placed back into array: ";
        printArray(arr, 6);
        firstMergeShown = true;
    }

    delete[] leftPart;
    delete[] rightPart;
}

void mergeSort(int arr[], int left, int right, bool& firstMergeShown) {
    if (left >= right) {
        return;
    }

    int mid = left + (right - left) / 2;

    mergeSort(arr, left, mid, firstMergeShown);
    mergeSort(arr, mid + 1, right, firstMergeShown);
    merge(arr, left, mid, right, firstMergeShown);
}

int main() {
    int arr[6] = {38, 27, 43, 3, 9, 82};

    std::cout << "Original array: ";
    printArray(arr, 6);

    bool firstMergeShown = false;
    mergeSort(arr, 0, 5, firstMergeShown);

    std::cout << "Sorted array:   ";
    printArray(arr, 6);

    return 0;
}
