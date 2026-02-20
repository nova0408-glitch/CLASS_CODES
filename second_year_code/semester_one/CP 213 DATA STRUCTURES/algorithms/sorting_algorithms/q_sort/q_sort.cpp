#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
    int pivot = arr[(low + high) / 2];  // middle element pivot
    int i = low;
    int j = high;

    while (i <= j) {
        while (arr[i] < pivot)
            i++;

        while (arr[j] > pivot)
            j--;

        if (i <= j) {
            swap(arr[i], arr[j]);
            i++;
            j--;
        }
    }
    return i;  // return partition point
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int index = partition(arr, low, high);

        quickSort(arr, low, index - 1);
        quickSort(arr, index, high);
    }
}

int main() {
    int arr[6] = {38, 27, 43, 3, 9, 82};

    quickSort(arr, 0, 5);

    for(int i = 0; i < 6; i++)
        cout << arr[i] << " ";

    return 0;
}