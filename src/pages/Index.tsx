
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { sortingAlgorithms } from '@/utils/algorithms/sortingAlgorithms';
import { searchingAlgorithms } from '@/utils/algorithms/searchingAlgorithms';
import { graphAlgorithms, sampleGraphData } from '@/utils/algorithms/graphAlgorithms';
import { algorithmPatterns, generatePatternExample } from '@/utils/algorithms/algorithmPatterns';
import AlgorithmSelector from '@/components/AlgorithmSelector';
import AlgorithmControls from '@/components/AlgorithmControls';
import AlgorithmCode from '@/components/AlgorithmCode';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import { toast } from '@/components/ui/use-toast';
import { Home } from 'lucide-react';

// Type for algorithms
type AlgorithmCategory = 'sorting' | 'searching' | 'graph' | 'linked-list' | 'grid' | 'pattern';

const Index = () => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory>('sorting');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [array, setArray] = useState<number[]>([]);
  const [visualSteps, setVisualSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [arraySize, setArraySize] = useState(20);
  const [targetValue, setTargetValue] = useState(50);
  const [isRunning, setIsRunning] = useState(false);

  // Get algorithms based on the selected category
  const getAlgorithms = useCallback(() => {
    switch (selectedCategory) {
      case 'sorting':
        return sortingAlgorithms;
      case 'searching':
        return searchingAlgorithms;
      case 'graph':
      case 'linked-list':
      case 'grid':
        return graphAlgorithms;
      case 'pattern':
        return algorithmPatterns;
      default:
        return [];
    }
  }, [selectedCategory]);

  // Generate a new array
  const generateArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1);
    }
    setArray(newArray);
    setCurrentStep(0);
    setVisualSteps([]);
    setIsPlaying(false);
  }, [arraySize]);

  // Initialize array when component mounts or when array size changes
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Initialize first algorithm
  useEffect(() => {
    const algorithms = getAlgorithms();
    if (algorithms.length > 0 && !selectedAlgorithm) {
      setSelectedAlgorithm(algorithms[0]?.id);
    }
  }, [getAlgorithms, selectedAlgorithm, selectedCategory]);

  // Reset algorithm when changing categories
  useEffect(() => {
    const algorithms = getAlgorithms();
    if (algorithms.length > 0) {
      setSelectedAlgorithm(algorithms[0]?.id);
      generateArray();
    }
  }, [selectedCategory, getAlgorithms, generateArray]);

  // Effect for auto-playing the animation
  useEffect(() => {
    let animationTimer: NodeJS.Timeout;
    
    if (isPlaying && currentStep < visualSteps.length - 1) {
      animationTimer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1100 - speed * 100); // Speed ranges from 1-10, resulting in 100ms-1000ms delay
    } else if (currentStep >= visualSteps.length - 1) {
      setIsPlaying(false);
    }
    
    return () => clearTimeout(animationTimer);
  }, [isPlaying, currentStep, visualSteps.length, speed]);

  // Run algorithm and generate visualization steps
  const runAlgorithm = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the default behavior to stop page navigation
    e.preventDefault();
    
    if (!selectedAlgorithm) {
      toast({
        title: "No algorithm selected",
        description: "Please select an algorithm to run",
        variant: "destructive"
      });
      return;
    }
    
    setIsRunning(true);
    setCurrentStep(0);
    setIsPlaying(false);
    
    // Find the selected algorithm in the corresponding category
    const algorithms = getAlgorithms();
    const algorithm = algorithms.find(algo => algo.id === selectedAlgorithm);
    
    if (algorithm) {
      try {
        console.log("Running algorithm:", algorithm.name);
        
        let steps;
        if (selectedCategory === 'sorting') {
          // Sorting algorithms take just the array for bubble, merge, etc.
          console.log("Running sorting algorithm on:", [...array]);
          // Cast the algorithm to the correct type for sorting
          const sortAlgo = algorithm as typeof sortingAlgorithms[0];
          steps = sortAlgo.generateSteps([...array]);
        } else if (selectedCategory === 'searching') {
          // Searching algorithms take array and target value
          console.log("Running searching algorithm on:", [...array], "Target:", targetValue);
          // Cast the algorithm to the correct type for searching
          const searchAlgo = algorithm as typeof searchingAlgorithms[0];
          steps = searchAlgo.generateSteps([...array], targetValue);
        } else if (selectedCategory === 'graph' || selectedCategory === 'linked-list' || selectedCategory === 'grid') {
          // Graph algorithms use different data structure and parameters
          console.log(`Running ${selectedCategory} algorithm:`, algorithm.id);
          // For graph algorithms, use proper typing
          const graphAlgo = algorithm as typeof graphAlgorithms[0];
          
          // Different graph algorithms might need different parameters
          switch(algorithm.id) {
            case 'dijkstra':
              steps = graphAlgo.generateSteps(
                sampleGraphData.nodes,
                sampleGraphData.edges,
                'A', // Start node ID
                'F'  // Target node ID
              );
              break;
            case 'bfs':
            case 'dfs':
              steps = graphAlgo.generateSteps(
                sampleGraphData.nodes,
                sampleGraphData.edges,
                'A', // Start node ID
                '' // Empty target node ID
              );
              break;
            case 'cycle-detection':
              // Add all required parameters for cycle detection
              steps = graphAlgo.generateSteps(
                sampleGraphData.nodes,
                sampleGraphData.edges,
                '', // Start node ID (empty as it's not needed)
                '' // Target node ID (empty as it's not needed)
              );
              break;
            case 'number-of-islands':
              // Add all required parameters for islands
              steps = graphAlgo.generateSteps(
                sampleGraphData.nodes,
                sampleGraphData.edges,
                '', // Start node ID (empty as it's not needed)
                '' // Target node ID (empty as it's not needed)
              );
              break;
            default:
              steps = graphAlgo.generateSteps(
                sampleGraphData.nodes,
                sampleGraphData.edges,
                '', // Default start node
                '' // Default target node
              );
          }
        } else if (selectedCategory === 'pattern') {
          // Algorithm patterns (sliding window, two pointers, etc.)
          console.log("Running algorithm pattern:", algorithm.id);
          steps = generatePatternExample(algorithm.id);
        }
        
        console.log("Generated steps:", steps?.length);
        if (steps && steps.length > 0) {
          setVisualSteps(steps);
          setIsPlaying(true);
        } else {
          toast({
            title: "No visualization steps",
            description: "This algorithm didn't generate any steps to visualize",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error running algorithm:", error);
        toast({
          title: "Error running algorithm",
          description: "An error occurred while running the algorithm",
          variant: "destructive"
        });
      }
    }
    
    setIsRunning(false);
  };

  // Reset the algorithm
  const resetAlgorithm = () => {
    generateArray();
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Navigation controls
  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const goToNextStep = () => currentStep < visualSteps.length - 1 && setCurrentStep(currentStep + 1);
  const goToPreviousStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);
  const goToFirstStep = () => setCurrentStep(0);
  const goToLastStep = () => setCurrentStep(visualSteps.length - 1);

  // Get current step data
  const getCurrentStepData = () => {
    if (visualSteps.length === 0) return array;
    
    // For searching algorithms, return the current step's array
    if (selectedCategory === 'searching' && visualSteps[currentStep]?.array) {
      return visualSteps[currentStep].array;
    }
    
    return visualSteps[currentStep]?.array || array;
  };

  // Get current code
  const getCurrentCode = () => {
    if (!selectedAlgorithm) return '';
    
    const algorithms = getAlgorithms();
    const algorithm = algorithms.find(algo => algo.id === selectedAlgorithm);
    
    if (!algorithm) return '';
    
    // Special handling for algorithm patterns
    if (selectedCategory === 'pattern') {
      // For patterns, we need to get the code from the first example
      const pattern = algorithmPatterns.find(p => p.id === selectedAlgorithm);
      if (pattern && pattern.examples && pattern.examples.length > 0) {
        return pattern.examples[0].codeString;
      }
      return '';
    }
    
    // For other algorithm types, we need to check if codeString exists
    return 'codeString' in algorithm ? algorithm.codeString : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-border py-4 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">AlgoLab - Algorithm Visualizer</h1>
          <Link to="/" className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors">
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <AlgorithmSelector
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => setSelectedCategory(category as AlgorithmCategory)}
            selectedAlgorithm={selectedAlgorithm}
            onSelectAlgorithm={setSelectedAlgorithm}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Algorithm Visualization</h2>
                <button
                  onClick={runAlgorithm}
                  disabled={isRunning || !selectedAlgorithm}
                  className="btn-primary px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Run Algorithm
                </button>
              </div>
              
              <AlgorithmVisualizer
                data={getCurrentStepData()}
                currentStep={currentStep}
                visualSteps={visualSteps}
                algorithm={selectedAlgorithm || ''}
                category={selectedCategory}
              />
            </div>
            
            <AlgorithmControls
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              goToFirstStep={goToFirstStep}
              goToLastStep={goToLastStep}
              resetAlgorithm={resetAlgorithm}
              speed={speed}
              setSpeed={setSpeed}
              arraySize={arraySize}
              setArraySize={setArraySize}
              currentStep={currentStep}
              totalSteps={visualSteps.length}
              targetValue={targetValue}
              setTargetValue={setTargetValue}
              disableControls={visualSteps.length === 0}
              algorithmCategory={selectedCategory}
            />
          </div>
          
          <div className="h-[600px]">
            <AlgorithmCode
              code={getCurrentCode()}
              highlightLine={visualSteps[currentStep]?.highlightLine || visualSteps[currentStep]?.codeHighlight}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
