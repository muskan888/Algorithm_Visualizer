import { MarkerType } from '@xyflow/react';

// Define type for visualization steps
interface VisualizationStep {
  description: string;
  highlightLine: number;
  array?: any[];
  compareIndex?: number;
  current?: number[];
  found?: boolean | number[];
  visited?: number[];
  nodes?: any[];
  edges?: any[];
  animatePointers?: boolean;
  // Grid specific
  grid?: string[][];
  currentCell?: {row: number, col: number};
  visitedCells?: {[key: string]: boolean};
  islandCells?: {[key: string]: boolean};
  // Linked list specific
  linkedList?: any[];
  slowPointer?: number;
  fastPointer?: number;
  cycleDetected?: boolean;
  cycleNodes?: number[];
}

// Define and export sample graph data
export const sampleGraphData = {
  nodes: [
    { id: 'A', label: 'A', value: 'A', position: { x: 50, y: 100 } },
    { id: 'B', label: 'B', value: 'B', position: { x: 200, y: 50 } },
    { id: 'C', label: 'C', value: 'C', position: { x: 200, y: 150 } },
    { id: 'D', label: 'D', value: 'D', position: { x: 350, y: 100 } },
    { id: 'E', label: 'E', value: 'E', position: { x: 350, y: 200 } },
    { id: 'F', label: 'F', value: 'F', position: { x: 500, y: 150 } }
  ],
  edges: [
    { id: 'e1', source: 'A', target: 'B', label: '4', data: { weight: 4 } },
    { id: 'e2', source: 'A', target: 'C', label: '2', data: { weight: 2 } },
    { id: 'e3', source: 'B', target: 'D', label: '5', data: { weight: 5 } },
    { id: 'e4', source: 'C', target: 'D', label: '1', data: { weight: 1 } },
    { id: 'e5', source: 'C', target: 'E', label: '3', data: { weight: 3 } },
    { id: 'e6', source: 'D', target: 'F', label: '2', data: { weight: 2 } },
    { id: 'e7', source: 'E', target: 'F', label: '2', data: { weight: 2 } }
  ]
};

// Dijkstra's Algorithm code
const dijkstraCode = `function dijkstra(graph, start) {
  // Initialize distances with infinity for all nodes except start
  const distances = {};
  const previous = {};
  const queue = new PriorityQueue();
  
  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      queue.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      queue.enqueue(vertex, Infinity);
    }
    previous[vertex] = null;
  }
  
  while (!queue.isEmpty()) {
    const current = queue.dequeue().element;
    
    // For each neighbor of current node
    for (let neighbor in graph[current]) {
      const distance = distances[current] + graph[current][neighbor];
      
      // If we found a shorter path to the neighbor
      if (distance < distances[neighbor]) {
        // Update distances and queue
        distances[neighbor] = distance;
        previous[neighbor] = current;
        queue.enqueue(neighbor, distance);
      }
    }
  }
  
  return { distances, previous };
}`;

// BFS code
const bfsCode = `function bfs(graph, start) {
  const visited = {};
  const queue = [start];
  const result = [];
  
  // Mark the start node as visited
  visited[start] = true;
  
  while (queue.length) {
    // Get the next node from queue
    const current = queue.shift();
    result.push(current);
    
    // Get neighbors of current node
    const neighbors = graph[current] || [];
    
    // Visit all unvisited neighbors
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}`;

// DFS code
const dfsCode = `function dfs(graph, start) {
  const visited = {};
  const result = [];
  
  // Recursive DFS function
  function dfsUtil(vertex) {
    // Mark current node as visited
    visited[vertex] = true;
    result.push(vertex);
    
    // Visit all unvisited neighbors
    const neighbors = graph[vertex] || [];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!visited[neighbor]) {
        dfsUtil(neighbor);
      }
    }
  }
  
  // Start DFS from given node
  dfsUtil(start);
  return result;
}`;

// Cycle detection code
const cycleDetectionCode = `function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  // Move slow pointer by one step and
  // fast pointer by two steps
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    // If fast and slow meet, there's a cycle
    if (slow === fast) {
      return true;
    }
  }
  
  // No cycle found
  return false;
}`;

// Number of Islands code
const numIslandsCode = `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  
  // DFS to mark all connected land cells as visited
  function dfs(r, c) {
    // Check if out of bounds or if cell is water or already visited
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
      return;
    }
    
    // Mark as visited by changing '1' to '0'
    grid[r][c] = '0';
    
    // Check all 4 adjacent cells
    dfs(r + 1, c); // down
    dfs(r - 1, c); // up
    dfs(r, c + 1); // right
    dfs(r, c - 1); // left
  }
  
  // Traverse the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++; // Found a new island
        dfs(r, c); // Mark all connected land cells
      }
    }
  }
  
  return count;
}`;

export const graphAlgorithms = [
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    description: "Finds the shortest path from a source node to all other nodes in a weighted graph.",
    timeComplexity: "O(V² + E)",
    spaceComplexity: "O(V)",
    category: 'graph',
    pseudocode: `function dijkstra(graph, start):
    dist[start] = 0
    for each vertex v in graph:
        if v ≠ start: dist[v] = ∞
    
    unvisited = all vertices in graph
    
    while unvisited is not empty:
        u = vertex in unvisited with min dist[u]
        remove u from unvisited
        
        for each neighbor v of u:
            alt = dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] = alt
    
    return dist`,
    codeString: dijkstraCode,
    generateSteps: function(nodes, edges, start, end) {
      return this.generateVisualSteps();
    },
    generateVisualSteps: (data): VisualizationStep[] => {
      const nodes = [
        { id: 'A', label: 'A', value: 'A', position: { x: 50, y: 100 } },
        { id: 'B', label: 'B', value: 'B', position: { x: 200, y: 50 } },
        { id: 'C', label: 'C', value: 'C', position: { x: 200, y: 150 } },
        { id: 'D', label: 'D', value: 'D', position: { x: 350, y: 100 } },
        { id: 'E', label: 'E', value: 'E', position: { x: 350, y: 200 } },
        { id: 'F', label: 'F', value: 'F', position: { x: 500, y: 150 } }
      ];
      
      const edges = [
        { id: 'e1', source: 'A', target: 'B', label: '4', data: { weight: 4 } },
        { id: 'e2', source: 'A', target: 'C', label: '2', data: { weight: 2 } },
        { id: 'e3', source: 'B', target: 'D', label: '5', data: { weight: 5 } },
        { id: 'e4', source: 'C', target: 'D', label: '1', data: { weight: 1 } },
        { id: 'e5', source: 'C', target: 'E', label: '3', data: { weight: 3 } },
        { id: 'e6', source: 'D', target: 'F', label: '2', data: { weight: 2 } },
        { id: 'e7', source: 'E', target: 'F', label: '2', data: { weight: 2 } }
      ];
      
      // Initial state
      const steps: VisualizationStep[] = [
        {
          nodes: nodes.map(node => ({
            ...node,
            isSource: node.id === 'A',
            isTarget: node.id === 'F',
            distance: node.id === 'A' ? 0 : Infinity,
            data: { label: `${node.label}\n(∞)` }
          })),
          edges: edges,
          description: "Initialize Dijkstra's Algorithm with source node A. All distances are infinity except A which is 0.",
          highlightLine: 1
        }
      ];
      
      // Process Node A
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isTarget: node.id === 'F',
          isProcessing: node.id === 'A',
          isVisited: node.id === 'A',
          distance: node.id === 'A' ? 0 : 
                    node.id === 'B' ? 4 :
                    node.id === 'C' ? 2 : Infinity,
          data: { 
            label: `${node.label}\n(${
              node.id === 'A' ? '0' : 
              node.id === 'B' ? '4' :
              node.id === 'C' ? '2' : '∞'
            })` 
          }
        })),
        edges: edges.map(edge => ({
          ...edge,
          isAnimated: edge.source === 'A',
          isVisited: edge.source === 'A'
        })),
        description: "Process node A. Update distances to neighbors: B = 4, C = 2.",
        highlightLine: 14
      });
      
      // Process Node C (closest to source)
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isTarget: node.id === 'F',
          isProcessing: node.id === 'C',
          isVisited: node.id === 'A'
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: edge.source === 'A' || edge.source === 'C',
          isPath: edge.source === 'A' && edge.target === 'C'
        })),
        description: "Process node C (distance 2). Update distances: D = 3, E = 5.",
        highlightLine: 19
      });
      
      // Continue with more steps...
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isTarget: node.id === 'F',
          isProcessing: node.id === 'D',
          isVisited: ['A', 'C'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: ['A', 'C', 'D'].includes(edge.source),
          isPath: (edge.source === 'A' && edge.target === 'C') || 
                 (edge.source === 'C' && edge.target === 'D')
        })),
        description: "Process node D (distance 3). Update distance to F = 5.",
        highlightLine: 22
      });
      
      // Final Path
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isTarget: node.id === 'F',
          isProcessing: node.id === 'F',
          isVisited: ['A', 'C', 'D'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: true,
          isPath: (edge.source === 'A' && edge.target === 'C') || 
                 (edge.source === 'C' && edge.target === 'D') ||
                 (edge.source === 'D' && edge.target === 'F')
        })),
        description: "Found shortest path from A to F: A → C → D → F with total distance 5.",
        highlightLine: 25
      });
      
      return steps;
    }
  },
  {
    id: 'bfs',
    name: "Breadth-First Search",
    description: "Explores all neighbors at the current depth before moving to nodes at the next depth level.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    category: 'graph',
    pseudocode: `function BFS(graph, start):
    queue = new Queue()
    visited = set()
    
    queue.enqueue(start)
    visited.add(start)
    
    while queue is not empty:
        vertex = queue.dequeue()
        
        for each neighbor of vertex:
            if neighbor not in visited:
                queue.enqueue(neighbor)
                visited.add(neighbor)`,
    codeString: bfsCode,
    generateSteps: function(nodes, edges, start) {
      return this.generateVisualSteps();
    },
    generateVisualSteps: (data): VisualizationStep[] => {
      const nodes = [
        { id: 'A', label: 'A', value: 'A', position: { x: 250, y: 50 } },
        { id: 'B', label: 'B', value: 'B', position: { x: 150, y: 150 } },
        { id: 'C', label: 'C', value: 'C', position: { x: 350, y: 150 } },
        { id: 'D', label: 'D', value: 'D', position: { x: 150, y: 250 } },
        { id: 'E', label: 'E', value: 'E', position: { x: 350, y: 250 } },
        { id: 'F', label: 'F', value: 'F', position: { x: 350, y: 350 } }
      ];
      
      const edges = [
        { id: 'e1', source: 'A', target: 'B' },
        { id: 'e2', source: 'A', target: 'C' },
        { id: 'e3', source: 'B', target: 'D' },
        { id: 'e4', source: 'C', target: 'E' },
        { id: 'e5', source: 'E', target: 'F' }
      ];
      
      // Initial state
      const steps: VisualizationStep[] = [
        {
          nodes: nodes.map(node => ({
            ...node,
            isSource: node.id === 'A',
            data: { queue: node.id === 'A' ? ["A"] : [] }
          })),
          edges: edges,
          description: "Start BFS from node A. Initialize queue with A and mark A as visited.",
          highlightLine: 4
        }
      ];
      
      // Process A and add B, C to queue
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'A',
          isVisited: node.id === 'A'
        })),
        edges: edges.filter(e => e.source === 'A' && e.target === 'B').map(edge => ({
          ...edge,
          isVisited: true,
          isAnimated: true
        })),
        description: "Dequeue A and visit all its neighbors. Add B and C to queue.",
        highlightLine: 8
      });
      
      // Process B and add D to queue
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'B',
          isVisited: ['A', 'B'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: edge.source === 'A' || edge.source === 'B',
          isAnimated: edge.source === 'B'
        })),
        description: "Dequeue B and visit all its neighbors. Add D to queue.",
        highlightLine: 10
      });
      
      // Process C and add E to queue
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'C',
          isVisited: ['A', 'B', 'C'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: edge.source === 'A' || edge.source === 'B' || edge.source === 'C',
          isAnimated: edge.source === 'C'
        })),
        description: "Dequeue C and visit all its neighbors. Add E to queue.",
        highlightLine: 10
      });
      
      // Process D (no new nodes)
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'D',
          isVisited: ['A', 'B', 'C', 'D'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: edge.source === 'A' || edge.source === 'B' || edge.source === 'C' || edge.source === 'D',
          isAnimated: edge.source === 'D'
        })),
        description: "Dequeue D. It has no unvisited neighbors.",
        highlightLine: 8
      });
      
      // Process E and add F to queue
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'E',
          isVisited: ['A', 'B', 'C', 'D', 'E'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: edge.source === 'A' || edge.source === 'B' || edge.source === 'C' || edge.source === 'D' || edge.source === 'E',
          isAnimated: edge.source === 'E'
        })),
        description: "Dequeue E and visit all its neighbors. Add F to queue.",
        highlightLine: 10
      });
      
      // Process F (complete)
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'F',
          isVisited: ['A', 'B', 'C', 'D', 'E', 'F'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: true,
          isAnimated: false
        })),
        description: "Dequeue F. Queue is now empty. BFS completed.",
        highlightLine: 12
      });
      
      return steps;
    }
  },
  {
    id: 'dfs',
    name: "Depth-First Search",
    description: "Explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    category: 'graph',
    pseudocode: `function DFS(graph, start):
    visited = set()
    
    function DFS_util(vertex):
        visited.add(vertex)
        
        for each neighbor of vertex:
            if neighbor not in visited:
                DFS_util(neighbor)
    
    DFS_util(start)`,
    codeString: dfsCode,
    generateSteps: function(nodes, edges, start) {
      return this.generateVisualSteps();
    },
    generateVisualSteps: (data): VisualizationStep[] => {
      const nodes = [
        { id: 'A', label: 'A', value: 'A', position: { x: 250, y: 50 } },
        { id: 'B', label: 'B', value: 'B', position: { x: 150, y: 150 } },
        { id: 'C', label: 'C', value: 'C', position: { x: 350, y: 150 } },
        { id: 'D', label: 'D', value: 'D', position: { x: 150, y: 250 } },
        { id: 'E', label: 'E', value: 'E', position: { x: 350, y: 250 } },
        { id: 'F', label: 'F', value: 'F', position: { x: 350, y: 350 } }
      ];
      
      const edges = [
        { id: 'e1', source: 'A', target: 'B' },
        { id: 'e2', source: 'A', target: 'C' },
        { id: 'e3', source: 'B', target: 'D' },
        { id: 'e4', source: 'C', target: 'E' },
        { id: 'e5', source: 'E', target: 'F' }
      ];
      
      // Initial state
      const steps: VisualizationStep[] = [
        {
          nodes: nodes.map(node => ({
            ...node,
            isSource: node.id === 'A',
            data: { stack: node.id === 'A' ? ["A"] : [] }
          })),
          edges: edges,
          description: "Start DFS from node A. Push A to stack and mark it as visited.",
          highlightLine: 2
        }
      ];
      
      // Visit A and recurse to B
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'A',
          isVisited: node.id === 'A'
        })),
        edges: edges.filter(e => e.source === 'A' && e.target === 'B').map(edge => ({
          ...edge,
          isVisited: true,
          isPath: true
        })),
        description: "Visit A and recursively visit its first neighbor B.",
        highlightLine: 4
      });
      
      // Visit B and recurse to D
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'B',
          isVisited: ['A', 'B'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: (edge.source === 'A' && edge.target === 'B') || 
                     (edge.source === 'B' && edge.target === 'D'),
          isPath: (edge.source === 'A' && edge.target === 'B') || 
                  (edge.source === 'B' && edge.target === 'D')
        })),
        description: "Visit B and recursively visit its neighbor D.",
        highlightLine: 7
      });
      
      // Visit D (backtrack to B, then to A)
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'D',
          isVisited: ['A', 'B', 'D'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: (edge.source === 'A' && edge.target === 'B') || 
                     (edge.source === 'B' && edge.target === 'D'),
          isPath: (edge.source === 'A' && edge.target === 'B') || 
                  (edge.source === 'B' && edge.target === 'D')
        })),
        description: "Visit D. No unvisited neighbors, so backtrack to B, then to A.",
        highlightLine: 4
      });
      
      // From A, visit C
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'C',
          isVisited: ['A', 'B', 'D', 'C'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: (edge.source === 'A') || 
                     (edge.source === 'B' && edge.target === 'D') ||
                     (edge.source === 'C' && edge.target === 'E'),
          isPath: (edge.source === 'A' && edge.target === 'C') || 
                  (edge.source === 'C' && edge.target === 'E')
        })),
        description: "Back at A, visit the next unvisited neighbor C, then recursively visit E.",
        highlightLine: 7
      });
      
      // From C, visit E
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'E',
          isVisited: ['A', 'B', 'D', 'C', 'E'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: (edge.source === 'A') || 
                     (edge.source === 'B' && edge.target === 'D') ||
                     (edge.source === 'C') ||
                     (edge.source === 'E'),
          isPath: (edge.source === 'A' && edge.target === 'C') || 
                  (edge.source === 'C' && edge.target === 'E') ||
                  (edge.source === 'E' && edge.target === 'F')
        })),
        description: "Visit E and recursively visit its neighbor F.",
        highlightLine: 7
      });
      
      // From E, visit F (DFS complete)
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === 'A',
          isProcessing: node.id === 'F',
          isVisited: ['A', 'B', 'D', 'C', 'E', 'F'].includes(node.id)
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: true
        })),
        description: "Visit F. All nodes have been visited. DFS complete.",
        highlightLine: 9
      });
      
      return steps;
    }
  },
  {
    id: 'cycle-detection',
    name: "Cycle Detection (Fast & Slow Pointers)",
    description: "Detects cycles in a graph or linked list using two pointers moving at different speeds.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    category: 'linked-list',
    pseudocode: `function hasCycle(head):
    slow = head
    fast = head
    
    while fast is not null and fast.next is not null:
        slow = slow.next          // move one step
        fast = fast.next.next     // move two steps
        
        if slow == fast:
            return true  // cycle detected
            
    return false  // no cycle`,
    codeString: cycleDetectionCode,
    generateSteps: function(nodes, edges, start) {
      return this.generateVisualSteps();
    },
    generateVisualSteps: (data): VisualizationStep[] => {
      // Create linked list nodes with proper positioning for horizontal visualization
      const linkedList = [
        { id: '1', label: '1', value: '1', next: '2' },
        { id: '2', label: '2', value: '2', next: '3' },
        { id: '3', label: '3', value: '3', next: '4' },
        { id: '4', label: '4', value: '4', next: '5' },
        { id: '5', label: '5', value: '5', next: '6' },
        { id: '6', label: '6', value: '6', next: '7' },
        { id: '7', label: '7', value: '7', next: '3' }  // Creates a cycle back to node 3
      ];
      
      // Convert to visualization nodes
      const nodes = linkedList.map((node, index) => ({
        id: node.id,
        label: node.label,
        value: node.value,
        // Position nodes in a horizontal layout with a curve for the cycle
        position: index < 4 
          ? { x: 100 + index * 120, y: 150 } 
          : { x: 100 + (7 - index) * 120, y: 250 }
      }));
      
      // Create edges between linked list nodes
      const edges = linkedList.map(node => ({
        id: `e${node.id}-${node.next}`,
        source: node.id,
        target: node.next,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#888', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#888'
        }
      }));
      
      const steps: VisualizationStep[] = [];
      
      // Initial state
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === '1',
          isSlowPointer: node.id === '1',
          isFastPointer: node.id === '1',
          data: { label: node.label }
        })),
        edges: edges,
        description: "Initialize slow and fast pointers at the head of the linked list.",
        highlightLine: 2,
        linkedList: linkedList,
        slowPointer: 0,
        fastPointer: 0
      });
      
      // Step 1: Move slow 1 step, fast 2 steps
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === '1',
          isSlowPointer: node.id === '2',
          isFastPointer: node.id === '3',
          data: { label: node.label }
        })),
        edges: edges.map(edge => ({
          ...edge,
          animated: (edge.source === '1' && edge.target === '2') || 
                   (edge.source === '2' && edge.target === '3'),
          style: { 
            stroke: (edge.source === '1' && edge.target === '2') || 
                   (edge.source === '2' && edge.target === '3') ? '#3182ce' : '#888',
            strokeWidth: 2 
          }
        })),
        animatePointers: true,
        description: "Move slow pointer 1 step (to 2) and fast pointer 2 steps (to 3).",
        highlightLine: 6,
        linkedList: linkedList,
        slowPointer: 1,
        fastPointer: 2
      });
      
      // Step 2: Move slow 1 step, fast 2 steps
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === '1',
          isSlowPointer: node.id === '3',
          isFastPointer: node.id === '5',
          data: { label: node.label }
        })),
        edges: edges.map(edge => ({
          ...edge,
          animated: (edge.source === '1' && edge.target === '3') || 
                   (edge.source === '3' && edge.target === '5'),
          style: { 
            stroke: (edge.source === '1' && edge.target === '3') || 
                   (edge.source === '3' && edge.target === '5') ? '#3182ce' : '#888',
            strokeWidth: 2 
          }
        })),
        animatePointers: true,
        description: "Move slow pointer to 3 and fast pointer to 5.",
        highlightLine: 6,
        linkedList: linkedList,
        slowPointer: 2,
        fastPointer: 4
      });
      
      // Step 3: Move slow 1 step, fast 2 steps
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === '1',
          isSlowPointer: node.id === '4',
          isFastPointer: node.id === '7',
          data: { label: node.label }
        })),
        edges: edges.map(edge => ({
          ...edge,
          animated: (edge.source === '1' && edge.target === '4') || 
                   (edge.source === '4' && edge.target === '7'),
          style: { 
            stroke: (edge.source === '1' && edge.target === '4') || 
                   (edge.source === '4' && edge.target === '7') ? '#3182ce' : '#888',
            strokeWidth: 2 
          }
        })),
        animatePointers: true,
        description: "Move slow pointer to 4 and fast pointer to 7.",
        highlightLine: 6,
        linkedList: linkedList,
        slowPointer: 3,
        fastPointer: 6
      });
      
      // Step 4: Move slow 1 step, fast 2 steps
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === '1',
          isSlowPointer: node.id === '5',
          isFastPointer: node.id === '4',
          data: { label: node.label }
        })),
        edges: edges.map(edge => ({
          ...edge,
          animated: (edge.source === '1' && edge.target === '5') || 
                   (edge.source === '5' && edge.target === '4'),
          style: { 
            stroke: (edge.source === '1' && edge.target === '5') || 
                   (edge.source === '5' && edge.target === '4') ? '#3182ce' : '#888',
            strokeWidth: 2 
          }
        })),
        animatePointers: true,
        description: "Move slow pointer to 5 and fast pointer to 4 (after going from 7→3→4).",
        highlightLine: 6,
        linkedList: linkedList,
        slowPointer: 4,
        fastPointer: 5
      });
      
      // Step 5: Move slow 1 step, fast 2 steps
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === '1',
          isSlowPointer: node.id === '6',
          isFastPointer: node.id === '6',
          data: { label: node.label }
        })),
        edges: edges.map(edge => ({
          ...edge,
          animated: (edge.source === '1' && edge.target === '6') || 
                   (edge.source === '6' && edge.target === '6'),
          style: { 
            stroke: (edge.source === '1' && edge.target === '6') || 
                   (edge.source === '6' && edge.target === '6') ? '#3182ce' : '#888',
            strokeWidth: 2 
          }
        })),
        animatePointers: true,
        description: "Slow pointer moves to 6 and fast pointer also reaches 6. Pointers meet!",
        highlightLine: 8,
        linkedList: linkedList,
        slowPointer: 5,
        fastPointer: 5
      });
      
      // Final step - cycle detected
      steps.push({
        nodes: nodes.map(node => ({
          ...node,
          isSource: node.id === '1',
          isCycle: ['3', '4', '5', '6', '7'].includes(node.id),
          isSlowPointer: node.id === '6',
          isFastPointer: node.id === '6',
          data: { label: node.label }
        })),
        edges: edges.map(edge => ({
          ...edge,
          isVisited: true,
          isCyclePath: ['e3-4', 'e4-5', 'e5-6', 'e6-7', 'e7-3'].includes(edge.id),
          style: { 
            stroke: (edge.source === '1' && edge.target === '6') || 
                   (edge.source === '6' && edge.target === '6') ? '#3182ce' : '#888',
            strokeWidth: 2 
          }
        })),
        description: "Cycle detected! Both pointers are at the same node.",
        highlightLine: 9,
        linkedList: linkedList,
        slowPointer: 5,
        fastPointer: 5
      });
      
      return steps;
    }
  },
  {
    id: 'number-of-islands',
    name: "Number of Islands",
    description: "Count the number of islands in a 2D grid.",
    timeComplexity: "O(M×N)",
    spaceComplexity: "O(M×N)",
    category: 'grid',
    pseudocode: `function numIslands(grid):
    if grid is empty:
        return 0
    
    rows = grid.length
    cols = grid[0].length
    count = 0
    
    function dfs(r, c):
        if r < 0 OR c < 0 OR r >= rows OR c >= cols OR grid[r][c] == '0':
            return
        
        grid[r][c] = '0'  // mark as visited
        
        dfs(r+1, c)  // down
        dfs(r-1, c)  // up
        dfs(r, c+1)  // right
        dfs(r, c-1)  // left
    
    for r from 0 to rows-1:
        for c from 0 to cols-1:
            if grid[r][c] == '1':
                count++
                dfs(r, c)
    
    return count`,
    codeString: numIslandsCode,
    generateSteps: function() {
      return this.generateVisualSteps();
    },
    generateVisualSteps: (): VisualizationStep[] => {
      // Define a grid with multiple islands
      const grid = [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1']
      ];
      
      const steps: VisualizationStep[] = [];
      
      // Initial state - just showing the grid
      steps.push({
        array: grid.flat().map((cell, index) => ({
          value: cell,
          position: {
            row: Math.floor(index / grid[0].length),
            col: index % grid[0].length
          },
          isLand: cell === '1',
          isWater: cell === '0'
        })),
        grid: grid,
        description: "Initial grid with multiple islands. Land cells are marked as '1' and water as '0'.",
        highlightLine: 1
      });
      
      // Step 1: Start looking for islands
      steps.push({
        array: grid.flat().map((cell, index) => ({
          value: cell,
          position: {
            row: Math.floor(index / grid[0].length),
            col: index % grid[0].length
          },
          isLand: cell === '1',
          isWater: cell === '0',
          isCurrent: index === 0
        })),
        grid: grid,
        currentCell: { row: 0, col: 0 },
        description: "Start traversing the grid to find islands. Found land at position (0,0).",
        compareIndex: 0,
        highlightLine: 24
      });
      
      // Step 2: Found first land cell (0,0)
      const visitedCells1 = { '0-0': true };
      const islandCells1 = { '0-0': true };
      steps.push({
        array: grid.flat().map((cell, index) => {
          const row = Math.floor(index / grid[0].length);
          const col = index % grid[0].length;
          const key = `${row}-${col}`;
          
          return {
            value: cell,
            position: { row, col },
            isLand: cell === '1',
            isWater: cell === '0',
            isVisited: visitedCells1[key] || false,
            isCurrent: row === 0 && col === 0,
            isInCurrentIsland: islandCells1[key] || false
          };
        }),
        grid: grid,
        visitedCells: visitedCells1,
        islandCells: islandCells1,
        currentCell: { row: 0, col: 0 },
        description: "Found land at position (0,0). This is the start of Island #1.",
        current: [0],
        highlightLine: 26
      });
      
      // Step 3: DFS on first island
      const visitedCells2 = { '0-0': true, '0-1': true, '1-0': true, '1-1': true };
      const islandCells2 = { '0-0': true, '0-1': true, '1-0': true, '1-1': true };
      steps.push({
        array: grid.flat().map((cell, index) => {
          const row = Math.floor(index / grid[0].length);
          const col = index % grid[0].length;
          const key = `${row}-${col}`;
          
          return {
            value: cell,
            position: { row, col },
            isLand: cell === '1',
            isWater: cell === '0',
            isVisited: visitedCells2[key] || false,
            isCurrent: row === 0 && col === 0,
            isInCurrentIsland: islandCells2[key] || false
          };
        }),
        grid: grid,
        visitedCells: visitedCells2,
        islandCells: islandCells2,
        currentCell: { row: 0, col: 0 },
        description: "Using DFS to visit all connected land cells that form Island #1.",
        visited: [0, 1, 5, 6],
        highlightLine: 14
      });
      
      // Step 4: Completed first island
      steps.push({
        array: grid.flat().map((cell, index) => {
          const row = Math.floor(index / grid[0].length);
          const col = index % grid[0].length;
          const key = `${row}-${col}`;
          
          return {
            value: cell,
            position: { row, col },
            isLand: cell === '1',
            isWater: cell === '0',
            isVisited: visitedCells2[key] || false,
            isCurrent: row === 0 && col === 0,
            isInCurrentIsland: islandCells2[key] || false
          };
        }),
        grid: grid,
        visitedCells: visitedCells2,
        islandCells: islandCells2,
        currentCell: { row: 0, col: 0 },
        description: "Completed Island #1 which consists of 4 connected land cells.",
        visited: [0, 1, 5, 6],
        found: [0, 1, 5, 6],
        highlightLine: 28
      });
      
      // Step 5: Continue searching, find second island
      const visitedCells3 = { '0-0': true, '0-1': true, '1-0': true, '1-1': true, '2-2': true };
      const islandCells3 = { '2-2': true };
      steps.push({
        array: grid.flat().map((cell, index) => {
          const row = Math.floor(index / grid[0].length);
          const col = index % grid[0].length;
          const key = `${row}-${col}`;
          
          return {
            value: cell,
            position: { row, col },
            isLand: cell === '1',
            isWater: cell === '0',
            isVisited: visitedCells3[key] || false,
            isCurrent: row === 0 && col === 0,
            isInCurrentIsland: islandCells3[key] || false
          };
        }),
        grid: grid,
        visitedCells: visitedCells3,
        islandCells: islandCells3,
        currentCell: { row: 0, col: 0 },
        description: "Found land at position (2,2). This is the start of Island #2.",
        visited: [0, 1, 5, 6, 12],
        current: [12],
        highlightLine: 26
      });
      
      // Step 6: Complete second island (only one cell)
      const visitedCells4 = { '0-0': true, '0-1': true, '1-0': true, '1-1': true, '2-2': true };
      steps.push({
        array: grid.flat().map((cell, index) => {
          const row = Math.floor(index / grid[0].length);
          const col = index % grid[0].length;
          const key = `${row}-${col}`;
          
          return {
            value: cell,
            position: { row, col },
            isLand: cell === '1',
            isWater: cell === '0',
            isVisited: visitedCells4[key] || false,
            isCurrent: row === 0 && col === 0,
            isInCurrentIsland: islandCells3[key] || false
          };
        }),
        grid: grid,
        visitedCells: visitedCells4,
        islandCells: islandCells3,
        currentCell: { row: 0, col: 0 },
        description: "Completed Island #2 which consists of 1 land cell.",
        visited: [0, 1, 5, 6, 12],
        found: [0, 1, 5, 6, 12],
        highlightLine: 28
      });
      
      // Step 7: Find third island
      const visitedCells5 = { '0-0': true, '0-1': true, '1-0': true, '1-1': true, '2-2': true, '3-3': true };
      const islandCells5 = { '3-3': true };
      steps.push({
        array: grid.flat().map((cell, index) => {
          const row = Math.floor(index / grid[0].length);
          const col = index % grid[0].length;
          const key = `${row}-${col}`;
          
          return {
            value: cell,
            position: { row, col },
            isLand: cell === '1',
            isWater: cell === '0',
            isVisited: visitedCells5[key] || false,
            isCurrent: row === 0 && col === 0,
            isInCurrentIsland: islandCells5[key] || false
          };
        }),
        grid: grid,
        visitedCells: visitedCells5,
        islandCells: islandCells5,
        currentCell: { row: 0, col: 0 },
        description: "Found land at position (3,3). This is the start of Island #3.",
        visited: [0, 1, 5, 6, 12, 18],
        current: [18],
        highlightLine: 26
      });
      
      // Step 8: DFS on third island
      const visitedCells6 = { '0-0': true, '0-1': true, '1-0': true, '1-1': true, '2-2': true, '3-3': true, '3-4': true };
      const islandCells6 = { '3-3': true, '3-4': true };
      steps.push({
        array: grid.flat().map((cell, index) => {
          const row = Math.floor(index / grid[0].length);
          const col = index % grid[0].length;
          const key = `${row}-${col}`;
          
          return {
            value: cell,
            position: { row, col },
            isLand: cell === '1',
            isWater: cell === '0',
            isVisited: visitedCells6[key] || false,
            isCurrent: row === 0 && col === 0,
            isInCurrentIsland: islandCells6[key] || false
          };
        }),
        grid: grid,
        visitedCells: visitedCells6,
        islandCells: islandCells6,
        currentCell: { row: 0, col: 0 },
        description: "Using DFS to visit all connected land cells that form Island #3.",
        visited: [0, 1, 5, 6, 12, 18, 19],
        current: [19],
        highlightLine: 14
      });
      
      // Step 9: Complete traversal
      steps.push({
        array: grid.flat().map((cell, index) => {
          const row = Math.floor(index / grid[0].length);
          const col = index % grid[0].length;
          const key = `${row}-${col}`;
          
          return {
            value: cell,
            position: { row, col },
            isLand: cell === '1',
            isWater: cell === '0',
            isVisited: visitedCells6[key] || false,
            isCurrent: row === 0 && col === 0,
            isInCurrentIsland: islandCells6[key] || false
          };
        }),
        grid: grid,
        visitedCells: visitedCells6,
        islandCells: islandCells6,
        currentCell: { row: 0, col: 0 },
        description: "Completed traversal. Found 3 islands in total.",
        visited: [0, 1, 5, 6, 12, 18, 19],
        found: [0, 1, 5, 6, 12, 18, 19],
        highlightLine: 30
      });
      
      return steps;
    }
  }
];
