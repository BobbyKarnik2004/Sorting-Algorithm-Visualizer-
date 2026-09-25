let array = [];
let originalArray = [];
let comparisons = 0;
let sorting = false;

const arrayContainer = document.getElementById("arrayContainer");
const algorithmSelect = document.getElementById("algorithm");
const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");
const sizeValue = document.getElementById("sizeValue");
const speedValue = document.getElementById("speedValue");
const comparisonsDisplay = document.getElementById("comparisons");
const executionTimeDisplay = document.getElementById("executionTime");
const currentAlgorithmDisplay = document.getElementById("currentAlgorithm");
const generateBtn = document.getElementById("generateBtn");
const sortBtn = document.getElementById("sortBtn");
const resetBtn = document.getElementById("resetBtn");

window.onload = generateArray;

function generateArray() {
    if (sorting) return;

    const size = Number(sizeSlider.value);
    array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }

    originalArray = [...array];
    comparisons = 0;
    executionTimeDisplay.textContent = "0 ms";
    updateStats();
    drawArray();
}

function drawArray() {
    arrayContainer.innerHTML = "";
    const maxValue = Math.max(...array);

    array.forEach(value => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${(value / maxValue) * 100}%`;
        arrayContainer.appendChild(bar);
    });
}

function getBars() {
    return document.querySelectorAll(".bar");
}

function getDelay() {
    return 101 - Number(speedSlider.value);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateStats() {
    comparisonsDisplay.textContent = comparisons;
    currentAlgorithmDisplay.textContent =
        algorithmSelect.options[algorithmSelect.selectedIndex].text;
}

function increaseComparison() {
    comparisons++;
    comparisonsDisplay.textContent = comparisons;
}

function updateBarHeight(bar, value) {
    const maxValue = Math.max(...array);
    bar.style.height = `${(value / maxValue) * 100}%`;
}

function markAllSorted() {
    getBars().forEach(bar => {
        bar.classList.remove("comparing", "swapping");
        bar.classList.add("sorted");
    });
}

async function bubbleSort() {
    const bars = getBars();

    for (let i = 0; i < array.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("comparing");
            bars[j + 1].classList.add("comparing");

            increaseComparison();
            await sleep(getDelay());

            if (array[j] > array[j + 1]) {
                bars[j].classList.add("swapping");
                bars[j + 1].classList.add("swapping");

                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                updateBarHeight(bars[j], array[j]);
                updateBarHeight(bars[j + 1], array[j + 1]);

                swapped = true;
                await sleep(getDelay());

                bars[j].classList.remove("swapping");
                bars[j + 1].classList.remove("swapping");
            }

            bars[j].classList.remove("comparing");
            bars[j + 1].classList.remove("comparing");
        }

        bars[array.length - i - 1].classList.add("sorted");

        if (!swapped) break;
    }

    markAllSorted();
}

async function selectionSort() {
    const bars = getBars();

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add("comparing");
            bars[minIndex].classList.add("comparing");

            increaseComparison();
            await sleep(getDelay());

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            bars[j].classList.remove("comparing");
            bars[minIndex].classList.remove("comparing");
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];

            updateBarHeight(bars[i], array[i]);
            updateBarHeight(bars[minIndex], array[minIndex]);

            await sleep(getDelay());
        }

        bars[i].classList.add("sorted");
    }

    markAllSorted();
}

async function insertionSort() {
    const bars = getBars();

    for (let i = 1; i < array.length; i++) {
        const key = array[i];
        let j = i - 1;

        while (j >= 0) {
            bars[j].classList.add("comparing");
            increaseComparison();
            await sleep(getDelay());

            if (array[j] > key) {
                array[j + 1] = array[j];
                updateBarHeight(bars[j + 1], array[j + 1]);
                bars[j].classList.remove("comparing");
                j--;
            } else {
                bars[j].classList.remove("comparing");
                break;
            }
        }

        array[j + 1] = key;
        updateBarHeight(bars[j + 1], key);
    }

    markAllSorted();
}

async function mergeSort() {
    await mergeSortRecursive(0, array.length - 1);
    markAllSorted();
}

async function mergeSortRecursive(left, right) {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);

    await mergeSortRecursive(left, middle);
    await mergeSortRecursive(middle + 1, right);
    await merge(left, middle, right);
}

async function merge(left, middle, right) {
    const bars = getBars();
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        bars[k].classList.add("comparing");
        increaseComparison();
        await sleep(getDelay());

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i++];
        } else {
            array[k] = rightArray[j++];
        }

        updateBarHeight(bars[k], array[k]);
        bars[k].classList.remove("comparing");
        k++;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i++];
        updateBarHeight(bars[k], array[k]);
        k++;
        await sleep(getDelay());
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j++];
        updateBarHeight(bars[k], array[k]);
        k++;
        await sleep(getDelay());
    }
}

async function quickSort() {
    await quickSortRecursive(0, array.length - 1);
    markAllSorted();
}

async function quickSortRecursive(low, high) {
    if (low < high) {
        const pivotIndex = await partition(low, high);
        await quickSortRecursive(low, pivotIndex - 1);
        await quickSortRecursive(pivotIndex + 1, high);
    }
}

async function partition(low, high) {
    const bars = getBars();
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].classList.add("comparing");
        increaseComparison();
        await sleep(getDelay());

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            updateBarHeight(bars[i], array[i]);
            updateBarHeight(bars[j], array[j]);
        }

        bars[j].classList.remove("comparing");
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    updateBarHeight(bars[i + 1], array[i + 1]);
    updateBarHeight(bars[high], array[high]);

    return i + 1;
}

async function heapSort() {
    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    const bars = getBars();

    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];

        updateBarHeight(bars[0], array[0]);
        updateBarHeight(bars[i], array[i]);

        bars[i].classList.add("sorted");
        await sleep(getDelay());

        await heapify(i, 0);
    }

    markAllSorted();
}

async function heapify(n, i) {
    const bars = getBars();
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
        bars[left].classList.add("comparing");
        increaseComparison();
        await sleep(getDelay());

        if (array[left] > array[largest]) largest = left;
        bars[left].classList.remove("comparing");
    }

    if (right < n) {
        bars[right].classList.add("comparing");
        increaseComparison();
        await sleep(getDelay());

        if (array[right] > array[largest]) largest = right;
        bars[right].classList.remove("comparing");
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];

        updateBarHeight(bars[i], array[i]);
        updateBarHeight(bars[largest], array[largest]);

        await sleep(getDelay());
        await heapify(n, largest);
    }
}

async function startSorting() {
    if (sorting) return;

    sorting = true;
    comparisons = 0;
    executionTimeDisplay.textContent = "Running...";

    setControlsDisabled(true);
    updateStats();

    const startTime = performance.now();

    switch (algorithmSelect.value) {
        case "bubble":
            await bubbleSort();
            break;
        case "selection":
            await selectionSort();
            break;
        case "insertion":
            await insertionSort();
            break;
        case "merge":
            await mergeSort();
            break;
        case "quick":
            await quickSort();
            break;
        case "heap":
            await heapSort();
            break;
    }

    const executionTime = (performance.now() - startTime).toFixed(2);
    executionTimeDisplay.textContent = `${executionTime} ms`;

    sorting = false;
    setControlsDisabled(false);
}

function setControlsDisabled(disabled) {
    generateBtn.disabled = disabled;
    sortBtn.disabled = disabled;
    resetBtn.disabled = disabled;
    algorithmSelect.disabled = disabled;
    sizeSlider.disabled = disabled;
    speedSlider.disabled = disabled;
}

function resetArray() {
    if (sorting) return;

    array = [...originalArray];
    comparisons = 0;
    executionTimeDisplay.textContent = "0 ms";
    updateStats();
    drawArray();
}

sizeSlider.addEventListener("input", function () {
    sizeValue.textContent = this.value;
});

speedSlider.addEventListener("input", function () {
    speedValue.textContent = this.value;
});

algorithmSelect.addEventListener("change", updateStats);
generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", startSorting);
resetBtn.addEventListener("click", resetArray);
