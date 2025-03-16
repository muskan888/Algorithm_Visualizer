
import React from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface GraphVisualizerProps {
  graphData: GraphData;
  currentStep: number;
  visualSteps: any[];
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ 
  graphData, 
  currentStep,
  visualSteps 
}) => {
  const { nodes, edges } = graphData;

  // Display explanation banner for the current step
  const renderExplanationBanner = () => {
    if (!visualSteps[currentStep]?.description) return null;
    
    return (
      <div className="absolute top-4 left-0 right-0 mx-auto w-[90%] bg-white/20 backdrop-blur-sm p-3 rounded-md shadow-lg z-10 text-center">
        <p className="text-white font-medium">{visualSteps[currentStep].description}</p>
      </div>
    );
  };
  
  if (!nodes || !nodes.length) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-white/80 animate-pulse">Select a graph algorithm to visualize</p>
      </div>
    );
  }
  
  const customNodes = nodes.map(node => {
    // Check if we should highlight this node based on current step data
    // Safely access node.data properties with default values if they don't exist
    const nodeData = node.data || {};
    const isStartNode = nodeData.isStart || nodeData.isSource || false;
    const isEndNode = nodeData.isEnd || nodeData.isTarget || false;
    const isVisited = nodeData.isVisited || false;
    const isCurrent = nodeData.isCurrent || nodeData.isProcessing || false;
    const inCurrentPath = nodeData.inCurrentPath || nodeData.isPath || false;
    const partOfResult = nodeData.partOfResult || nodeData.isPartOfResult || false;
    const isComparing = nodeData.isComparing || false;
    
    // Determine node styling based on its state
    let bgColor = '#FFFFFF'; // Default
    let borderColor = 'rgba(255, 255, 255, 0.3)';
    let boxShadow = 'none';
    let transform = 'scale(1)';
    
    if (isStartNode) {
      bgColor = '#60A5FA'; // Blue
      borderColor = '#93C5FD';
      boxShadow = '0 0 8px rgba(147, 197, 253, 0.6)';
    } else if (isEndNode) {
      bgColor = '#F472B6'; // Pink
      borderColor = '#FBCFE8';
      boxShadow = '0 0 8px rgba(251, 207, 232, 0.6)';
    } else if (isCurrent) {
      bgColor = '#3B82F6'; // Blue - for current
      borderColor = '#93C5FD';
      boxShadow = '0 0 12px rgba(147, 197, 253, 0.7)';
      transform = 'scale(1.1)';
    } else if (isComparing) {
      bgColor = '#FBBF24'; // Yellow - for comparing
      borderColor = '#FDE68A';
      boxShadow = '0 0 12px rgba(253, 230, 138, 0.7)';
      transform = 'scale(1.1)';
    } else if (partOfResult) {
      bgColor = '#34D399'; // Green - for swapping/result
      borderColor = '#A7F3D0';
      boxShadow = '0 0 8px rgba(167, 243, 208, 0.6)';
    } else if (inCurrentPath) {
      bgColor = '#38BDF8'; // Light blue - for path
      borderColor = '#BAE6FD';
      boxShadow = '0 0 8px rgba(186, 230, 253, 0.6)';
    } else if (isVisited) {
      bgColor = '#A855F7'; // Purple - for found/visited
      borderColor = '#C7D2FE';
      boxShadow = '0 0 8px rgba(199, 210, 254, 0.6)';
    }
    
    return {
      ...node,
      style: {
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '50%',
        color: '#1F2937',
        fontSize: '12px',
        fontWeight: 'bold',
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow,
        transform,
        transition: 'all 0.3s ease',
        opacity: isVisited || isCurrent || isComparing || inCurrentPath || partOfResult || isStartNode || isEndNode ? 1 : 0.75,
      },
    };
  });
  
  const customEdges = edges.map(edge => {
    // Check edge status based on step data with safe access
    const edgeData = edge.data || {};
    const isActive = edgeData.isActive || false;
    const isInPath = edgeData.isInPath || edgeData.isPath || false;
    const isPartOfResult = edgeData.isPartOfResult || false;
    const isComparing = edgeData.isComparing || false;
    const isVisited = edgeData.isVisited || false;
    
    // Style based on edge state
    let strokeColor = 'rgba(255, 255, 255, 0.5)'; // Default
    let strokeWidth = 1.5;
    let strokeOpacity = 0.5;
    let animated = false;
    let markerEnd = { type: MarkerType.Arrow };
    
    if (isPartOfResult) {
      strokeColor = '#34D399'; // Green for results/swapping
      strokeWidth = 3;
      strokeOpacity = 1;
      markerEnd = { type: MarkerType.ArrowClosed };
    } else if (isInPath) {
      strokeColor = '#38BDF8'; // Light blue for current path
      strokeWidth = 2.5;
      strokeOpacity = 0.8;
      animated = true;
    } else if (isComparing) {
      strokeColor = '#FBBF24'; // Yellow for comparing
      strokeWidth = 2.5;
      strokeOpacity = 1;
      animated = true;
    } else if (isActive) {
      strokeColor = '#3B82F6'; // Blue for active
      strokeWidth = 2;
      strokeOpacity = 0.9;
      animated = true;
    } else if (isVisited) {
      strokeColor = '#A855F7'; // Purple for visited
      strokeWidth = 2;
      strokeOpacity = 0.7;
    }
    
    return {
      ...edge,
      style: {
        stroke: strokeColor,
        strokeWidth,
        opacity: strokeOpacity,
      },
      animated,
      markerEnd,
    };
  });
  
  // Styles for minimap
  const minimapStyle = {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };
  
  return (
    <div className="relative h-full w-full">
      {renderExplanationBanner()}
      
      <ReactFlow
        nodes={customNodes}
        edges={customEdges}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(255, 255, 255, 0.3)" gap={12} variant={BackgroundVariant.Dots} />
        <Controls className="bg-white/10 backdrop-blur-sm text-white" />
        <MiniMap
          nodeStrokeColor="rgba(255, 255, 255, 0.2)"
          nodeColor="#FFFFFF"
          nodeBorderRadius={50}
          style={minimapStyle}
        />
      </ReactFlow>
      
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 max-w-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#60A5FA' }}></div>
          <span className="text-xs text-white">Start</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F472B6' }}></div>
          <span className="text-xs text-white">End</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FBBF24' }}></div>
          <span className="text-xs text-white">Comparing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#A855F7' }}></div>
          <span className="text-xs text-white">Visited</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
          <span className="text-xs text-white">Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#38BDF8' }}></div>
          <span className="text-xs text-white">Path</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#34D399' }}></div>
          <span className="text-xs text-white">Result</span>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
