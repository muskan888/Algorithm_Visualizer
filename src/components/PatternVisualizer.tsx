
import React from 'react';

interface PatternVisualizerProps {
  currentStep: number;
  visualSteps: any[];
  patternId: string;
}

const PatternVisualizer: React.FC<PatternVisualizerProps> = ({ 
  currentStep, 
  visualSteps,
  patternId
}) => {
  const currentStepData = visualSteps[currentStep] || {};
  const { array = [], description = '' } = currentStepData;
  
  // Extract visualization state details
  const comparisons = currentStepData?.comparisons || [];
  const current = currentStepData?.current || [];
  const found = currentStepData?.found || [];
  const swaps = currentStepData?.swaps || [];
  const visited = currentStepData?.visited || [];
  const pivot = currentStepData?.pivot || [];
  const windowIndices = currentStepData?.windowIndices || [];
  
  // Get background color based on pattern ID
  const getBgColor = () => {
    switch (patternId) {
      case 'sliding-window':
      case 'variable-sliding-window':
        return 'bg-blue-600 bg-opacity-90'; // Blue for sliding window
      case 'two-pointers':
        return 'bg-indigo-600 bg-opacity-90'; // Indigo for two pointers
      case 'fast-slow-pointers':
        return 'bg-purple-600 bg-opacity-90'; // Purple for fast & slow
      case 'prefix-sum':
        return 'bg-cyan-600 bg-opacity-90'; // Cyan for prefix sum
      case 'hash-map':
        return 'bg-amber-600 bg-opacity-90'; // Amber for hash map
      case 'binary-search':
        return 'bg-rose-600 bg-opacity-90'; // Rose for binary search
      case 'backtracking':
        return 'bg-fuchsia-600 bg-opacity-90'; // Fuchsia for backtracking
      case 'recursion-memoization':
      case 'dynamic-programming':
        return 'bg-emerald-600 bg-opacity-90'; // Emerald for DP/memoization
      case 'greedy':
        return 'bg-orange-600 bg-opacity-90'; // Orange for greedy
      case 'graph-traversal':
        return 'bg-lime-600 bg-opacity-90'; // Lime for DFS/BFS
      case 'topological-sort':
        return 'bg-sky-600 bg-opacity-90'; // Sky for topological sort
      case 'union-find':
        return 'bg-violet-600 bg-opacity-90'; // Violet for union-find
      case 'bit-manipulation':
        return 'bg-gray-600 bg-opacity-90'; // Gray for bit manipulation
      default:
        return 'bg-teal-600 bg-opacity-90'; // Teal for default
    }
  };
  
  // Pattern-specific visualizations
  const renderPatternSpecificVisual = () => {
    if (!array || array.length === 0) return null;
    
    switch (patternId) {
      case 'sliding-window':
      case 'variable-sliding-window':
        return (
          <div className="pattern-info absolute top-24 left-4 right-4 text-white bg-black/20 p-2 rounded backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>Window Size: {windowIndices?.length || comparisons?.length || 0}</div>
              <div>Current Sum: {currentStepData.windowSum}</div>
              <div>Max Sum: {currentStepData.maxSum}</div>
            </div>
          </div>
        );
        
      case 'two-pointers':
        return (
          <div className="pattern-info absolute top-24 left-4 right-4 text-white bg-black/20 p-2 rounded backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>Left Pointer: {currentStepData.left !== undefined ? currentStepData.left : 'N/A'}</div>
              <div>Right Pointer: {currentStepData.right !== undefined ? currentStepData.right : 'N/A'}</div>
              <div>Current Sum: {currentStepData.sum}</div>
            </div>
          </div>
        );
        
      case 'prefix-sum':
        return (
          <div className="pattern-info absolute top-24 left-4 right-4 text-white bg-black/20 p-2 rounded backdrop-blur-sm">
            <div className="grid grid-cols-2">
              <div>Current Prefix Sum: {currentStepData.currentSum}</div>
              <div>Target Sum: {currentStepData.targetSum}</div>
            </div>
            {currentStepData.prefixSums && (
              <div className="mt-2 text-xs">
                Prefix Sums: {JSON.stringify(currentStepData.prefixSums)}
              </div>
            )}
          </div>
        );
        
      case 'hash-map':
        return (
          <div className="pattern-info absolute top-24 left-4 right-4 text-white bg-black/20 p-2 rounded backdrop-blur-sm">
            <div className="overflow-x-auto">
              <div className="text-sm font-bold mb-1">Frequency Map:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentStepData.freqMap || {}).map(([key, value], i) => (
                  <div key={i} className="px-2 py-1 bg-white/10 rounded">
                    {key}: {String(value)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'binary-search':
        return (
          <div className="pattern-info absolute top-24 left-4 right-4 text-white bg-black/20 p-2 rounded backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>Left: {currentStepData.left !== undefined ? currentStepData.left : 'N/A'}</div>
              <div>Mid: {currentStepData.mid !== undefined ? currentStepData.mid : 'N/A'}</div>
              <div>Right: {currentStepData.right !== undefined ? currentStepData.right : 'N/A'}</div>
              <div>Target: {currentStepData.target}</div>
            </div>
          </div>
        );
        
      case 'dynamic-programming':
      case 'recursion-memoization':
        return (
          <div className="pattern-info absolute top-24 left-4 right-4 text-white bg-black/20 p-2 rounded backdrop-blur-sm">
            <div className="text-sm font-bold mb-1">DP Table / Memoization Cache:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(currentStepData.memo || {}).map(([key, value], i) => (
                <div key={i} className="px-2 py-1 bg-white/10 rounded">
                  {key}: {String(value)}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  
  // Display explanation banner
  const renderExplanationBanner = () => {
    if (!description) return null;
    
    return (
      <div className="absolute top-4 left-0 right-0 mx-auto w-[90%] bg-white/20 backdrop-blur-sm p-3 rounded-md shadow-lg z-10 text-center">
        <p className="text-white font-medium">{description}</p>
      </div>
    );
  };
  
  // Calculate the maximum value for scaling
  const maxValue = array.length > 0
    ? Math.max(
        ...array.map((item: any) => 
          typeof item === 'object' 
            ? (item.value !== undefined ? item.value : 0) 
            : (typeof item === 'number' ? item : 0)
        ),
        1
      )
    : 1;
  
  return (
    <div className={`pattern-visualizer relative h-full flex items-end justify-center space-x-1 ${getBgColor()} rounded-xl p-4 shadow-lg overflow-hidden`}>
      {renderExplanationBanner()}
      {renderPatternSpecificVisual()}
      
      {array.length > 0 ? (
        <div className="flex items-end justify-center space-x-1 h-full w-full pt-32">
          {array.map((value: any, index: number) => {
            // Handle both simple values and complex objects
            const displayValue = typeof value === 'object' ? (value.value !== undefined ? value.value : 0) : value;
            const numericValue = typeof displayValue === 'number' ? displayValue : 0;
            
            // Get the state of the item
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
            const isWindow = windowIndices && windowIndices.includes(index);
            
            // Set bar color based on state
            const barColor = 
              isPivot ? 'bg-red-500 shadow-red-500/50' : // Red for pivot
              isComparing ? 'bg-yellow-400 shadow-yellow-400/50' : // Yellow for comparing
              isSwapping ? 'bg-green-500 shadow-green-500/50' : // Green for swapping
              isCurrent ? 'bg-blue-500 shadow-blue-500/50' : // Blue for current
              isFound ? 'bg-purple-500 shadow-purple-500/50' : // Purple for found
              isVisited ? 'bg-violet-500 shadow-violet-500/50' : // Violet for visited
              isWindow ? 'bg-teal-500 shadow-teal-500/50' : // Teal for window
              'bg-gray-200 shadow-gray-200/50'; // Default gray
            
            return (
              <div
                key={index}
                className={`visualization-bar relative rounded-t-lg transition-all duration-300 shadow-lg ${barColor}`}
                style={{
                  height: `${(numericValue / maxValue) * 70}%`,
                  width: `${100 / Math.min(array.length * 1.5, 100)}%`,
                  minWidth: '4px',
                  maxWidth: '40px',
                  transform: (isComparing || isSwapping || isCurrent || isWindow) 
                    ? 'scale(1.05)' 
                    : 'scale(1)',
                  zIndex: (isComparing || isSwapping || isCurrent || isWindow) 
                    ? 2 
                    : 1
                }}
              >
                {array.length <= 30 && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-white">
                    {typeof displayValue === 'number' ? displayValue : ''}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white/80 animate-pulse">Select an algorithm pattern to visualize</p>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center bg-white/10 backdrop-blur-sm p-2 rounded">
        <div className="bg-yellow-400/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-yellow-200"></div>
          <span>Comparing</span>
        </div>
        <div className="bg-green-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-300"></div>
          <span>Swapping</span>
        </div>
        <div className="bg-blue-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-300"></div>
          <span>Current</span>
        </div>
        <div className="bg-purple-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-300"></div>
          <span>Found</span>
        </div>
        <div className="bg-teal-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-teal-300"></div>
          <span>Window</span>
        </div>
        {patternId === 'sliding-window' || patternId === 'variable-sliding-window' ? (
          <div className="bg-red-500/90 px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-300"></div>
            <span>Max Window</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PatternVisualizer;
