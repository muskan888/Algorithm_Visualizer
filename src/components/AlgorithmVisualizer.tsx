
import React from 'react';
import GraphVisualizer from './GraphVisualizer';
import GridVisualizer from './GridVisualizer';
import LinkedListVisualizer from './LinkedListVisualizer';
import PatternVisualizer from './PatternVisualizer';
import { algorithmPatterns } from '@/utils/algorithms/algorithmPatterns';

interface AlgorithmVisualizerProps {
  data: any[];
  currentStep: number;
  visualSteps: any[];
  algorithm: string;
  category: string;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  data,
  currentStep,
  visualSteps,
  algorithm,
  category
}) => {
  // If there are no visualization steps, show a message
  if (!visualSteps || visualSteps.length === 0) {
    return (
      <div className="algorithm-visualizer h-96 overflow-hidden rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 p-4 shadow-lg flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg mb-2">No visualization available</p>
          <p className="text-sm text-gray-400">Try selecting a different example or algorithm pattern</p>
        </div>
      </div>
    );
  }

  const currentStepData = visualSteps[currentStep] || {};
  
  // Check if this is an algorithm pattern from algorithmPatterns.ts
  const isAlgorithmPattern = algorithmPatterns.some(pattern => pattern.id === algorithm);

  if (isAlgorithmPattern) {
    return (
      <div className="algorithm-visualizer h-96 overflow-hidden rounded-xl p-4 shadow-lg">
        <PatternVisualizer
          currentStep={currentStep}
          visualSteps={visualSteps}
          patternId={algorithm}
        />
      </div>
    );
  }
  
  // Graph algorithms should use GraphVisualizer
  if (category === 'graph' || algorithm === 'dijkstra' || algorithm === 'bfs' || algorithm === 'dfs') {
    return (
      <div className="algorithm-visualizer h-96 overflow-hidden rounded-xl bg-orange-600 bg-opacity-90 p-4 shadow-lg">
        <GraphVisualizer 
          graphData={{ 
            nodes: currentStepData?.nodes || [], 
            edges: currentStepData?.edges || [] 
          }}
          currentStep={currentStep}
          visualSteps={visualSteps}
        />
      </div>
    );
  }
  
  // Fast and Slow pointers pattern should use the LinkedListVisualizer
  if (algorithm === 'fast-slow-pointers' || algorithm === 'cycle-detection' || category === 'linked-list') {
    return (
      <div className="algorithm-visualizer relative h-96 overflow-hidden rounded-xl bg-indigo-600 bg-opacity-90 p-4 shadow-lg">
        <LinkedListVisualizer
          currentStep={currentStep}
          visualSteps={visualSteps}
        />
      </div>
    );
  }
  
  // For grid-based algorithms like "Number of Islands"
  if (category === 'grid' || algorithm === 'islands' || algorithm === 'matrix-traversal' || algorithm === 'number-of-islands') {
    return (
      <div className="algorithm-visualizer relative h-96 overflow-hidden rounded-xl bg-lime-600 bg-opacity-90 p-4 shadow-lg">
        <GridVisualizer
          currentStep={currentStep}
          visualSteps={visualSteps}
        />
      </div>
    );
  }
  
  // For search algorithms, use GridVisualizer which is better equipped to handle this visualization
  if (category === 'searching' || algorithm.includes('search')) {
    return (
      <div className="algorithm-visualizer relative h-96 overflow-hidden rounded-xl bg-amber-600 bg-opacity-90 p-4 shadow-lg">
        <GridVisualizer
          currentStep={currentStep}
          visualSteps={visualSteps}
        />
      </div>
    );
  }
  
  // Display explanation banner for the current step
  const renderExplanationBanner = () => {
    if (!currentStepData.description) return null;
    
    return (
      <div className="absolute top-4 left-0 right-0 mx-auto w-[90%] bg-white/20 backdrop-blur-sm p-3 rounded-md shadow-lg z-10 text-center">
        <p className="text-white font-medium">{currentStepData.description}</p>
      </div>
    );
  };
  
  // Check if we have array data to visualize
  const hasValidArray = Array.isArray(data) && data.length > 0;
  
  // For sorting algorithms, pattern visualizations, and fallback for other cases
  // Calculate the maximum value for scaling
  const maxValue = hasValidArray
    ? Math.max(
        ...data.map(item => 
          typeof item === 'object' 
            ? (item.value !== undefined ? item.value : 0) 
            : (typeof item === 'number' ? item : 0)
        ),
        1
      )
    : 1;
  
  // Get current visualization state for sorting
  const comparisons = currentStepData?.comparisons || 
                     currentStepData?.comparingIndices || [];
  const swaps = currentStepData?.swaps || 
               currentStepData?.swappedIndices || [];
  const current = currentStepData?.current || [];
  const found = currentStepData?.found || [];
  const pivot = currentStepData?.pivot || [];
  const visited = currentStepData?.visited || [];
  
  // Get background color based on algorithm or category
  const getBgColor = () => {
    if (algorithm === 'bubble' || algorithm === 'insertion' || algorithm === 'selection' || algorithm === 'quick' || algorithm === 'merge' || category === 'sorting') {
      return 'bg-emerald-600 bg-opacity-90'; // Green for sorting
    } else if (algorithm === 'binary-search' || algorithm === 'linear-search' || category === 'searching') {
      return 'bg-amber-600 bg-opacity-90'; // Amber for searching
    } else if (algorithm === 'sliding-window' || category === 'pattern') {
      return 'bg-rose-600 bg-opacity-90'; // Rose for pattern
    } else if (algorithm === 'binary-tree' || category === 'tree') {
      return 'bg-cyan-600 bg-opacity-90'; // Cyan for tree
    }
    return 'bg-purple-600 bg-opacity-90'; // Default purple
  };
  
  return (
    <div className={`algorithm-visualizer relative h-96 flex items-end justify-center space-x-1 overflow-hidden rounded-xl ${getBgColor()} p-4 shadow-lg`}>
      {renderExplanationBanner()}
      
      {hasValidArray ? (
        <>
          <div className="absolute top-16 left-0 right-0 flex justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="bg-yellow-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
                <span>Comparing</span>
              </div>
              <div className="bg-green-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-300"></div>
                <span>Swapping</span>
              </div>
              <div className="bg-red-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-300"></div>
                <span>Pivot</span>
              </div>
              <div className="bg-blue-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                <span>Current</span>
              </div>
              <div className="bg-purple-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-purple-300"></div>
                <span>Found</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-end justify-center space-x-1 h-full w-full pt-16">
            {data.map((value, index) => {
              // Handle both simple values and complex objects
              const displayValue = typeof value === 'object' ? (value.value !== undefined ? value.value : 0) : value;
              const numericValue = typeof displayValue === 'number' ? displayValue : 0;
              
              // Get the state of the bar
              const isComparing = comparisons.includes(index) || 
                                 (typeof value === 'object' && value.isComparing);
              const isSwapping = swaps.includes(index) || 
                               (typeof value === 'object' && value.isSwapping);
              const isPivot = pivot.includes(index) || 
                             (typeof value === 'object' && value.isPivot);
              const isCurrent = current.includes(index) || 
                               (typeof value === 'object' && value.isCurrent);
              const isFound = found.includes(index) || 
                             (typeof value === 'object' && value.isFound);
              const isVisited = visited.includes(index) || 
                               (typeof value === 'object' && value.isVisited);
              
              // Set bar color based on state - using the exact colors specified
              const barColor = 
                isPivot ? 'bg-red-500 shadow-red-500/50' :
                isComparing ? 'bg-yellow-400 shadow-yellow-400/50' :
                isSwapping ? 'bg-green-500 shadow-green-500/50' :
                isCurrent ? 'bg-blue-500 shadow-blue-500/50' :
                isFound ? 'bg-purple-500 shadow-purple-500/50' :
                isVisited ? 'bg-cyan-500 shadow-cyan-500/50' :
                'bg-gray-200 shadow-gray-200/50';
              
              return (
                <div
                  key={index}
                  className={`visualization-bar relative rounded-t-lg transition-all duration-300 shadow-lg ${barColor}`}
                  style={{
                    height: `${(numericValue / maxValue) * 100}%`,
                    width: `${100 / Math.min(data.length * 1.5, 100)}%`,
                    minWidth: '4px',
                    maxWidth: '40px',
                    transform: (isComparing || isSwapping || isCurrent) 
                      ? 'scale(1.05)' 
                      : 'scale(1)',
                    zIndex: (isComparing || isSwapping || isCurrent) 
                      ? 2 
                      : 1
                  }}
                >
                  {data.length <= 30 && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-white">
                      {typeof displayValue === 'number' ? displayValue : ''}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white/80 animate-pulse">Select an algorithm and run it to visualize</p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmVisualizer;
