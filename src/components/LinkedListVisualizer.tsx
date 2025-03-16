
import React from 'react';
import { MarkerType } from '@xyflow/react';

interface LinkedListVisualizerProps {
  currentStep: number;
  visualSteps: any[];
}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ currentStep, visualSteps }) => {
  const currentStepData = visualSteps[currentStep] || {};
  const { linkedList, slowPointer, fastPointer, cycleDetected, cycleNodes } = currentStepData;
  
  // Display explanation banner for the current step
  const renderExplanationBanner = () => {
    if (!currentStepData.description) return null;
    
    return (
      <div className="absolute top-4 left-0 right-0 mx-auto w-[90%] bg-white/20 backdrop-blur-sm p-3 rounded-md shadow-lg z-10 text-center">
        <p className="text-white font-medium">{currentStepData.description}</p>
      </div>
    );
  };

  const renderLinkedList = () => {
    if (!linkedList || linkedList.length === 0) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-white/80 animate-pulse">Select a linked list algorithm to visualize</p>
        </div>
      );
    }

    // Calculate node positions for a better visualization
    // First row for nodes 1-4, second row for nodes 5-7 with cycle
    const nodePositions = linkedList.map((node, index) => {
      // For the first 4 nodes, place them in a row
      if (index < 4) {
        return { x: 100 + index * 120, y: 150 };
      } 
      // For the remaining nodes, place them below in reverse order to create a nice loop
      else {
        return { x: 460 - ((index - 4) * 120), y: 250 };
      }
    });
    
    return (
      <div className="relative w-full h-full">
        {/* Draw the arrows first so they appear behind the nodes */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {linkedList.map((node, index) => {
            // Find the index of the next node
            const nextNodeIdx = linkedList.findIndex(n => n.id === node.next);
            if (nextNodeIdx === -1) return null;
            
            const startX = nodePositions[index].x + 35; // center of current node + half node width
            const startY = nodePositions[index].y + 35;
            const endX = nodePositions[nextNodeIdx].x + 35; // center of next node
            const endY = nodePositions[nextNodeIdx].y + 35;
            
            // Calculate path for the arrow
            let path;
            const isCyclePath = node.id === '7' && node.next === '3'; // Special case for the cycle
            
            if (isCyclePath) {
              // Create a curved path for the cycle connection
              path = `M ${startX} ${startY} C ${startX + 100} ${startY + 100}, ${endX - 100} ${endY + 100}, ${endX} ${endY}`;
            } else if (Math.abs(index - nextNodeIdx) === 1) {
              // Straight line for adjacent nodes
              path = `M ${startX} ${startY} L ${endX} ${endY}`;
            } else {
              // Curved line for non-adjacent nodes
              const midX = (startX + endX) / 2;
              const midY = (startY + endY) / 2 + 50;
              path = `M ${startX} ${startY} Q ${midX} ${midY}, ${endX} ${endY}`;
            }
            
            // Determine if this arrow is part of the detected cycle
            const isInCycle = cycleDetected && cycleNodes && cycleNodes.includes(parseInt(node.id));
            
            // Determine if this arrow should be highlighted based on pointer movement
            const isSlowPointerPath = index === slowPointer && nextNodeIdx === (slowPointer + 1) % linkedList.length;
            const isFastPointerPath = index === fastPointer && (
              nextNodeIdx === (fastPointer + 1) % linkedList.length || 
              nextNodeIdx === (fastPointer + 2) % linkedList.length
            );
            
            return (
              <g key={`arrow-${node.id}-${node.next}`}>
                <path
                  d={path}
                  fill="none"
                  stroke={
                    isInCycle ? "#F87171" : // Red
                    isSlowPointerPath ? "#60A5FA" : // Blue 
                    isFastPointerPath ? "#A78BFA" : // Purple
                    "#FFFFFF" // White
                  }
                  strokeWidth={isInCycle || isSlowPointerPath || isFastPointerPath ? 3 : 2}
                  strokeDasharray={isInCycle ? "5,5" : "none"}
                  markerEnd={`url(#${
                    isInCycle ? "cycleArrow" : 
                    isSlowPointerPath ? "slowArrow" : 
                    isFastPointerPath ? "fastArrow" : 
                    "defaultArrow"
                  })`}
                />
              </g>
            );
          })}
          
          {/* Define arrow markers */}
          <defs>
            <marker
              id="defaultArrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFFFFF" />
            </marker>
            <marker
              id="cycleArrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#F87171" />
            </marker>
            <marker
              id="slowArrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#60A5FA" />
            </marker>
            <marker
              id="fastArrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#A78BFA" />
            </marker>
          </defs>
        </svg>
        
        {/* Draw the nodes */}
        <div className="relative z-10">
          {linkedList.map((node, index) => {
            const isSlowPointerNode = index === slowPointer;
            const isFastPointerNode = index === fastPointer;
            const isInCycle = cycleDetected && cycleNodes && cycleNodes.includes(parseInt(node.id));
            
            return (
              <div
                key={node.id}
                className={`absolute rounded-full w-[70px] h-[70px] flex items-center justify-center font-bold text-white shadow-lg ${
                  isSlowPointerNode && isFastPointerNode ? 'bg-fuchsia-500 animate-pulse' :
                  isSlowPointerNode ? 'bg-blue-500' :
                  isFastPointerNode ? 'bg-purple-500' :
                  isInCycle ? 'bg-red-500' : 'bg-white text-indigo-900'
                } transition-all duration-300`}
                style={{
                  left: nodePositions[index].x,
                  top: nodePositions[index].y,
                  border: isInCycle ? '3px solid #F87171' : '2px solid rgba(255, 255, 255, 0.3)',
                  transform: (isSlowPointerNode || isFastPointerNode) ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isInCycle ? '0 0 10px rgba(248, 113, 113, 0.6)' : 
                             isSlowPointerNode ? '0 0 10px rgba(96, 165, 250, 0.6)' :
                             isFastPointerNode ? '0 0 10px rgba(167, 139, 250, 0.6)' : '0 0 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                {node.value}
                {(isSlowPointerNode || isFastPointerNode) && (
                  <div className="absolute -top-7 left-0 right-0 text-center text-xs bg-white/10 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                    {isSlowPointerNode && isFastPointerNode ? 'Slow & Fast' :
                     isSlowPointerNode ? 'Slow' : 'Fast'}
                  </div>
                )}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {node.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="relative h-full w-full flex flex-col">
      {renderExplanationBanner()}
      
      <div className="flex-1 relative">
        {renderLinkedList()}
      </div>
      
      <div className="linked-list-legend grid grid-cols-4 gap-2 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Slow Pointer</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Fast Pointer</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Cycle</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-fuchsia-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Pointers Meet</span>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
