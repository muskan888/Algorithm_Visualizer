
// Define the types for our algorithm patterns
export interface PatternExample {
  name: string;
  description: string;
  codeString: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface AlgorithmPattern {
  id: string;
  name: string;
  description: string;
  whenToUse: string;
  commonProblems: string[];
  examples: PatternExample[];
  difficulty?: string; // Added optional difficulty property
  keyPoints?: string[]; // Added optional keyPoints property
  approach?: string; // Added optional approach property
}

// Define all the algorithmic patterns
export const algorithmPatterns: AlgorithmPattern[] = [
  {
    id: "sliding-window",
    name: "Sliding Window",
    description: "A technique that involves creating a window which can either be an array or number from one position to another, and slide the window by one position based on a condition.",
    whenToUse: "Use when you need to process subarrays or substrings of a fixed or dynamic size.",
    commonProblems: [
      "Maximum sum subarray of size k",
      "Longest substring without repeating characters",
      "Min-size subarray sum ≥ target"
    ],
    difficulty: "Medium",
    approach: "Initialize a window with the first k elements of the array. Calculate the sum of this initial window. Then, slide the window by removing one element from the start and adding one element at the end. Recalculate the sum for each new window position, keeping track of the maximum sum encountered. This avoids recalculating the entire sum for each window, achieving O(n) time complexity.",
    keyPoints: [
      "Avoids recalculating overlapping elements",
      "Two types: Fixed-size and Variable-size windows",
      "Often combined with hash maps for string problems",
      "Great for subarray/substring problems"
    ],
    examples: [
      {
        name: "Maximum Sum Subarray of Size K",
        description: "Find the maximum sum of any contiguous subarray of size k.",
        codeString: `function maxSubarraySum(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  maxSum = windowSum;
  
  // Slide the window and calculate sums
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    ]
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    description: "Using two pointers to process elements from different positions, often moving towards each other or in the same direction at different speeds.",
    whenToUse: "Working with sorted arrays or finding pairs/triplets with certain conditions.",
    commonProblems: [
      "Remove duplicates from sorted array",
      "Two Sum (sorted version)",
      "Container with most water"
    ],
    difficulty: "Easy",
    approach: "Start with two pointers at different positions (often at the beginning and end of an array). Move the pointers based on certain conditions until they meet or a solution is found. This technique efficiently handles problems that would otherwise require nested loops, reducing the time complexity from O(n²) to O(n).",
    keyPoints: [
      "Works best with sorted arrays",
      "Can detect cycles efficiently",
      "Uses constant extra space",
      "Can be used for in-place operations"
    ],
    examples: [
      {
        name: "Two Sum (Sorted)",
        description: "Given a sorted array, find two numbers that add up to a target.",
        codeString: `function twoSum(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const sum = nums[left] + nums[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return [-1, -1]; // Not found
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    ]
  },
  {
    id: "fast-slow-pointers",
    name: "Fast & Slow Pointers",
    description: "Two pointers that move at different speeds, typically used for cycle detection.",
    whenToUse: "You need to detect cycles, especially in linked lists or graphs.",
    commonProblems: [
      "Detect cycle in linked list",
      "Find start of cycle",
      "Happy Number"
    ],
    difficulty: "Medium",
    approach: "Use two pointers moving at different speeds (usually one moving twice as fast as the other). If there's a cycle, the fast pointer will eventually catch up to the slow pointer. This is also known as Floyd's Cycle Detection algorithm or the 'tortoise and hare' algorithm, and it's particularly useful for linked list problems.",
    keyPoints: [
      "Excellent for cycle detection",
      "Uses constant extra space",
      "Can find the middle of a linked list in one pass",
      "Can detect the start of a cycle with additional logic"
    ],
    examples: [
      {
        name: "Detect Cycle in Linked List",
        description: "Determine if a linked list has a cycle using Floyd's Cycle Detection algorithm.",
        codeString: `function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) return true;
  }
  
  return false;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    ]
  },
  {
    id: "prefix-sum",
    name: "Prefix Sum",
    description: "Precompute cumulative sums to enable efficient range-based queries.",
    whenToUse: "You need range-based queries or updates, or want to optimize repeated sum calculations.",
    commonProblems: [
      "Subarray sum equals k",
      "Range sum queries",
      "Minimum number of operations to make array equal"
    ],
    difficulty: "Medium",
    approach: "Precompute the cumulative sum of elements up to each position in an array. This allows for O(1) calculation of any subarray sum by simple subtraction. Often combined with a hashmap to solve problems like 'number of subarrays with sum equal to k'. The key insight is that if prefixSum[j] - prefixSum[i] = k, then the subarray from (i+1) to j has sum k.",
    keyPoints: [
      "Transforms range sum queries from O(n) to O(1)",
      "Can be extended to 2D arrays for matrix sum queries",
      "Often used with hashmaps to track previous sums",
      "Useful for solving equilibrium index problems"
    ],
    examples: [
      {
        name: "Subarray Sum Equals K",
        description: "Find the number of subarrays with sum equal to k.",
        codeString: `function subarraySum(nums, k) {
  const prefixSums = new Map();
  prefixSums.set(0, 1);
  
  let sum = 0;
  let count = 0;
  
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    
    if (prefixSums.has(sum - k)) {
      count += prefixSums.get(sum - k);
    }
    
    prefixSums.set(sum, (prefixSums.get(sum) || 0) + 1);
  }
  
  return count;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      }
    ]
  },
  {
    id: "variable-sliding-window",
    name: "Variable Sliding Window",
    description: "A sliding window where the size changes dynamically based on certain conditions.",
    whenToUse: "Window size varies depending on a condition (often used with strings).",
    commonProblems: [
      "Longest substring with k distinct characters",
      "Permutation in string",
      "Minimum window substring"
    ],
    difficulty: "Medium",
    approach: "Start with a window of size 0 and expand it by moving the right boundary until a condition is violated. Then shrink the window by moving the left boundary until the condition is satisfied again. This way, the window size varies based on the input. Often uses a hashmap or count array to track frequency of elements in the window.",
    keyPoints: [
      "More flexible than fixed-size sliding window",
      "Adapts window size based on conditions",
      "Often uses hashmap to track window contents",
      "Great for substring problems with variable constraints"
    ],
    examples: [
      {
        name: "Longest Substring with K Distinct Characters",
        description: "Find the longest substring with at most k distinct characters.",
        codeString: `function longestSubstringKDistinct(s, k) {
  if (s.length === 0 || k === 0) return 0;
  
  const charCount = new Map();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
    
    // Shrink window until we have at most k distinct characters
    while (charCount.size > k) {
      const leftChar = s[left];
      charCount.set(leftChar, charCount.get(leftChar) - 1);
      
      if (charCount.get(leftChar) === 0) {
        charCount.delete(leftChar);
      }
      
      left++;
    }
    
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(k)"
      }
    ]
  },
  {
    id: "hash-map",
    name: "Hash Map / Frequency Counter",
    description: "Use maps or objects to count occurrences or track relationships between elements.",
    whenToUse: "You need to count occurrences or manage relationships between elements.",
    commonProblems: [
      "Anagrams",
      "Top K frequent elements",
      "Subarrays with sum divisible by k"
    ],
    difficulty: "Easy",
    approach: "Count the frequency of elements or characters using a hash map (or object). This provides O(1) lookup time and helps avoid nested loops. It's particularly useful for problems involving counting, checking if elements exist, or finding elements with specific frequencies.",
    keyPoints: [
      "Provides O(1) lookup and insertion",
      "Avoids nested loops for comparison operations",
      "Useful for frequency counting problems",
      "Can be combined with other patterns like sliding window"
    ],
    examples: [
      {
        name: "Valid Anagram",
        description: "Determine if two strings are anagrams of each other.",
        codeString: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const charCount = new Map();
  
  // Count characters in first string
  for (let char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  // Check against second string
  for (let char of t) {
    if (!charCount.has(char) || charCount.get(char) === 0) {
      return false;
    }
    
    charCount.set(char, charCount.get(char) - 1);
  }
  
  return true;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)" // Assuming fixed character set
      }
    ]
  },
  {
    id: "binary-search",
    name: "Binary Search",
    description: "A divide and conquer algorithm that finds the position of a target value within a sorted array.",
    whenToUse: "Problem involves searching in sorted structure or min/max value that satisfies a condition.",
    commonProblems: [
      "Find peak element",
      "Minimum in rotated sorted array",
      "Koko Eating Bananas"
    ],
    difficulty: "Medium",
    approach: "Divide the search space in half at each step by comparing the middle element with the target. If the middle element is equal to the target, the search is complete. If the target is less than the middle element, search the left half; otherwise, search the right half. This reduces the search space by half in each step, leading to O(log n) time complexity.",
    keyPoints: [
      "Requires a sorted array or monotonic function",
      "Logarithmic O(log n) time complexity",
      "Can be used on answer space when direct search isn't applicable",
      "Variants include lower bound, upper bound, and binary search on answer"
    ],
    examples: [
      {
        name: "Binary Search Implementation",
        description: "Find a target in a sorted array.",
        codeString: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Not found
}`,
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)"
      }
    ]
  },
  {
    id: "backtracking",
    name: "Backtracking",
    description: "An algorithmic technique that incrementally builds candidates to the solutions and abandons candidates as soon as it determines they cannot lead to a valid solution.",
    whenToUse: "You need to explore all possibilities, especially with constraints.",
    commonProblems: [
      "N-Queens",
      "Sudoku Solver",
      "Subsets / Permutations / Combinations"
    ],
    difficulty: "Hard",
    approach: "Build solutions incrementally by making choices and exploring further. If a choice leads to an invalid state, backtrack by undoing the last choice and trying a different option. This is effectively a depth-first search through the solution space with pruning. Use recursion to implement backtracking, with base cases representing complete solutions.",
    keyPoints: [
      "Systematically explores all possible solutions",
      "Prunes branches that can't lead to valid solutions",
      "Uses recursion with a clear backtracking step",
      "Often visualized as a decision tree exploration"
    ],
    examples: [
      {
        name: "Generate All Subsets",
        description: "Generate all possible subsets of a given set.",
        codeString: `function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    // Add the current subset to our result
    result.push([...current]);
    
    // Explore further by adding each remaining element
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop(); // Backtrack
    }
  }
  
  backtrack(0, []);
  return result;
}`,
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)"
      }
    ]
  },
  {
    id: "recursion-memoization",
    name: "Recursion + Memoization",
    description: "Top-down dynamic programming approach where recursive calls are optimized by caching results.",
    whenToUse: "Solving problems with overlapping subproblems using recursion + cache.",
    commonProblems: [
      "Fibonacci",
      "Climbing stairs",
      "Word break",
      "Edit distance"
    ],
    difficulty: "Medium",
    approach: "Implement a recursive function that solves the problem directly. Add a cache (usually a hash map) to store the results of subproblems that have already been computed. Before calculating the solution for a subproblem, check if it's already in the cache. This transforms exponential recursion into polynomial time by eliminating redundant calculations.",
    keyPoints: [
      "Combines recursion with caching of results",
      "Top-down approach to dynamic programming",
      "Avoids recalculating already solved subproblems",
      "Great for problems with complex state transitions"
    ],
    examples: [
      {
        name: "Fibonacci with Memoization",
        description: "Calculate the nth Fibonacci number with memoization.",
        codeString: `function fibonacci(n, memo = {}) {
  // Base cases
  if (n <= 1) return n;
  
  // Check if we've already computed this value
  if (memo[n] !== undefined) return memo[n];
  
  // Calculate and store result
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      }
    ]
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    description: "Bottom-up approach to solving problems by breaking them down into simpler subproblems and solving each one only once.",
    whenToUse: "Optimizing repeated subproblems — usually with optimal substructure + overlapping.",
    commonProblems: [
      "0/1 Knapsack",
      "Longest Common Subsequence",
      "House Robber",
      "Partition Equal Subset Sum"
    ],
    difficulty: "Hard",
    approach: "Identify overlapping subproblems and optimal substructure in the problem. Create a table (often an array or matrix) to store solutions to subproblems. Iteratively fill the table starting from the simplest subproblems and building towards the complete solution. This bottom-up approach avoids the call stack overhead of recursion.",
    keyPoints: [
      "Bottom-up approach avoiding recursion",
      "Uses tabulation to store subproblem solutions",
      "Often reduces space complexity compared to memoization",
      "Requires careful definition of the recurrence relation"
    ],
    examples: [
      {
        name: "Climbing Stairs",
        description: "Count the number of ways to climb n stairs, taking 1 or 2 steps at a time.",
        codeString: `function climbStairs(n) {
  if (n <= 2) return n;
  
  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)"
      }
    ]
  },
  {
    id: "greedy",
    name: "Greedy Algorithm",
    description: "Makes locally optimal choices at each step with the hope of finding a global optimum.",
    whenToUse: "You can make a locally optimal choice at each step that leads to a global optimum.",
    commonProblems: [
      "Activity selection",
      "Gas Station",
      "Jump Game",
      "Minimum platforms"
    ],
    difficulty: "Medium",
    approach: "At each step, make the choice that seems best at the moment (locally optimal) without considering all future consequences. This approach only works when the problem has optimal substructure and a greedy choice property. Unlike dynamic programming, greedy algorithms don't consider all potential choices for each step.",
    keyPoints: [
      "Makes locally optimal choices at each step",
      "Doesn't reconsider previous choices",
      "Much faster than exhaustive approaches",
      "Doesn't work for all problems - requires proof of correctness"
    ],
    examples: [
      {
        name: "Jump Game",
        description: "Determine if you can reach the last index of an array, where each element represents your maximum jump length.",
        codeString: `function canJump(nums) {
  let maxReach = 0;
  
  for (let i = 0; i < nums.length; i++) {
    // If we can't reach the current position, return false
    if (i > maxReach) return false;
    
    // Update the furthest we can reach
    maxReach = Math.max(maxReach, i + nums[i]);
    
    // If we can reach the end, return true
    if (maxReach >= nums.length - 1) return true;
  }
  
  return true;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    ]
  },
  {
    id: "graph-traversal",
    name: "DFS / BFS",
    description: "Depth-First Search and Breadth-First Search are two common graph traversal algorithms.",
    whenToUse: "Traversing graphs/trees, connected components, shortest paths, cycle detection.",
    commonProblems: [
      "Word ladder",
      "Number of islands",
      "Clone graph",
      "Rotten oranges"
    ],
    difficulty: "Medium",
    approach: "DFS explores as far as possible along a branch before backtracking, typically implemented using recursion or a stack. BFS explores all neighbors at the present depth before moving to nodes at the next depth level, implemented using a queue. DFS is good for exploring all possible paths, while BFS excels at finding shortest paths in unweighted graphs.",
    keyPoints: [
      "DFS uses stack (or recursion), BFS uses queue",
      "BFS finds shortest paths in unweighted graphs",
      "Always mark nodes as visited to avoid cycles",
      "Can be adapted for various graph problems"
    ],
    examples: [
      {
        name: "Number of Islands",
        description: "Count the number of islands in a 2D grid.",
        codeString: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  
  function dfs(row, col) {
    // Check boundaries or if cell is water
    if (row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] === '0') {
      return;
    }
    
    // Mark as visited
    grid[row][col] = '0';
    
    // Explore in all four directions
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        count++;
        dfs(row, col);
      }
    }
  }
  
  return count;
}`,
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)"
      }
    ]
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    description: "Ordering vertices in a directed graph where for each directed edge (u, v), vertex u comes before vertex v in the ordering.",
    whenToUse: "Solving dependency problems on DAGs (Directed Acyclic Graphs).",
    commonProblems: [
      "Course schedule",
      "Build system order"
    ],
    difficulty: "Medium",
    approach: "There are two main approaches: Kahn's algorithm uses indegree counting and a queue to iteratively remove nodes with no dependencies. The DFS-based approach performs a depth-first search and adds nodes to the result in post-order (after exploring all neighbors). Both methods detect cycles if a valid ordering can't be found.",
    keyPoints: [
      "Only works on Directed Acyclic Graphs (DAGs)",
      "Can detect cycles in directed graphs",
      "Useful for scheduling and dependency problems",
      "Two approaches: Kahn's algorithm and DFS-based"
    ],
    examples: [
      {
        name: "Course Schedule",
        description: "Determine if it's possible to finish all courses given prerequisites.",
        codeString: `function canFinish(numCourses, prerequisites) {
  // Build adjacency list
  const graph = new Array(numCourses).fill().map(() => []);
  const inDegree = new Array(numCourses).fill(0);
  
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }
  
  // Add all courses with no prerequisites to the queue
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  let count = 0;
  
  // Process courses in topological order
  while (queue.length > 0) {
    const current = queue.shift();
    count++;
    
    for (const next of graph[current]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  
  return count === numCourses;
}`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)"
      }
    ]
  },
  {
    id: "union-find",
    name: "Union-Find",
    description: "A data structure that tracks a set of elements partitioned into non-overlapping subsets.",
    whenToUse: "Working with connected components or merging sets efficiently.",
    commonProblems: [
      "Number of connected components",
      "Detect cycle in undirected graph",
      "Accounts merge"
    ],
    difficulty: "Medium",
    approach: "Maintain a representative (root) for each set. Two main operations: find(x) returns the root of x's set, and union(x,y) merges the sets containing x and y. Optimizations include path compression (flattening the tree during find) and union by rank/size (attaching smaller trees to larger ones), which bring the amortized time complexity close to O(1) per operation.",
    keyPoints: [
      "Uses two operations: find and union",
      "Path compression and union by rank/size optimize performance",
      "Near-constant time operations with optimizations",
      "Excellent for dynamic connectivity problems"
    ],
    examples: [
      {
        name: "Number of Connected Components",
        description: "Count the number of connected components in an undirected graph.",
        codeString: `function countComponents(n, edges) {
  // Initialize parents and rank
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(1);
  
  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // Path compression
    }
    return parent[x];
  }
  
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    
    if (rootX === rootY) return false;
    
    // Union by rank
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
    
    return true;
  }
  
  let components = n;
  
  // Process all edges
  for (const [u, v] of edges) {
    if (union(u, v)) {
      components--;
    }
  }
  
  return components;
}`,
        timeComplexity: "O(n + m*α(n))",
        spaceComplexity: "O(n)"
      }
    ]
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    description: "Using bitwise operations to manipulate individual bits within binary representations of data.",
    whenToUse: "You need to work with binary representation, optimization, or toggling bits.",
    commonProblems: [
      "Single number",
      "Subsets using bitmasking",
      "Power of two"
    ],
    difficulty: "Medium",
    approach: "Use bitwise operators like AND (&), OR (|), XOR (^), NOT (~), and shifts (<<, >>) to manipulate individual bits. Common techniques include using XOR to find unpaired elements, bit masking to generate combinations, checking if a number is a power of 2 with (x & (x-1)), and using shifts for multiplication or division by powers of 2.",
    keyPoints: [
      "Extremely efficient for certain operations",
      "Common operations: set/clear/toggle/check bits",
      "XOR is particularly useful for finding unpaired elements",
      "Bit masking can represent sets compactly"
    ],
    examples: [
      {
        name: "Single Number",
        description: "Find the element that appears only once in an array where all other elements appear twice.",
        codeString: `function singleNumber(nums) {
  let result = 0;
  
  for (const num of nums) {
    result ^= num; // XOR operation
  }
  
  return result;
}`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    ]
  }
];

// Generate visualization steps for a pattern example
export const generatePatternExample = (patternId: string, exampleIndex: number = 0) => {
  const pattern = algorithmPatterns.find(p => p.id === patternId);
  if (!pattern || !pattern.examples[exampleIndex]) {
    return [];
  }
  
  const example = pattern.examples[exampleIndex];
  
  // Map to store the visualization steps for different algorithm patterns
  const stepsGenerators: Record<string, () => any[]> = {
    'sliding-window': () => {
      // Mock sliding window visualization
      const arr = [1, 3, 2, 6, 1, 4, 2, 8, 9];
      const k = 3;
      const steps = [];
      
      // Initial state
      steps.push({
        array: arr.map(value => ({ value })),
        description: "Original array with window size k = 3"
      });
      
      // Calculate sum of first window
      let windowSum = 0;
      for (let i = 0; i < k; i++) {
        windowSum += arr[i];
        steps.push({
          array: arr.map((value, idx) => ({ value })),
          comparisons: [0, 1, 2],
          current: [i],
          windowSum,
          maxSum: windowSum,
          description: `Adding arr[${i}] = ${arr[i]} to window sum. Current sum: ${windowSum}`
        });
      }
      
      let maxSum = windowSum;
      
      // Slide window
      for (let i = k; i < arr.length; i++) {
        // Remove leftmost element
        steps.push({
          array: arr.map((value, idx) => ({ value })),
          comparisons: [i-k, i],
          windowSum,
          maxSum,
          description: `Removing arr[${i-k}] = ${arr[i-k]} and adding arr[${i}] = ${arr[i]}`
        });
        
        windowSum = windowSum - arr[i - k] + arr[i];
        
        // Highlight current window
        const windowIndices = Array.from({ length: k }, (_, j) => i - k + 1 + j);
        steps.push({
          array: arr.map((value, idx) => ({ value })),
          windowIndices,
          windowSum,
          maxSum,
          description: `Current window sum: ${windowSum}, Max sum so far: ${maxSum}`
        });
        
        // Update max if needed
        if (windowSum > maxSum) {
          maxSum = windowSum;
          steps.push({
            array: arr.map((value, idx) => ({ value })),
            windowIndices,
            found: windowIndices,
            windowSum,
            maxSum,
            description: `New max sum found: ${maxSum}`
          });
        }
      }
      
      // Final result
      steps.push({
        array: arr.map((value, idx) => ({ value })),
        windowSum,
        maxSum,
        description: `Final maximum sum subarray: ${maxSum}`
      });
      
      return steps;
    },
    
    'two-pointers': () => {
      // Mock two pointers visualization
      const arr = [1, 3, 4, 5, 7, 10, 11, 13];
      const target = 11;
      const steps = [];
      
      steps.push({
        array: arr.map(value => ({ value })),
        description: `Finding two numbers that sum to ${target} using two pointers`
      });
      
      let left = 0;
      let right = arr.length - 1;
      
      while (left < right) {
        const sum = arr[left] + arr[right];
        
        steps.push({
          array: arr.map(value => ({ value })),
          current: [left],
          swaps: [right],
          left,
          right,
          sum,
          description: `Left pointer at index ${left} (value ${arr[left]}), Right pointer at index ${right} (value ${arr[right]}), Sum = ${sum}`
        });
        
        if (sum === target) {
          steps.push({
            array: arr.map(value => ({ value })),
            found: [left, right],
            left,
            right,
            sum,
            description: `Found pair: [${left}, ${right}] with values [${arr[left]}, ${arr[right]}] that sum to ${target}`
          });
          break;
        } else if (sum < target) {
          steps.push({
            array: arr.map(value => ({ value })),
            current: [left],
            left,
            right,
            sum,
            description: `Sum ${sum} < target ${target}, moving left pointer right`
          });
          left++;
        } else {
          steps.push({
            array: arr.map(value => ({ value })),
            swaps: [right],
            left,
            right,
            sum,
            description: `Sum ${sum} > target ${target}, moving right pointer left`
          });
          right--;
        }
      }
      
      return steps;
    },
    
    'fast-slow-pointers': () => {
      // Creating a more comprehensive linked list visualization
      const nodes = [
        { id: '1', value: 1, next: '2' },
        { id: '2', value: 2, next: '3' },
        { id: '3', value: 3, next: '4' },
        { id: '4', value: 4, next: '5' },
        { id: '5', value: 5, next: '6' },
        { id: '6', value: 6, next: '7' },
        { id: '7', value: 7, next: '3' }, // Creates a cycle back to node 3
      ];
      
      const steps = [];
      
      steps.push({
        linkedList: nodes,
        description: "Detecting a cycle using fast and slow pointers"
      });
      
      let slow = 0;
      let fast = 0;
      let step = 1;
      
      // Simulating Floyd's Cycle Detection Algorithm
      while (step <= 10) {
        // Move slow pointer by 1
        slow = (slow + 1) % nodes.length;
        
        // Move fast pointer by 2
        fast = (fast + 1) % nodes.length;
        fast = (fast + 1) % nodes.length;
        
        steps.push({
          linkedList: nodes,
          slowPointer: slow,
          fastPointer: fast,
          description: `Step ${step}: Slow pointer at node ${nodes[slow].value}, Fast pointer at node ${nodes[fast].value}`
        });
        
        if (slow === fast) {
          steps.push({
            linkedList: nodes,
            slowPointer: slow,
            fastPointer: fast,
            cycleDetected: true,
            cycleNodes: [2, 3, 4, 5, 6], // Nodes in cycle
            description: "Cycle detected! Slow and fast pointers have met."
          });
          break;
        }
        
        step++;
      }
      
      return steps;
    },
    
    'prefix-sum': () => {
      // Prefix sum visualization
      const arr = [3, 1, 4, 1, 5, 9, 2, 6];
      const targetSum = 10;
      const steps = [];
      
      steps.push({
        array: arr.map(value => ({ value })),
        description: "Using prefix sums to find subarrays with sum equal to " + targetSum
      });
      
      const prefixSums = [0]; // Include 0 for empty subarray
      let currentSum = 0;
      const prefixSumMap = { 0: 1 }; // To count subarrays
      let count = 0;
      
      for (let i = 0; i < arr.length; i++) {
        // Add current element to sum
        currentSum += arr[i];
        prefixSums.push(currentSum);
        
        // Check if we can make target sum with any previous prefix sum
        const complement = currentSum - targetSum;
        
        steps.push({
          array: arr.map(value => ({ value })),
          current: [i],
          prefixSums,
          currentSum,
          targetSum,
          description: `Adding element arr[${i}] = ${arr[i]} to running sum. Current sum = ${currentSum}`
        });
        
        if (prefixSumMap[complement]) {
          count += prefixSumMap[complement];
          steps.push({
            array: arr.map(value => ({ value })),
            current: [i],
            found: [i],
            prefixSums,
            currentSum,
            targetSum,
            freqMap: {...prefixSumMap},
            description: `Found ${prefixSumMap[complement]} subarray(s) with sum ${targetSum} ending at index ${i}`
          });
        }
        
        // Update frequency map
        prefixSumMap[currentSum] = (prefixSumMap[currentSum] || 0) + 1;
        
        steps.push({
          array: arr.map(value => ({ value })),
          current: [i],
          prefixSums,
          currentSum,
          targetSum,
          freqMap: {...prefixSumMap},
          description: `Updated prefix sum map. Sum ${currentSum} appears ${prefixSumMap[currentSum]} time(s)`
        });
      }
      
      steps.push({
        array: arr.map(value => ({ value })),
        prefixSums,
        currentSum,
        targetSum,
        description: `Found a total of ${count} subarrays with sum ${targetSum}`
      });
      
      return steps;
    },
    
    'variable-sliding-window': () => {
      // Variable sliding window visualization
      const s = "aabacbebebc";
      const k = 3; // Maximum distinct characters
      const steps = [];
      
      steps.push({
        array: s.split('').map(char => ({ value: char })),
        description: `Finding longest substring with at most ${k} distinct characters`
      });
      
      let left = 0;
      let maxLength = 0;
      let maxStart = 0;
      let maxEnd = 0;
      const charCount = {};
      
      for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        
        // Add new character to window
        charCount[rightChar] = (charCount[rightChar] || 0) + 1;
        
        steps.push({
          array: s.split('').map(char => ({ value: char })),
          windowIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
          current: [right],
          freqMap: {...charCount},
          left,
          right,
          description: `Added character '${rightChar}' at position ${right} to window. Distinct chars: ${Object.keys(charCount).length}`
        });
        
        // Shrink window if needed
        while (Object.keys(charCount).length > k) {
          const leftChar = s[left];
          
          steps.push({
            array: s.split('').map(char => ({ value: char })),
            windowIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            comparisons: [left],
            current: [right],
            freqMap: {...charCount},
            left,
            right,
            description: `Window has ${Object.keys(charCount).length} distinct chars, exceeding limit ${k}. Shrinking from left.`
          });
          
          charCount[leftChar]--;
          if (charCount[leftChar] === 0) {
            delete charCount[leftChar];
          }
          
          left++;
          
          steps.push({
            array: s.split('').map(char => ({ value: char })),
            windowIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            current: [left-1, right],
            freqMap: {...charCount},
            left,
            right,
            description: `Removed character '${leftChar}' from window. Window now has ${Object.keys(charCount).length} distinct chars.`
          });
        }
        
        // Update max length
        if (right - left + 1 > maxLength) {
          maxLength = right - left + 1;
          maxStart = left;
          maxEnd = right;
          
          steps.push({
            array: s.split('').map(char => ({ value: char })),
            windowIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            found: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            freqMap: {...charCount},
            left,
            right,
            description: `New longest substring found with length ${maxLength}: "${s.substring(left, right + 1)}"`
          });
        }
      }
      
      // Final result
      steps.push({
        array: s.split('').map(char => ({ value: char })),
        found: Array.from({ length: maxEnd - maxStart + 1 }, (_, i) => maxStart + i),
        description: `Longest substring with at most ${k} distinct characters has length ${maxLength}: "${s.substring(maxStart, maxEnd + 1)}"`
      });
      
      return steps;
    },
    
    'hash-map': () => {
      // Frequency counter visualization - find duplicates
      const arr = [1, 2, 3, 2, 4, 5, 3, 6];
      const steps = [];
      
      steps.push({
        array: arr.map(value => ({ value })),
        description: "Finding duplicates using frequency counter"
      });
      
      const freqMap = {};
      const duplicates = [];
      
      for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        
        steps.push({
          array: arr.map(value => ({ value })),
          current: [i],
          freqMap: {...freqMap},
          description: `Checking element arr[${i}] = ${current}`
        });
        
        if (freqMap[current]) {
          duplicates.push(current);
          steps.push({
            array: arr.map(value => ({ value })),
            found: arr.map((val, idx) => val === current ? idx : -1).filter(idx => idx !== -1),
            freqMap: {...freqMap},
            description: `Found duplicate: ${current} appears multiple times`
          });
          freqMap[current]++;
        } else {
          freqMap[current] = 1;
          steps.push({
            array: arr.map(value => ({ value })),
            current: [i],
            freqMap: {...freqMap},
            description: `First occurrence of ${current}, adding to frequency map`
          });
        }
      }
      
      steps.push({
        array: arr.map(value => ({ value })),
        found: duplicates.length > 0 ? 
          arr.map((val, idx) => duplicates.includes(val) ? idx : -1).filter(idx => idx !== -1) : 
          [],
        freqMap: {...freqMap},
        description: duplicates.length > 0 ? 
          `Duplicates found: ${duplicates.join(', ')}` : 
          "No duplicates found"
      });
      
      return steps;
    },
    
    'binary-search': () => {
      // Binary search visualization
      const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17];
      const target = 11;
      const steps = [];
      
      steps.push({
        array: arr.map(value => ({ value })),
        description: `Searching for target ${target} using binary search`,
        target
      });
      
      let left = 0;
      let right = arr.length - 1;
      let found = false;
      
      while (left <= right && !found) {
        const mid = Math.floor((left + right) / 2);
        
        steps.push({
          array: arr.map(value => ({ value })),
          current: [mid],
          comparisons: [left, right],
          left,
          right,
          mid,
          target,
          description: `Comparing middle element arr[${mid}] = ${arr[mid]} with target ${target}`
        });
        
        if (arr[mid] === target) {
          steps.push({
            array: arr.map(value => ({ value })),
            found: [mid],
            left,
            right,
            mid,
            target,
            description: `Found target ${target} at index ${mid}`
          });
          found = true;
        } else if (arr[mid] < target) {
          steps.push({
            array: arr.map(value => ({ value })),
            current: [mid],
            visited: Array.from({ length: mid - left + 1 }, (_, i) => left + i),
            left,
            right,
            mid,
            target,
            description: `arr[${mid}] = ${arr[mid]} < target ${target}, search in right half`
          });
          left = mid + 1;
        } else {
          steps.push({
            array: arr.map(value => ({ value })),
            current: [mid],
            visited: Array.from({ length: right - mid + 1 }, (_, i) => mid + i),
            left,
            right,
            mid,
            target,
            description: `arr[${mid}] = ${arr[mid]} > target ${target}, search in left half`
          });
          right = mid - 1;
        }
      }
      
      if (!found) {
        steps.push({
          array: arr.map(value => ({ value })),
          left,
          right,
          target,
          description: `Target ${target} not found in the array`
        });
      }
      
      return steps;
    },
    
    'backtracking': () => {
      // Backtracking visualization - generating subsets
      const arr = [1, 2, 3];
      const steps = [];
      
      steps.push({
        array: arr.map(value => ({ value })),
        description: "Generating all subsets using backtracking"
      });
      
      const result = [[]];
      steps.push({
        array: arr.map(value => ({ value })),
        current: [],
        description: "Starting with empty subset []"
      });
      
      // Simulate backtracking
      // Include 1
      steps.push({
        array: arr.map(value => ({ value })),
        current: [0],
        description: "Including element 1"
      });
      result.push([1]);
      
      // Include 1,2
      steps.push({
        array: arr.map(value => ({ value })),
        current: [0, 1],
        description: "Including elements 1,2"
      });
      result.push([1, 2]);
      
      // Include 1,2,3
      steps.push({
        array: arr.map(value => ({ value })),
        current: [0, 1, 2],
        description: "Including elements 1,2,3"
      });
      result.push([1, 2, 3]);
      
      // Backtrack and remove 3, then include 1,3
      steps.push({
        array: arr.map(value => ({ value })),
        current: [0, 1],
        visited: [2],
        description: "Backtracking: removing 3"
      });
      
      steps.push({
        array: arr.map(value => ({ value })),
        current: [0, 2],
        description: "Including elements 1,3"
      });
      result.push([1, 3]);
      
      // Backtrack and remove 1, then include 2
      steps.push({
        array: arr.map(value => ({ value })),
        current: [0],
        visited: [1, 2],
        description: "Backtracking: removing 3, then 1"
      });
      
      steps.push({
        array: arr.map(value => ({ value })),
        current: [1],
        description: "Including element 2"
      });
      result.push([2]);
      
      // Include 2,3
      steps.push({
        array: arr.map(value => ({ value })),
        current: [1, 2],
        description: "Including elements 2,3"
      });
      result.push([2, 3]);
      
      // Backtrack and include 3
      steps.push({
        array: arr.map(value => ({ value })),
        current: [2],
        description: "Including element 3"
      });
      result.push([3]);
      
      // Final result
      steps.push({
        array: arr.map(value => ({ value })),
        description: `Generated all ${result.length} subsets: ${JSON.stringify(result)}`
      });
      
      return steps;
    },
    
    'dynamic-programming': () => {
      // Fibonacci dynamic programming visualization
      const steps = [];
      const n = 6;
      const fib = [0, 1];
      
      steps.push({
        array: fib.map(value => ({ value })),
        memo: { 0: 0, 1: 1 },
        description: `Building Fibonacci sequence up to n = ${n} using dynamic programming`
      });
      
      for (let i = 2; i <= n; i++) {
        const nextFib = fib[i-1] + fib[i-2];
        fib.push(nextFib);
        
        const memoState = {};
        for (let j = 0; j <= i; j++) {
          memoState[j] = fib[j];
        }
        
        steps.push({
          array: fib.map(value => ({ value })),
          comparisons: [i-1, i-2],
          current: [i],
          memo: {...memoState},
          description: `F(${i}) = F(${i-1}) + F(${i-2}) = ${fib[i-1]} + ${fib[i-2]} = ${nextFib}`
        });
      }
      
      steps.push({
        array: fib.map(value => ({ value })),
        found: [n],
        memo: Object.fromEntries(fib.map((val, idx) => [idx, val])),
        description: `Fibonacci(${n}) = ${fib[n]}`
      });
      
      return steps;
    },
    
    'recursion-memoization': () => {
      // Recursion + memoization visualization (fibonacci)
      const steps = [];
      const n = 6;
      
      steps.push({
        array: [0, 1].map(value => ({ value })),
        description: `Calculating Fibonacci(${n}) using recursion with memoization`
      });
      
      // Simulate the recursive calls with memoization
      const memo = { 0: 0, 1: 1 };
      const calls = [
        { n: 6, result: null },
        { n: 5, result: null },
        { n: 4, result: null },
        { n: 3, result: null },
        { n: 2, result: null },
        { n: 1, result: 1 },
        { n: 0, result: 0 },
        { n: 2, result: 1 }, // calculated
        { n: 3, result: 2 }, // calculated
        { n: 2, result: 1 }, // from memo
        { n: 1, result: 1 }, // from memo
        { n: 4, result: 3 }, // calculated
        { n: 3, result: 2 }, // from memo
        { n: 2, result: 1 }, // from memo
        { n: 5, result: 5 }, // calculated
        { n: 4, result: 3 }, // from memo
        { n: 3, result: 2 }, // from memo
        { n: 6, result: 8 }  // calculated
      ];
      
      const fibValues = [0, 1, 1, 2, 3, 5, 8];
      
      for (let i = 0; i < calls.length; i++) {
        const call = calls[i];
        
        if (call.result !== null) {
          // This call has a result
          memo[call.n] = call.result;
          
          // Build array showing values calculated so far
          const array = [];
          for (let j = 0; j <= Math.max(...Object.keys(memo).map(Number)); j++) {
            array.push({ value: memo[j] !== undefined ? memo[j] : "?" });
          }
          
          const fromMemo = i > 6 && Object.keys(memo).map(Number).includes(call.n) && 
                         calls.slice(0, i).some(c => c.n === call.n && c.result !== null);
          
          steps.push({
            array,
            current: [call.n],
            memo: {...memo},
            description: fromMemo 
              ? `Retrieved F(${call.n}) = ${call.result} from memoization cache` 
              : `Calculated F(${call.n}) = ${call.result}`
          });
        } else {
          // This is a new recursive call
          const array = [];
          for (let j = 0; j <= call.n; j++) {
            array.push({ value: memo[j] !== undefined ? memo[j] : "?" });
          }
          
          steps.push({
            array,
            current: [call.n],
            memo: {...memo},
            description: `Recursive call to calculate F(${call.n})`
          });
        }
      }
      
      // Final result with full array
      steps.push({
        array: fibValues.map(value => ({ value })),
        found: [n],
        memo: Object.fromEntries(fibValues.map((val, idx) => [idx, val])),
        description: `Fibonacci(${n}) = ${fibValues[n]} computed with memoization`
      });
      
      return steps;
    },
    
    'greedy': () => {
      // Coin change greedy algorithm
      const coins = [25, 10, 5, 1];
      const amount = 63;
      const steps = [];
      
      steps.push({
        array: coins.map(value => ({ value })),
        description: `Making change for ${amount} cents using greedy approach with coins: ${coins.join(', ')}`
      });
      
      let remaining = amount;
      const usedCoins: number[] = [];
      
      for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        
        while (remaining >= coin) {
          usedCoins.push(coin);
          remaining -= coin;
          
          steps.push({
            array: coins.map(value => ({ value })),
            current: [i],
            found: [i],
            description: `Using a ${coin} cent coin. Remaining: ${remaining} cents. Coins used: ${usedCoins.join(', ')}`
          });
        }
      }
      
      steps.push({
        array: coins.map(value => ({ value })),
        found: [0, 1, 2, 3].filter(i => usedCoins.includes(coins[i])),
        description: `Made change for ${amount} cents using ${usedCoins.length} coins: ${usedCoins.join(', ')}`
      });
      
      return steps;
    },
    
    'graph-traversal': () => {
      // Enhanced DFS/BFS visualization with proper graph data
      const nodes = [
        { id: 'A', position: { x: 100, y: 100 } },
        { id: 'B', position: { x: 200, y: 50 } },
        { id: 'C', position: { x: 300, y: 100 } },
        { id: 'D', position: { x: 250, y: 200 } },
        { id: 'E', position: { x: 150, y: 200 } }
      ];
      
      const edges = [
        { id: 'A-B', source: 'A', target: 'B' },
        { id: 'A-E', source: 'A', target: 'E' },
        { id: 'B-C', source: 'B', target: 'C' },
        { id: 'C-D', source: 'C', target: 'D' },
        { id: 'D-E', source: 'D', target: 'E' },
        { id: 'B-E', source: 'B', target: 'E' }
      ];
      
      const steps = [];
      
      // BFS visualization
      steps.push({
        nodes: nodes.map(node => ({ ...node, data: { ...node } })),
        edges: edges.map(edge => ({ ...edge, data: { ...edge } })),
        description: "BFS traversal starting from node A"
      });
      
      // Visit A
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            isStart: node.id === 'A',
            isCurrent: node.id === 'A',
            isVisited: node.id === 'A'
          }
        })),
        edges: edges.map(edge => ({ ...edge, data: { ...edge } })),
        description: "Starting BFS from node A. Add A to queue and mark as visited."
      });
      
      // Visit A's neighbors: B and E
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            isStart: node.id === 'A',
            isCurrent: node.id === 'B',
            isVisited: ['A', 'B'].includes(node.id),
            isComparing: node.id === 'E'
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isActive: edge.id === 'A-B' || edge.id === 'A-E'
          }
        })),
        description: "Dequeue A, visit its neighbors: B and E. Add them to queue."
      });
      
      // Visit E
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            isStart: node.id === 'A',
            isCurrent: node.id === 'E',
            isVisited: ['A', 'B', 'E'].includes(node.id)
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isActive: edge.id === 'A-E',
            isVisited: edge.id === 'A-B'
          }
        })),
        description: "Dequeue B, visit E. E is already visited, so skip its neighbors."
      });
      
      // Visit C from B
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            isStart: node.id === 'A',
            isCurrent: node.id === 'C',
            isVisited: ['A', 'B', 'E', 'C'].includes(node.id)
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isActive: edge.id === 'B-C',
            isVisited: ['A-B', 'A-E', 'B-E'].includes(edge.id)
          }
        })),
        description: "Dequeue E, explore its neighbors. Visit C from B."
      });
      
      // Visit D from C
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            isStart: node.id === 'A',
            isCurrent: node.id === 'D',
            isVisited: ['A', 'B', 'C', 'D', 'E'].includes(node.id)
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isActive: edge.id === 'C-D',
            isVisited: ['A-B', 'A-E', 'B-C', 'B-E'].includes(edge.id)
          }
        })),
        description: "Visit D from C. All nodes have been visited."
      });
      
      // BFS complete
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            isStart: node.id === 'A',
            isVisited: true,
            inCurrentPath: true
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isVisited: true
          }
        })),
        description: "BFS traversal complete. Visited all nodes in level order: A, B, E, C, D"
      });
      
      return steps;
    },
    
    'topological-sort': () => {
      // Topological sort visualization
      const nodes = [
        { id: 'A', position: { x: 100, y: 100 } },
        { id: 'B', position: { x: 200, y: 50 } },
        { id: 'C', position: { x: 300, y: 100 } },
        { id: 'D', position: { x: 250, y: 200 } },
        { id: 'E', position: { x: 150, y: 200 } }
      ];
      
      const edges = [
        { id: 'A-B', source: 'A', target: 'B' },
        { id: 'A-C', source: 'A', target: 'C' },
        { id: 'B-D', source: 'B', target: 'D' },
        { id: 'C-D', source: 'C', target: 'D' },
        { id: 'C-E', source: 'C', target: 'E' },
        { id: 'D-E', source: 'D', target: 'E' }
      ];
      
      const steps = [];
      
      steps.push({
        nodes: nodes.map(node => ({ ...node, data: { ...node } })),
        edges: edges.map(edge => ({ ...edge, data: { ...edge } })),
        description: "Topological sorting of a directed acyclic graph (DAG)"
      });
      
      const inDegree = {
        'A': 0,
        'B': 1,
        'C': 1,
        'D': 2,
        'E': 2
      };
      
      // Calculate in-degrees
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            label: `${node.id} (in: ${inDegree[node.id]})`
          }
        })),
        edges: edges.map(edge => ({ ...edge, data: { ...edge } })),
        description: "Calculate in-degree of each node. Nodes with in-degree 0 have no dependencies."
      });
      
      // Start with A (in-degree 0)
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            label: `${node.id} (in: ${inDegree[node.id]})`,
            isCurrent: node.id === 'A',
            isStart: node.id === 'A'
          }
        })),
        edges: edges.map(edge => ({ ...edge, data: { ...edge } })),
        description: "Start with node A, which has in-degree 0. Add A to result."
      });
      
      // Remove A, decrease in-degree of neighbors
      const updatedInDegree1 = { ...inDegree, 'B': 0, 'C': 0 };
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            label: `${node.id} (in: ${updatedInDegree1[node.id]})`,
            isVisited: node.id === 'A',
            isComparing: ['B', 'C'].includes(node.id)
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isActive: ['A-B', 'A-C'].includes(edge.id)
          }
        })),
        description: "Remove A and decrease in-degree of its neighbors B and C to 0."
      });
      
      // Process B (now has in-degree 0)
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            label: `${node.id} (in: ${updatedInDegree1[node.id]})`,
            isVisited: node.id === 'A',
            isCurrent: node.id === 'B'
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isVisited: edge.id === 'A-B',
            isActive: edge.id === 'A-C'
          }
        })),
        description: "Process B, which now has in-degree 0. Add B to result."
      });
      
      // Remove B, decrease in-degree of D
      const updatedInDegree2 = { ...updatedInDegree1, 'D': 1 };
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            label: `${node.id} (in: ${updatedInDegree2[node.id]})`,
            isVisited: ['A', 'B'].includes(node.id),
            isComparing: node.id === 'D'
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isVisited: ['A-B'].includes(edge.id),
            isActive: edge.id === 'B-D'
          }
        })),
        description: "Remove B and decrease in-degree of D to 1."
      });
      
      // Continue with more steps for a complete topological sort
      
      // Final result
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          data: {
            ...node,
            isVisited: true
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          data: {
            ...edge,
            isVisited: true
          }
        })),
        description: "Topological sort complete. Result: A, B, C, D, E"
      });
      
      return steps;
    },
    
    'union-find': () => {
      // Union-find visualization
      const elements = [0, 1, 2, 3, 4, 5, 6, 7];
      const steps = [];
      
      steps.push({
        array: elements.map(value => ({ value })),
        description: "Union-Find: Tracking connected components"
      });
      
      // Initial state - each element in its own set
      const parent = elements.map(i => i);
      const rank = elements.map(() => 1);
      
      steps.push({
        array: elements.map(value => ({ value })),
        freqMap: { parent: [...parent] },
        description: "Initial state: Each element is the root of its own set."
      });
      
      // Union operations
      const unions = [
        [0, 1], [2, 3], [4, 5], [6, 7],
        [0, 2], [4, 6], [0, 4]
      ];
      
      for (let i = 0; i < unions.length; i++) {
        const [x, y] = unions[i];
        
        steps.push({
          array: elements.map(value => ({ value })),
          current: [x],
          comparisons: [y],
          freqMap: { parent: [...parent], rank: [...rank] },
          description: `Union operation: Merge sets containing ${x} and ${y}`
        });
        
        // Find roots
        let rootX = x;
        while (parent[rootX] !== rootX) rootX = parent[rootX];
        
        let rootY = y;
        while (parent[rootY] !== rootY) rootY = parent[rootY];
        
        steps.push({
          array: elements.map(value => ({ value })),
          found: [rootX],
          swaps: [rootY],
          freqMap: { parent: [...parent], rank: [...rank] },
          description: `Found roots: ${rootX} for element ${x}, ${rootY} for element ${y}`
        });
        
        // Union by rank
        if (rootX !== rootY) {
          if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
            steps.push({
              array: elements.map(value => ({ value })),
              current: [rootX],
              swaps: [rootY],
              freqMap: { parent: [...parent], rank: [...rank] },
              description: `Rank[${rootX}] < Rank[${rootY}]: Make ${rootY} the parent of ${rootX}`
            });
          } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
            steps.push({
              array: elements.map(value => ({ value })),
              current: [rootY],
              swaps: [rootX],
              freqMap: { parent: [...parent], rank: [...rank] },
              description: `Rank[${rootX}] > Rank[${rootY}]: Make ${rootX} the parent of ${rootY}`
            });
          } else {
            parent[rootY] = rootX;
            rank[rootX]++;
            steps.push({
              array: elements.map(value => ({ value })),
              current: [rootY],
              swaps: [rootX],
              freqMap: { parent: [...parent], rank: [...rank] },
              description: `Ranks equal: Make ${rootX} the parent of ${rootY} and increment rank of ${rootX}`
            });
          }
        } else {
          steps.push({
            array: elements.map(value => ({ value })),
            current: [rootX],
            freqMap: { parent: [...parent], rank: [...rank] },
            description: `Elements ${x} and ${y} are already in the same set with root ${rootX}`
          });
        }
      }
      
      // Count components
      const roots = new Set();
      for (let i = 0; i < elements.length; i++) {
        let root = i;
        while (parent[root] !== root) root = parent[root];
        roots.add(root);
      }
      
      steps.push({
        array: elements.map(value => ({ value })),
        found: Array.from(roots),
        freqMap: { parent: [...parent], rank: [...rank] },
        description: `Final state: ${roots.size} connected components with roots: ${Array.from(roots).join(', ')}`
      });
      
      return steps;
    },
    
    'bit-manipulation': () => {
      // Bit manipulation visualization - finding single number
      const arr = [4, 1, 2, 1, 2];
      const steps = [];
      
      steps.push({
        array: arr.map(value => ({ value })),
        description: "Finding the single number using XOR bit manipulation"
      });
      
      let result = 0;
      for (let i = 0; i < arr.length; i++) {
        const prev = result;
        result ^= arr[i];
        
        // Format numbers in binary for better understanding
        const binary = (num) => num.toString(2).padStart(8, '0');
        
        steps.push({
          array: arr.map(value => ({ value })),
          current: [i],
          freqMap: { 
            decimal: { previous: prev, current: arr[i], result },
            binary: { previous: binary(prev), current: binary(arr[i]), result: binary(result) }
          },
          description: `XOR: ${prev} ^ ${arr[i]} = ${result} | Binary: ${binary(prev)} ^ ${binary(arr[i])} = ${binary(result)}`
        });
      }
      
      steps.push({
        array: arr.map(value => ({ value })),
        found: arr.map((value, idx) => value === result ? idx : -1).filter(idx => idx !== -1),
        description: `Found single number: ${result}`
      });
      
      return steps;
    }
  };
  
  // If we have a specific generator for this pattern, use it
  if (stepsGenerators[patternId]) {
    const steps = stepsGenerators[patternId]();
    
    // Add code highlighting to steps
    return steps.map((step, index) => ({
      ...step,
      highlightLine: index % Math.max(1, example.codeString.split('\n').length),
      codeHighlight: index % Math.max(1, example.codeString.split('\n').length)
    }));
  }
  
  // Default mock visualization for patterns without specific visualizations
  const mockArray = Array.from({ length: 8 }, (_, i) => i + 1);
  const steps = [
    {
      array: mockArray.map(value => ({ value })),
      description: `Visualizing the ${pattern.name} pattern`
    },
    {
      array: mockArray.map(value => ({ value })),
      current: [0, 1],
      description: "Processing initial elements"
    },
    {
      array: mockArray.map(value => ({ value })),
      comparisons: [2, 3],
      description: "Comparing elements"
    },
    {
      array: mockArray.map(value => ({ value })),
      swaps: [4, 5],
      description: "Working with elements"
    },
    {
      array: mockArray.map(value => ({ value })),
      found: [6, 7],
      description: "Final result"
    }
  ];
  
  // Add code highlighting to steps
  return steps.map((step, index) => ({
    ...step,
    highlightLine: index % Math.max(1, example.codeString.split('\n').length),
    codeHighlight: index % Math.max(1, example.codeString.split('\n').length)
  }));
};
