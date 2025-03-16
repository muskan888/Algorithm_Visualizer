
// Types for sorting algorithms
export type ArrayElement = {
  value: number;
  isComparing: boolean;
  isSorted: boolean;
  isSwapping: boolean;
};

export type SortStep = {
  array: ArrayElement[];
  comparingIndices: number[];
  swappedIndices: number[];
  sortedIndices: number[];
  description: string;
  codeHighlight: number;
};

// Helper function to create a step
const createStep = (
  array: ArrayElement[],
  comparingIndices: number[] = [],
  swappedIndices: number[] = [],
  sortedIndices: number[] = [],
  description: string = "",
  codeHighlight: number = -1
): SortStep => {
  const newArray = array.map((element, index) => ({
    ...element,
    isComparing: comparingIndices.includes(index),
    isSwapping: swappedIndices.includes(index),
    isSorted: sortedIndices.includes(index),
  }));

  return {
    array: newArray,
    comparingIndices,
    swappedIndices,
    sortedIndices,
    description,
    codeHighlight,
  };
};

// Bubble Sort Algorithm
export const bubbleSortSteps = (initialArray: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = initialArray.map((value) => ({
    value,
    isComparing: false,
    isSorted: false,
    isSwapping: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      [],
      [],
      [],
      "Starting Bubble Sort. We'll compare adjacent elements and swap if needed.",
      0
    )
  );

  const n = array.length;
  // Add all steps
  for (let i = 0; i < n; i++) {
    steps.push(
      createStep(
        [...array],
        [],
        [],
        Array.from({ length: i }, (_, idx) => n - 1 - idx),
        `Starting pass ${i+1} of ${n}. ${i > 0 ? `Last ${i} element${i > 1 ? 's are' : ' is'} already sorted.` : ''}`,
        1
      )
    );
    
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing elements
      steps.push(
        createStep(
          [...array],
          [j, j + 1],
          [],
          Array.from({ length: i }, (_, idx) => n - 1 - idx),
          `Comparing elements at indices ${j} and ${j+1}: ${array[j].value} and ${array[j + 1].value}`,
          2
        )
      );

      // Swap if needed
      if (array[j].value > array[j + 1].value) {
        steps.push(
          createStep(
            [...array],
            [],
            [j, j + 1],
            Array.from({ length: i }, (_, idx) => n - 1 - idx),
            `${array[j].value} > ${array[j + 1].value}, so we need to swap these elements`,
            3
          )
        );

        // Perform the swap
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        
        // Show the result after swapping
        steps.push(
          createStep(
            [...array],
            [],
            [],
            Array.from({ length: i }, (_, idx) => n - 1 - idx),
            `After swap: elements are now ${array[j].value} and ${array[j + 1].value}`,
            4
          )
        );
      } else {
        steps.push(
          createStep(
            [...array],
            [],
            [],
            Array.from({ length: i }, (_, idx) => n - 1 - idx),
            `${array[j].value} <= ${array[j + 1].value}, so no swap needed - elements are already in order`,
            5
          )
        );
      }
    }
    // Mark the largest element as sorted
    steps.push(
      createStep(
        [...array],
        [],
        [],
        Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
        i === n - 1
          ? "Sorting complete! All elements are in their correct positions."
          : `Pass ${i + 1} complete. The largest unsorted element (${array[n - i - 1].value}) is now in its correct position.`,
        6
      )
    );
  }

  return steps;
};

// Quick Sort Algorithm
export const quickSortSteps = (initialArray: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = initialArray.map((value) => ({
    value,
    isComparing: false,
    isSorted: false,
    isSwapping: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      [],
      [],
      [],
      "Starting Quick Sort algorithm",
      0
    )
  );

  const sortedIndices: number[] = [];

  const quickSort = (
    arr: ArrayElement[],
    low: number,
    high: number,
    globalArray: ArrayElement[]
  ) => {
    if (low < high) {
      const pi = partition(arr, low, high, globalArray);
      sortedIndices.push(pi);
      quickSort(arr, low, pi - 1, globalArray);
      quickSort(arr, pi + 1, high, globalArray);
    } else if (low >= 0 && high >= 0 && low === high) {
      sortedIndices.push(low);
    }
  };

  const partition = (
    arr: ArrayElement[],
    low: number,
    high: number,
    globalArray: ArrayElement[]
  ): number => {
    const pivot = arr[high].value;
    
    steps.push(
      createStep(
        [...globalArray],
        [high],
        [],
        [...sortedIndices],
        `Choosing pivot: ${pivot}`,
        3
      )
    );

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push(
        createStep(
          [...globalArray],
          [j, high],
          [],
          [...sortedIndices],
          `Comparing ${arr[j].value} with pivot ${pivot}`,
          4
        )
      );

      if (arr[j].value < pivot) {
        i++;
        steps.push(
          createStep(
            [...globalArray],
            [],
            [i, j],
            [...sortedIndices],
            `${arr[j].value} < ${pivot}, swapping elements at indices ${i} and ${j}`,
            6
          )
        );

        // Swap
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        // Update global array to reflect changes
        globalArray[i] = arr[i];
        globalArray[j] = arr[j];
      } else {
        steps.push(
          createStep(
            [...globalArray],
            [],
            [],
            [...sortedIndices],
            `${arr[j].value} >= ${pivot}, no swap needed`,
            8
          )
        );
      }
    }

    steps.push(
      createStep(
        [...globalArray],
        [],
        [i + 1, high],
        [...sortedIndices],
        `Placing pivot ${pivot} in its correct position`,
        10
      )
    );

    // Swap pivot to its correct position
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    // Update global array
    globalArray[i + 1] = arr[i + 1];
    globalArray[high] = arr[high];

    steps.push(
      createStep(
        [...globalArray],
        [],
        [],
        [...sortedIndices, i + 1],
        `Pivot ${pivot} is now in its sorted position`,
        11
      )
    );

    return i + 1;
  };

  // Create a copy of the array to pass to quickSort
  const arrayCopy = [...array];
  quickSort(arrayCopy, 0, array.length - 1, array);

  // Final step with all elements sorted
  steps.push(
    createStep(
      [...array],
      [],
      [],
      Array.from({ length: array.length }, (_, i) => i),
      "Quick Sort complete!",
      12
    )
  );

  return steps;
};

// Merge Sort Algorithm
export const mergeSortSteps = (initialArray: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = initialArray.map((value) => ({
    value,
    isComparing: false,
    isSorted: false,
    isSwapping: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      [],
      [],
      [],
      "Starting Merge Sort algorithm",
      0
    )
  );

  const sortedIndices: number[] = [];

  const mergeSort = (
    arr: ArrayElement[],
    left: number,
    right: number,
    globalArray: ArrayElement[]
  ) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push(
        createStep(
          [...globalArray],
          [left, right],
          [],
          [...sortedIndices],
          `Dividing array from index ${left} to ${right}`,
          2
        )
      );
      
      mergeSort(arr, left, mid, globalArray);
      mergeSort(arr, mid + 1, right, globalArray);
      merge(arr, left, mid, right, globalArray);
    }
  };

  const merge = (
    arr: ArrayElement[],
    left: number,
    mid: number,
    right: number,
    globalArray: ArrayElement[]
  ) => {
    steps.push(
      createStep(
        [...globalArray],
        [left, mid, right],
        [],
        [...sortedIndices],
        `Merging subarrays from index ${left} to ${mid} and ${mid + 1} to ${right}`,
        5
      )
    );

    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays
    const L: ArrayElement[] = new Array(n1);
    const R: ArrayElement[] = new Array(n2);

    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
    }

    // Merge the temp arrays back
    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      steps.push(
        createStep(
          [...globalArray],
          [left + i, mid + 1 + j],
          [],
          [...sortedIndices],
          `Comparing ${L[i].value} and ${R[j].value}`,
          7
        )
      );

      if (L[i].value <= R[j].value) {
        steps.push(
          createStep(
            [...globalArray],
            [],
            [k],
            [...sortedIndices],
            `${L[i].value} <= ${R[j].value}, placing ${L[i].value} at index ${k}`,
            8
          )
        );
        arr[k] = L[i];
        globalArray[k] = L[i];
        i++;
      } else {
        steps.push(
          createStep(
            [...globalArray],
            [],
            [k],
            [...sortedIndices],
            `${L[i].value} > ${R[j].value}, placing ${R[j].value} at index ${k}`,
            10
          )
        );
        arr[k] = R[j];
        globalArray[k] = R[j];
        j++;
      }
      k++;
    }

    // Copy remaining elements of L[]
    while (i < n1) {
      steps.push(
        createStep(
          [...globalArray],
          [],
          [k],
          [...sortedIndices],
          `Copying remaining element ${L[i].value} to index ${k}`,
          13
        )
      );
      arr[k] = L[i];
      globalArray[k] = L[i];
      i++;
      k++;
    }

    // Copy remaining elements of R[]
    while (j < n2) {
      steps.push(
        createStep(
          [...globalArray],
          [],
          [k],
          [...sortedIndices],
          `Copying remaining element ${R[j].value} to index ${k}`,
          16
        )
      );
      arr[k] = R[j];
      globalArray[k] = R[j];
      j++;
      k++;
    }

    // Update sorted indices for the merged subarray
    for (let idx = left; idx <= right; idx++) {
      sortedIndices.push(idx);
    }

    steps.push(
      createStep(
        [...globalArray],
        [],
        [],
        [...sortedIndices],
        `Merged subarray from ${left} to ${right}`,
        19
      )
    );
  };

  // Create a copy of the array to pass to mergeSort
  const arrayCopy = [...array];
  mergeSort(arrayCopy, 0, array.length - 1, array);

  // Final step with all elements sorted
  steps.push(
    createStep(
      [...array],
      [],
      [],
      Array.from({ length: array.length }, (_, i) => i),
      "Merge Sort complete!",
      20
    )
  );

  return steps;
};

// Insertion Sort Algorithm
export const insertionSortSteps = (initialArray: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = initialArray.map((value) => ({
    value,
    isComparing: false,
    isSorted: false,
    isSwapping: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      [],
      [],
      [0],
      "Starting Insertion Sort algorithm. First element is already sorted.",
      0
    )
  );

  const n = array.length;
  
  for (let i = 1; i < n; i++) {
    const key = array[i].value;
    let j = i - 1;
    
    steps.push(
      createStep(
        [...array],
        [i],
        [],
        Array.from({ length: i }, (_, idx) => idx),
        `Current element to insert: ${key}`,
        2
      )
    );
    
    while (j >= 0 && array[j].value > key) {
      steps.push(
        createStep(
          [...array],
          [j, j + 1],
          [],
          Array.from({ length: i }, (_, idx) => idx !== j + 1 ? idx : -1).filter(idx => idx >= 0),
          `${array[j].value} > ${key}, moving ${array[j].value} one position ahead`,
          4
        )
      );
      
      // Move elements that are greater than key to one position ahead
      array[j + 1] = array[j];
      
      steps.push(
        createStep(
          [...array],
          [],
          [j + 1],
          Array.from({ length: i }, (_, idx) => idx !== j + 1 ? idx : -1).filter(idx => idx >= 0),
          `Moved ${array[j].value} to position ${j + 1}`,
          5
        )
      );
      
      j--;
    }
    
    // Place the key in its correct position
    array[j + 1] = { value: key, isComparing: false, isSorted: false, isSwapping: true };
    
    steps.push(
      createStep(
        [...array],
        [],
        [j + 1],
        Array.from({ length: i }, (_, idx) => idx),
        `Inserted ${key} at position ${j + 1}`,
        7
      )
    );
    
    // Mark the current subarray as sorted
    steps.push(
      createStep(
        [...array],
        [],
        [],
        Array.from({ length: i + 1 }, (_, idx) => idx),
        `Subarray from index 0 to ${i} is now sorted`,
        8
      )
    );
  }
  
  // Final step with all elements sorted
  steps.push(
    createStep(
      [...array],
      [],
      [],
      Array.from({ length: n }, (_, i) => i),
      "Insertion Sort complete!",
      9
    )
  );
  
  return steps;
};

// Helper to generate random array
export const generateRandomArray = (size: number, max: number = 100): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
};

export const sortingAlgorithms = [
  {
    id: "bubble",
    name: "Bubble Sort",
    description: "Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    generateSteps: bubbleSortSteps,
    codeString: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`
  },
  {
    id: "quick",
    name: "Quick Sort",
    description: "Efficient divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around it.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n)",
    generateSteps: quickSortSteps,
    codeString: `function quickSort(arr, low, high) {
  if (low < high) {
    // Find the partition index
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    const pi = i + 1;
    
    // Recursively sort elements
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}`
  },
  {
    id: "merge",
    name: "Merge Sort",
    description: "Efficient divide-and-conquer algorithm that divides the array into smaller subarrays, sorts them, and then merges them back.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    generateSteps: mergeSortSteps,
    codeString: `function mergeSort(arr, left, right) {
  if (left < right) {
    // Find the middle point
    const mid = Math.floor((left + right) / 2);
    
    // Sort first and second halves
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    
    // Merge the sorted halves
    merge(arr, left, mid, right);
  }
  return arr;
}

function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  
  // Create temp arrays
  const L = arr.slice(left, mid + 1);
  const R = arr.slice(mid + 1, right + 1);
  
  // Merge the temp arrays back
  let i = 0, j = 0, k = left;
  
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  // Copy remaining elements
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}`
  },
  {
    id: "insertion",
    name: "Insertion Sort",
    description: "Simple sorting algorithm that builds the final sorted array one item at a time, similar to how we sort playing cards in our hands.",
    timeComplexity: "O(n²) average and worst, O(n) best",
    spaceComplexity: "O(1)",
    generateSteps: insertionSortSteps,
    codeString: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Move elements greater than key
    // to one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}`
  }
];
