let array = [];
let delay = 50;

function generateArray(size = 50) {
    const container = document.getElementById("bar-container");
    container.innerHTML = "";
    array = [];
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 300) + 10;
        array.push(value);
        const bar = document.createElement("div");
        bar.style.height = `${value}px`;
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById("speed").addEventListener("input", (e) => {
    delay = 101 - e.target.value;
});

async function startSort() {
    const algo = document.getElementById("algorithm").value;
    switch (algo) {
        case "bubble": await bubbleSort(); break;
        case "selection": await selectionSort(); break;
        case "insertion": await insertionSort(); break;
        case "merge": await mergeSortWrapper(); break;
        case "quick": await quickSortWrapper(); break;
        case "heap": await heapSort(); break;
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("swapping");
            bars[j + 1].classList.add("swapping");
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }
            await sleep(delay);
            bars[j].classList.remove("swapping");
            bars[j + 1].classList.remove("swapping");
        }
        bars[array.length - i - 1].classList.add("sorted");
    }
    bars[0].classList.add("sorted");
}

async function selectionSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[minIdx].style.height = `${array[minIdx]}px`;
        await sleep(delay);
        bars[i].classList.add("sorted");
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j]}px`;
            await sleep(delay);
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[i].classList.add("sorted");
    }
}

async function mergeSortWrapper() {
    await mergeSort(0, array.length - 1);
    document.querySelectorAll(".bar").forEach(bar => bar.classList.add("sorted"));
}

async function mergeSort(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    const bars = document.getElementsByClassName("bar");

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k] = left[i++];
        } else {
            array[k] = right[j++];
        }
        bars[k].style.height = `${array[k]}px`;
        await sleep(delay);
        k++;
    }

    while (i < left.length) {
        array[k] = left[i++];
        bars[k].style.height = `${array[k]}px`;
        await sleep(delay);
        k++;
    }

    while (j < right.length) {
        array[k] = right[j++];
        bars[k].style.height = `${array[k]}px`;
        await sleep(delay);
        k++;
    }
}

async function quickSortWrapper() {
    await quickSort(0, array.length - 1);
    document.querySelectorAll(".bar").forEach(bar => bar.classList.add("sorted"));
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const pivot = array[high];
    const bars = document.getElementsByClassName("bar");
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
            await sleep(delay);
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;
    await sleep(delay);
    return i + 1;
}

async function heapSort() {
    const n = array.length;
    const bars = document.getElementsByClassName("bar");

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0]}px`;
        bars[i].style.height = `${array[i]}px`;
        await sleep(delay);
        await heapify(i, 0);
    }

    bars[0].classList.add("sorted");
    for (let i = 1; i < n; i++) {
        bars[i].classList.add("sorted");
    }
}

async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    const bars = document.getElementsByClassName("bar");

    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        bars[i].style.height = `${array[i]}px`;
        bars[largest].style.height = `${array[largest]}px`;
        await sleep(delay);
        await heapify(n, largest);
    }
}

// Initialize on page load
window.onload = generateArray;
