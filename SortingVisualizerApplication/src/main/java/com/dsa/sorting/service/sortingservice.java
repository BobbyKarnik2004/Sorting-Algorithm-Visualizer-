package com.dsa.sorting.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class sortingservice {

	
	public static List<List<Integer>> bubbleSortSteps(List<Integer> arr) {
        List<List<Integer>> steps = new ArrayList<>();
        steps.add(new ArrayList<>(arr));
        int n = arr.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr.get(j) > arr.get(j + 1)) {
                    Collections.swap(arr, j, j + 1);
                    steps.add(new ArrayList<>(arr));
                }
            }
        }
        return steps;
    }

    public static List<List<Integer>> quickSortSteps(List<Integer> arr) {
        List<List<Integer>> steps = new ArrayList<>();
        steps.add(new ArrayList<>(arr));
        quickSortHelper(arr, 0, arr.size() - 1, steps);
        return steps;
    }

    private static void quickSortHelper(List<Integer> arr, int low, int high, List<List<Integer>> steps) {
        if (low < high) {
            int pi = partition(arr, low, high, steps);
            quickSortHelper(arr, low, pi - 1, steps);
            quickSortHelper(arr, pi + 1, high, steps);
        }
    }

    private static int partition(List<Integer> arr, int low, int high, List<List<Integer>> steps) {
        int pivot = arr.get(high);
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr.get(j) < pivot) {
                i++;
                Collections.swap(arr, i, j);
                steps.add(new ArrayList<>(arr));
            }
        }
        Collections.swap(arr, i + 1, high);
        steps.add(new ArrayList<>(arr));
        return i + 1;
    }

    public static List<List<Integer>> insertionSortSteps(List<Integer> arr) {
        List<List<Integer>> steps = new ArrayList<>();
        steps.add(new ArrayList<>(arr));
        for (int i = 1; i < arr.size(); i++) {
            int key = arr.get(i);
            int j = i - 1;
            while (j >= 0 && arr.get(j) > key) {
                arr.set(j + 1, arr.get(j));
                j--;
                steps.add(new ArrayList<>(arr));
            }
            arr.set(j + 1, key);
            steps.add(new ArrayList<>(arr));
        }
        return steps;
    }

    public static List<List<Integer>> selectionSortSteps(List<Integer> arr) {
        List<List<Integer>> steps = new ArrayList<>();
        steps.add(new ArrayList<>(arr));
        for (int i = 0; i < arr.size() - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.size(); j++) {
                if (arr.get(j) < arr.get(minIdx)) {
                    minIdx = j;
                }
            }
            Collections.swap(arr, i, minIdx);
            steps.add(new ArrayList<>(arr));
        }
        return steps;
    }

    public static List<List<Integer>> mergeSortSteps(List<Integer> arr) {
        List<List<Integer>> steps = new ArrayList<>();
        steps.add(new ArrayList<>(arr));
        mergeSort(arr, 0, arr.size() - 1, steps);
        return steps;
    }

    private static void mergeSort(List<Integer> arr, int left, int right, List<List<Integer>> steps) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid, steps);
            mergeSort(arr, mid + 1, right, steps);
            merge(arr, left, mid, right, steps);
        }
    }

    private static void merge(List<Integer> arr, int left, int mid, int right, List<List<Integer>> steps) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] L = new int[n1];
        int[] R = new int[n2];

        for (int i = 0; i < n1; ++i)
            L[i] = arr.get(left + i);
        for (int j = 0; j < n2; ++j)
            R[j] = arr.get(mid + 1 + j);

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr.set(k++, L[i++]);
            } else {
                arr.set(k++, R[j++]);
            }
            steps.add(new ArrayList<>(arr));
        }
        while (i < n1) {
            arr.set(k++, L[i++]);
            steps.add(new ArrayList<>(arr));
        }
        while (j < n2) {
            arr.set(k++, R[j++]);
            steps.add(new ArrayList<>(arr));
        }
    }

    public static List<List<Integer>> heapSortSteps(List<Integer> arr) {
        List<List<Integer>> steps = new ArrayList<>();
        steps.add(new ArrayList<>(arr));
        int n = arr.size();

        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i, steps);
        }

        for (int i = n - 1; i > 0; i--) {
            Collections.swap(arr, 0, i);
            steps.add(new ArrayList<>(arr));
            heapify(arr, i, 0, steps);
        }
        return steps;
    }

    private static void heapify(List<Integer> arr, int n, int i, List<List<Integer>> steps) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;

        if (l < n && arr.get(l) > arr.get(largest))
            largest = l;

        if (r < n && arr.get(r) > arr.get(largest))
            largest = r;

        if (largest != i) {
            Collections.swap(arr, i, largest);
            steps.add(new ArrayList<>(arr));
            heapify(arr, n, largest, steps);
        }
    }
}
