
import React from 'react';

interface GridVisualizerProps {
  currentStep: number;
  visualSteps: any[];
}

const GridVisualizer: React.FC<GridVisualizerProps> = ({ currentStep, visualSteps }) => {
  const currentStepData = visualSteps[currentStep] || {};
  const gridData = currentStepData.array || [];
  
  // Calculate grid dimensions
  let rowCount = 0;
  let colCount = 0;
  if (gridData.length > 0) {
    // Find max row and col
    gridData.forEach((cell: any) => {
      if (cell.position) {
        rowCount = Math.max(rowCount, cell.position.row + 1);
        colCount = Math.max(colCount, cell.position.col + 1);
      }
    });
  }
  
  // For array-based algorithms (like searching)
  const isArrayBased = gridData.length > 0 && !gridData[0]?.position;
  const searchAlgorithmStep = isArrayBased && (
    currentStepData.compareIndex !== undefined || 
    currentStepData.mid !== undefined || 
    currentStepData.low !== undefined || 
    currentStepData.high !== undefined ||
    currentStepData.current !== undefined ||
    currentStepData.jump !== undefined
  );
  
  if (isArrayBased) {
    // Create a grid layout for array visualization
    rowCount = 1;
    colCount = gridData.length;
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
  
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center">
      {renderExplanationBanner()}
      
      {gridData.length > 0 ? (
        <div className="grid-visualization w-full h-full flex flex-col items-center justify-center">
          <div className="grid-container" style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            gridTemplateRows: `repeat(${rowCount}, 1fr)`,
            gap: '4px',
            width: '90%',
            height: isArrayBased ? '100px' : '80%',
            marginTop: isArrayBased ? '60px' : '0',
          }}>
            {gridData.map((cell: any, index: number) => {
              // Handle search algorithms specifically
              let isCurrent = false;
              let isComparing = false;
              let isFound = false;
              let isVisited = false;
              
              if (searchAlgorithmStep) {
                // Linear Search
                if (currentStepData.compareIndex !== undefined) {
                  isComparing = index === currentStepData.compareIndex;
                }
                
                // Binary Search, Interpolation Search, etc.
                if (currentStepData.mid !== undefined) {
                  isCurrent = index === currentStepData.mid;
                }
                
                if (currentStepData.low !== undefined) {
                  isVisited = index >= currentStepData.low && index <= currentStepData.high && index !== currentStepData.mid;
                }
                
                // Jump Search
                if (currentStepData.current !== undefined) {
                  isCurrent = index === currentStepData.current;
                }
                
                if (currentStepData.jump !== undefined) {
                  isComparing = index === currentStepData.jump;
                }
                
                // For all search algorithms
                if (currentStepData.found && (
                  (currentStepData.compareIndex !== undefined && index === currentStepData.compareIndex) ||
                  (currentStepData.mid !== undefined && index === currentStepData.mid) ||
                  (currentStepData.current !== undefined && index === currentStepData.current)
                )) {
                  isFound = true;
                }
              }
              
              // For grid-based visualizations
              const isLand = cell.isLand || false;
              const isWater = cell.isWater || false;
              const cellIsVisited = cell.isVisited || isVisited;
              const cellIsCurrent = cell.isCurrent || isCurrent;
              const cellIsComparing = cell.isComparing || isComparing;
              const isTarget = cell.isTarget || false;
              const isInCurrentIsland = cell.isInCurrentIsland || false;
              const isSwapping = cell.isSwapping || false;
              const isPivot = cell.isPivot || false;
              const cellIsFound = cell.isFound || isFound || isTarget;
              
              // Enhanced colors matching the specified color scheme
              const cellColor = isPivot ? 'bg-red-500' : // Red for pivot
                               cellIsComparing ? 'bg-yellow-400' : // Yellow for comparing
                               isSwapping ? 'bg-green-500' : // Green for swapping
                               cellIsCurrent ? 'bg-blue-500' : // Blue for current
                               cellIsFound ? 'bg-purple-500' : // Purple for found
                               isInCurrentIsland ? 'bg-green-500' : // Green for island/swapping
                               cellIsVisited ? 'bg-purple-300' : // Light purple for visited
                               isLand ? 'bg-lime-500' : // Lime for land
                               isWater ? 'bg-blue-500' : // Blue for water
                               'bg-gray-700'; // Gray default
              
              const position = cell.position || { 
                row: 0, 
                col: isArrayBased ? index : 0 
              };
              
              // Handle search algorithm specific visualization
              const displayValue = typeof cell === 'object' && cell.value !== undefined ? cell.value : cell;
              
              return (
                <div
                  key={index}
                  className={`grid-cell rounded-md flex items-center justify-center text-white font-bold transition-all duration-300 ${cellColor}`}
                  style={{
                    gridColumn: (position.col || 0) + 1,
                    gridRow: (position.row || 0) + 1,
                    aspectRatio: isArrayBased ? 'auto' : '1/1',
                    height: isArrayBased ? '100%' : 'auto',
                    boxShadow: cellIsCurrent ? '0 0 15px rgba(59, 130, 246, 0.7)' : // Blue glow for current
                               cellIsComparing ? '0 0 15px rgba(250, 204, 21, 0.7)' : // Yellow glow for comparing
                               isSwapping ? '0 0 15px rgba(34, 197, 94, 0.7)' : // Green glow for swapping
                               isPivot ? '0 0 15px rgba(239, 68, 68, 0.7)' : // Red glow for pivot
                               cellIsFound ? '0 0 15px rgba(168, 85, 247, 0.7)' : // Purple glow for found
                               'none',
                    transform: (cellIsCurrent || cellIsComparing || isSwapping || isPivot || cellIsFound) ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {displayValue !== undefined && displayValue !== null ? displayValue : ''}
                </div>
              );
            })}
          </div>
          
          <div className="grid-legend grid grid-cols-5 gap-2 mt-4">
            {isArrayBased || searchAlgorithmStep ? (
              <>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span className="text-white text-xs">Current</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                  <span className="text-white text-xs">Comparing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                  <span className="text-white text-xs">Found</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-300 rounded mr-2"></div>
                  <span className="text-white text-xs">Visited</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-700 rounded mr-2"></div>
                  <span className="text-white text-xs">Not Visited</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-lime-500 rounded mr-2"></div>
                  <span className="text-white text-xs">Land</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span className="text-white text-xs">Water/Current</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                  <span className="text-white text-xs">Comparing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="text-white text-xs">Island/Swapping</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                  <span className="text-white text-xs">Found/Target</span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white/80 animate-pulse">Select an algorithm to visualize</p>
        </div>
      )}
    </div>
  );
};

export default GridVisualizer;
