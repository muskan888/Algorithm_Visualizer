// Types for searching algorithms
export type SearchElement = {
  value: number;
  isComparing: boolean;
  isTarget: boolean;
  isVisited: boolean;
};

export type SearchStep = {
  array: SearchElement[];
  compareIndex: number;
  found: boolean;
  description: string;
  codeHighlight: number;
};

// Helper function to create a search step
const createStep = (
  array: SearchElement[],
  compareIndex: number = -1,
  found: boolean = false,
  description: string = "",
  codeHighlight: number = -1
): SearchStep => {
  const newArray = array.map((element, index) => ({
    ...element,
    isComparing: index === compareIndex,
    isTarget: found && index === compareIndex,
  }));

  return {
    array: newArray,
    compareIndex,
    found,
    description,
    codeHighlight,
  };
};

// Linear Search Algorithm
export const linearSearchSteps = (
  initialArray: number[],
  target: number
): SearchStep[] => {
  const steps: SearchStep[] = [];
  const array = initialArray.map((value) => ({
    value,
    isComparing: false,
    isTarget: false,
    isVisited: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Starting Linear Search for target value: ${target}. We'll check each element sequentially.`,
      0
    )
  );

  for (let i = 0; i < array.length; i++) {
    // Mark elements as visited
    array[i].isVisited = true;
    
    // Compare current element with target
    steps.push(
      createStep(
        [...array],
        i,
        false,
        `Examining element at index ${i}: Is ${array[i].value} equal to our target ${target}?`,
        2
      )
    );

    // Check if current element is the target
    if (array[i].value === target) {
      steps.push(
        createStep(
          [...array],
          i,
          true,
          `Success! Target ${target} found at index ${i}. ${array[i].value} === ${target}`,
          4
        )
      );
      return steps;
    }
    
    // If not the target, provide explanation
    if (i < array.length - 1) {
      steps.push(
        createStep(
          [...array],
          -1,
          false,
          `${array[i].value} !== ${target}, moving to the next element.`,
          6
        )
      );
    }
  }

  // Target not found
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Target ${target} not found after checking all ${array.length} elements in the array.`,
      7
    )
  );

  return steps;
};

// Binary Search Algorithm
export const binarySearchSteps = (
  initialArray: number[],
  target: number
): SearchStep[] => {
  // Binary search requires a sorted array
  const sortedValues = [...initialArray].sort((a, b) => a - b);
  
  const steps: SearchStep[] = [];
  const array = sortedValues.map((value) => ({
    value,
    isComparing: false,
    isTarget: false,
    isVisited: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Starting Binary Search for target value: ${target}. Array must be sorted first.`,
      0
    )
  );

  let left = 0;
  let right = array.length - 1;
  
  while (left <= right) {
    // Mark the current subarray range
    for (let i = left; i <= right; i++) {
      array[i].isVisited = true;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    steps.push(
      createStep(
        [...array],
        mid,
        false,
        `Examining middle element at index ${mid}: ${array[mid].value} compared to target ${target}`,
        4
      )
    );

    // Check if target is present at mid
    if (array[mid].value === target) {
      steps.push(
        createStep(
          [...array],
          mid,
          true,
          `Target ${target} found at index ${mid}! ${array[mid].value} === ${target}`,
          6
        )
      );
      return steps;
    }
    
    // If target is greater, ignore left half
    if (array[mid].value < target) {
      steps.push(
        createStep(
          [...array],
          -1,
          false,
          `${array[mid].value} < ${target}, so target must be in the right half. Moving left boundary to ${mid + 1}.`,
          8
        )
      );
      left = mid + 1;
    } 
    // If target is smaller, ignore right half
    else {
      steps.push(
        createStep(
          [...array],
          -1,
          false,
          `${array[mid].value} > ${target}, so target must be in the left half. Moving right boundary to ${mid - 1}.`,
          11
        )
      );
      right = mid - 1;
    }
  }

  // Target not found
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Target ${target} not found in the array. Search space is exhausted.`,
      15
    )
  );

  return steps;
};

// Jump Search Algorithm
export const jumpSearchSteps = (
  initialArray: number[],
  target: number
): SearchStep[] => {
  // Jump search requires a sorted array
  const sortedValues = [...initialArray].sort((a, b) => a - b);
  
  const steps: SearchStep[] = [];
  const array = sortedValues.map((value) => ({
    value,
    isComparing: false,
    isTarget: false,
    isVisited: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Starting Jump Search for target value: ${target}. Array must be sorted.`,
      0
    )
  );

  const n = array.length;
  const blockSize = Math.floor(Math.sqrt(n));
  
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Jump size will be sqrt(n) = ${blockSize} elements`,
      2
    )
  );

  // Finding the block where element may be present
  let prev = 0;
  
  // Mark the first element
  array[0].isVisited = true;
  steps.push(
    createStep(
      [...array],
      0,
      false,
      `Starting at index 0, value ${array[0].value}`,
      4
    )
  );

  // If first element is the target
  if (array[0].value === target) {
    steps.push(
      createStep(
        [...array],
        0,
        true,
        `Target ${target} found at index 0!`,
        5
      )
    );
    return steps;
  }

  // Finding the block where element may be present
  let step = blockSize;
  while (step < n && array[step].value <= target) {
    array[step].isVisited = true;
    steps.push(
      createStep(
        [...array],
        step,
        false,
        `Jumping to index ${step}, value ${array[step].value}`,
        7
      )
    );

    if (array[step].value === target) {
      steps.push(
        createStep(
          [...array],
          step,
          true,
          `Target ${target} found at index ${step}!`,
          8
        )
      );
      return steps;
    }

    prev = step;
    step += blockSize;
  }

  if (step >= n) {
    step = n - 1;
    array[step].isVisited = true;
    steps.push(
      createStep(
        [...array],
        step,
        false,
        `Reached end of array at index ${step}`,
        12
      )
    );
  } else {
    steps.push(
      createStep(
        [...array],
        step,
        false,
        `Found block where ${array[prev].value} <= ${target} < ${array[step].value}`,
        12
      )
    );
  }

  // Linear search in the identified block
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Performing linear search from index ${prev + 1} to ${step}`,
      14
    )
  );

  for (let i = prev + 1; i <= step; i++) {
    array[i].isVisited = true;
    steps.push(
      createStep(
        [...array],
        i,
        false,
        `Checking if ${array[i].value} equals ${target}`,
        15
      )
    );

    if (array[i].value === target) {
      steps.push(
        createStep(
          [...array],
          i,
          true,
          `Target ${target} found at index ${i}!`,
          16
        )
      );
      return steps;
    }
  }

  // Target not found
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Target ${target} not found in the array.`,
      19
    )
  );

  return steps;
};

// Interpolation Search Algorithm
export const interpolationSearchSteps = (
  initialArray: number[],
  target: number
): SearchStep[] => {
  // Interpolation search requires a sorted array
  const sortedValues = [...initialArray].sort((a, b) => a - b);
  
  const steps: SearchStep[] = [];
  const array = sortedValues.map((value) => ({
    value,
    isComparing: false,
    isTarget: false,
    isVisited: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Starting Interpolation Search for target value: ${target}. Array must be sorted.`,
      0
    )
  );

  let low = 0;
  let high = array.length - 1;
  
  while (low <= high && target >= array[low].value && target <= array[high].value) {
    // Mark the current subarray range
    for (let i = low; i <= high; i++) {
      array[i].isVisited = true;
    }
    
    // Calculate the probe position using the formula
    let pos;
    if (high === low) {
      pos = low; // Avoid division by zero
    } else {
      pos = low + Math.floor(
        ((target - array[low].value) * (high - low)) / 
        (array[high].value - array[low].value)
      );
    }
    
    steps.push(
      createStep(
        [...array],
        pos,
        false,
        `Calculated position: ${pos} based on interpolation formula`,
        4
      )
    );

    // Check if target is present at pos
    if (array[pos].value === target) {
      steps.push(
        createStep(
          [...array],
          pos,
          true,
          `Target ${target} found at index ${pos}!`,
          6
        )
      );
      return steps;
    }
    
    // If target is greater, search in right sub-array
    if (array[pos].value < target) {
      steps.push(
        createStep(
          [...array],
          -1,
          false,
          `${array[pos].value} < ${target}, so search in right sub-array`,
          8
        )
      );
      low = pos + 1;
    } 
    // If target is smaller, search in left sub-array
    else {
      steps.push(
        createStep(
          [...array],
          -1,
          false,
          `${array[pos].value} > ${target}, so search in left sub-array`,
          11
        )
      );
      high = pos - 1;
    }
  }

  // Target not found
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Target ${target} not found in the array.`,
      15
    )
  );

  return steps;
};

// Exponential Search Algorithm
export const exponentialSearchSteps = (
  initialArray: number[],
  target: number
): SearchStep[] => {
  // Exponential search requires a sorted array
  const sortedValues = [...initialArray].sort((a, b) => a - b);
  
  const steps: SearchStep[] = [];
  const array = sortedValues.map((value) => ({
    value,
    isComparing: false,
    isTarget: false,
    isVisited: false,
  }));

  // Initial state
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Starting Exponential Search for target value: ${target}. Array must be sorted.`,
      0
    )
  );

  const n = array.length;
  
  // If target is at first position
  if (array[0].value === target) {
    steps.push(
      createStep(
        [...array],
        0,
        true,
        `Target ${target} found at index 0!`,
        3
      )
    );
    return steps;
  }
  
  // Find range for binary search by repeated doubling
  let i = 1;
  while (i < n && array[i].value <= target) {
    array[i].isVisited = true;
    steps.push(
      createStep(
        [...array],
        i,
        false,
        `Checking if ${array[i].value} is less than or equal to ${target}`,
        6
      )
    );

    // Check if we found the target
    if (array[i].value === target) {
      steps.push(
        createStep(
          [...array],
          i,
          true,
          `Target ${target} found at index ${i}!`,
          7
        )
      );
      return steps;
    }
    
    i = i * 2;
  }
  
  // Determine the bounds for binary search
  const start = i / 2;
  const end = Math.min(i, n - 1);
  
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Found range for binary search: [${start}, ${end}]`,
      11
    )
  );
  
  // Perform binary search in the found range
  let left = start;
  let right = end;
  
  while (left <= right) {
    // Mark the current subarray range
    for (let j = left; j <= right; j++) {
      array[j].isVisited = true;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    steps.push(
      createStep(
        [...array],
        mid,
        false,
        `Binary search: Comparing middle element ${array[mid].value} at index ${mid} with target ${target}`,
        14
      )
    );

    // Check if target is present at mid
    if (array[mid].value === target) {
      steps.push(
        createStep(
          [...array],
          mid,
          true,
          `Target ${target} found at index ${mid}!`,
          16
        )
      );
      return steps;
    }
    
    // If target is greater, search right
    if (array[mid].value < target) {
      steps.push(
        createStep(
          [...array],
          -1,
          false,
          `${array[mid].value} < ${target}, so search in right sub-array`,
          19
        )
      );
      left = mid + 1;
    } 
    // If target is smaller, search left
    else {
      steps.push(
        createStep(
          [...array],
          -1,
          false,
          `${array[mid].value} > ${target}, so search in left sub-array`,
          23
        )
      );
      right = mid - 1;
    }
  }

  // Target not found
  steps.push(
    createStep(
      [...array],
      -1,
      false,
      `Target ${target} not found in the array.`,
      28
    )
  );

  return steps;
};

// Helper function to generate a sorted array
export const generateSortedArray = (size: number, max: number = 100): number[] => {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
  return arr.sort((a, b) => a - b);
};

export const searchingAlgorithms = [
  {
    id: "linear",
    name: "Linear Search",
    description: "A simple search algorithm that checks each element of the list until a match is found or the whole list has been searched.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    generateSteps: linearSearchSteps,
    requiresSorted: false,
    codeString: `function linearSearch(arr, target) {
  // Iterate through the array
  for (let i = 0; i < arr.length; i++) {
    // Check if current element equals target
    if (arr[i] === target) {
      return i; // Return index if found
    }
  }
  
  return -1; // Return -1 if not found
}`
  },
  {
    id: "binary",
    name: "Binary Search",
    description: "An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    generateSteps: binarySearchSteps,
    requiresSorted: true,
    codeString: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // Check if target is present at mid
    if (arr[mid] === target) {
      return mid;
    }
    
    // If target greater, ignore left half
    if (arr[mid] < target) {
      left = mid + 1;
    } 
    // If target smaller, ignore right half
    else {
      right = mid - 1;
    }
  }
  
  return -1; // Target not found
}`
  },
  {
    id: "jump",
    name: "Jump Search",
    description: "A search algorithm that works on sorted arrays by jumping ahead by fixed steps and then performing a linear search.",
    timeComplexity: "O(√n)",
    spaceComplexity: "O(1)",
    generateSteps: jumpSearchSteps,
    requiresSorted: true,
    codeString: `function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  
  // Finding the block where element is present
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      return -1;
    }
  }
  
  // Linear search in identified block
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) {
      return -1;
    }
  }
  
  // If element found
  if (arr[prev] === target) {
    return prev;
  }
  
  return -1; // Not found
}`
  },
  {
    id: "interpolation",
    name: "Interpolation Search",
    description: "An improved variant of binary search for uniformly distributed sorted arrays, estimating the position of the target value.",
    timeComplexity: "O(log log n)",
    spaceComplexity: "O(1)",
    generateSteps: interpolationSearchSteps,
    requiresSorted: true,
    codeString: `function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high && 
         target >= arr[low] && 
         target <= arr[high]) {
    // Calculate position
    let pos;
    if (high === low)
      pos = low;
    else
      pos = low + Math.floor(
        ((target - arr[low]) * (high - low)) / 
        (arr[high] - arr[low])
      );
    
    // Check if target is found
    if (arr[pos] === target)
      return pos;
    
    // If target is larger, search right
    if (arr[pos] < target)
      low = pos + 1;
    // If target is smaller, search left
    else
      high = pos - 1;
  }
  
  return -1; // Not found
}`
  },
  {
    id: "exponential",
    name: "Exponential Search",
    description: "A search algorithm that works on sorted arrays by finding a range where the target may exist and then using binary search.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    generateSteps: exponentialSearchSteps,
    requiresSorted: true,
    codeString: `function exponentialSearch(arr, target) {
  const n = arr.length;
  
  // If element is at first position
  if (arr[0] === target)
    return 0;
  
  // Find range for binary search
  let i = 1;
  while (i < n && arr[i] <= target)
    i = i * 2;
  
  // Do binary search for the found range
  return binarySearch(
    arr, 
    target, 
    i / 2, 
    Math.min(i, n - 1)
  );
  
  function binarySearch(arr, target, left, right) {
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (arr[mid] === target)
        return mid;
      
      if (arr[mid] < target)
        left = mid + 1;
      else
        right = mid - 1;
    }
    return -1;
  }
}`
  }
];
