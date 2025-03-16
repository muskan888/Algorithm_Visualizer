import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, Play, Code, Search, Info, PlusCircle, MinusCircle, Share, Bookmark, CheckCircle2, Zap, LightbulbIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { algorithmPatterns, generatePatternExample } from '@/utils/algorithms/algorithmPatterns';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import AlgorithmCode from '@/components/AlgorithmCode';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const LearnDSA = () => {
  const [selectedPattern, setSelectedPattern] = useState(algorithmPatterns[0].id);
  const [selectedExample, setSelectedExample] = useState(0);
  const [visualSteps, setVisualSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTab, setCurrentTab] = useState("overview");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [completedPatterns, setCompletedPatterns] = useState<string[]>([]);
  const [showDifficulty, setShowDifficulty] = useState(true);
  const { toast } = useToast();

  const filteredPatterns = algorithmPatterns.filter(pattern => 
    pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.commonProblems.some(problem => problem.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pattern = algorithmPatterns.find(p => p.id === selectedPattern);

  useEffect(() => {
    const steps = generatePatternExample(selectedPattern, selectedExample);
    setVisualSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [selectedPattern, selectedExample]);

  useEffect(() => {
    let animationTimer: NodeJS.Timeout;
    
    if (isPlaying && currentStep < visualSteps.length - 1) {
      animationTimer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1100 - speed * 100);
    } else if (currentStep >= visualSteps.length - 1) {
      setIsPlaying(false);
    }
    
    return () => clearTimeout(animationTimer);
  }, [isPlaying, currentStep, visualSteps.length, speed]);

  const getCurrentStepData = () => {
    if (visualSteps.length === 0) return [];
    return visualSteps[currentStep]?.array || [];
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const goToNextStep = () => currentStep < visualSteps.length - 1 && setCurrentStep(currentStep + 1);
  const goToPreviousStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);
  const goToFirstStep = () => setCurrentStep(0);
  const goToLastStep = () => setCurrentStep(visualSteps.length - 1);

  const toggleCompletedPattern = (patternId: string) => {
    if (completedPatterns.includes(patternId)) {
      setCompletedPatterns(prev => prev.filter(id => id !== patternId));
      toast({
        title: "Pattern unmarked",
        description: "You've unmarked this pattern as completed.",
        duration: 2000,
      });
    } else {
      setCompletedPatterns(prev => [...prev, patternId]);
      toast({
        title: "Pattern completed! 🎉",
        description: "Great job! You've marked this pattern as completed.",
        duration: 2000,
      });
    }
  };

  const getDifficultyClass = (level: string) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const sharePattern = () => {
    if (navigator.share && pattern) {
      navigator.share({
        title: `AlgoLab - ${pattern.name}`,
        text: `Check out the ${pattern.name} algorithm pattern on AlgoLab!`,
        url: window.location.href,
      }).then(() => {
        toast({
          title: "Shared successfully!",
          description: "Thanks for sharing this algorithm pattern!",
          duration: 2000,
        });
      }).catch(console.error);
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the Web Share API. Try copying the URL manually.",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-border py-4 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">AlgoLab - Learn DSA</h1>
            {pattern && (
              <Badge variant="outline" className="ml-4">
                {completedPatterns.length}/{algorithmPatterns.length} Completed
              </Badge>
            )}
          </div>
          <div className="flex gap-4">
            <Link to="/visualizer" className="text-sm text-primary/80 hover:text-primary transition-colors">
              Algorithm Visualizer
            </Link>
            <Link to="/" className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Algorithm Patterns</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowDifficulty(!showDifficulty)}>
                  {showDifficulty ? <MinusCircle size={16} /> : <PlusCircle size={16} />}
                </Button>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patterns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
                {filteredPatterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => {
                      setSelectedPattern(pattern.id);
                      setCurrentTab("overview");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                      selectedPattern === pattern.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      {completedPatterns.includes(pattern.id) && (
                        <CheckCircle2 size={16} className="mr-2 text-green-500" />
                      )}
                      <span>{pattern.name}</span>
                    </div>
                    {showDifficulty && pattern.difficulty && (
                      <Badge variant="outline" className={`text-xs ${getDifficultyClass(pattern.difficulty)}`}>
                        {pattern.difficulty}
                      </Badge>
                    )}
                  </button>
                ))}
                
                {filteredPatterns.length === 0 && (
                  <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                    No patterns found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {pattern && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 flex items-center">
                        {pattern.name}
                        {pattern.difficulty && (
                          <Badge variant="outline" className={`ml-2 ${getDifficultyClass(pattern.difficulty)}`}>
                            {pattern.difficulty}
                          </Badge>
                        )}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{pattern.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleCompletedPattern(pattern.id)}
                      >
                        {completedPatterns.includes(pattern.id) ? (
                          <>
                            <CheckCircle2 className="mr-1" size={16} />
                            Completed
                          </>
                        ) : (
                          <>
                            <Bookmark className="mr-1" size={16} />
                            Mark Complete
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={sharePattern}
                      >
                        <Share size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mb-4 flex items-start">
                    <Zap className="text-blue-500 dark:text-blue-400 mt-1 mr-2 flex-shrink-0" size={18} />
                    <div>
                      <h3 className="font-semibold mb-1">When to use:</h3>
                      <p className="text-gray-700 dark:text-gray-300">{pattern.whenToUse}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Common Problems:</h3>
                    <div className="flex flex-wrap gap-2">
                      {pattern.commonProblems.map((problem, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-700">
                          {problem}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                      <Book size={16} /> Overview
                    </TabsTrigger>
                    <TabsTrigger value="visualization" className="flex items-center gap-2">
                      <Play size={16} /> Visualization
                    </TabsTrigger>
                    <TabsTrigger value="implementation" className="flex items-center gap-2">
                      <Code size={16} /> Implementation
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                      <h3 className="text-xl font-semibold mb-4">Pattern Overview</h3>
                      <p className="mb-4">{pattern.description}</p>
                      
                      {pattern.approach && (
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md mb-6">
                          <div className="flex items-start">
                            <div className="bg-amber-200 dark:bg-amber-800 p-2 rounded-md mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-800 dark:text-amber-200">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                                <path d="M9 18h6"></path>
                                <path d="M10 22h4"></path>
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-amber-800 dark:text-amber-200">Approach</h4>
                              <p className="text-gray-700 dark:text-gray-300">{pattern.approach}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <h4 className="font-semibold mb-2">Key Characteristics:</h4>
                      <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Best used for: {pattern.whenToUse}</li>
                        <li>Time Complexity: {pattern.examples[0]?.timeComplexity || 'Varies'}</li>
                        <li>Space Complexity: {pattern.examples[0]?.spaceComplexity || 'Varies'}</li>
                        {pattern.keyPoints && pattern.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                      
                      <h4 className="font-semibold mb-2">Example Problems:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pattern.commonProblems.map((problem, index) => (
                          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                            <p className="font-medium">{problem}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="visualization" className="space-y-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">
                            {pattern.examples[selectedExample]?.name || "Visualization"}
                          </h3>
                          <div>
                            <select 
                              className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-sm"
                              value={selectedExample}
                              onChange={(e) => setSelectedExample(parseInt(e.target.value))}
                            >
                              {pattern.examples.map((ex, idx) => (
                                <option key={idx} value={idx}>{ex.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {pattern.examples[selectedExample]?.description}
                        </p>
                      </div>
                      
                      <div className="p-4">
                        <AlgorithmVisualizer
                          data={getCurrentStepData()}
                          currentStep={currentStep}
                          visualSteps={visualSteps}
                          algorithm={pattern.id}
                          category="pattern"
                        />
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-b-lg border-t">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={goToFirstStep}
                              disabled={currentStep === 0 || visualSteps.length === 0}
                            >
                              «
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={goToPreviousStep}
                              disabled={currentStep === 0 || visualSteps.length === 0}
                            >
                              ‹
                            </Button>
                            <Button 
                              variant={isPlaying ? "default" : "outline"} 
                              size="sm" 
                              onClick={togglePlayPause}
                              disabled={visualSteps.length === 0}
                            >
                              {isPlaying ? "Pause" : "Play"}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={goToNextStep}
                              disabled={currentStep === visualSteps.length - 1 || visualSteps.length === 0}
                            >
                              ›
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={goToLastStep}
                              disabled={currentStep === visualSteps.length - 1 || visualSteps.length === 0}
                            >
                              »
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={speed}
                              onChange={(e) => setSpeed(parseInt(e.target.value))}
                              className="w-24"
                            />
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Step {visualSteps.length > 0 ? currentStep + 1 : 0} of {visualSteps.length}
                          </div>
                        </div>
                        
                        {visualSteps.length > 0 && (
                          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
                            <div className="flex">
                              <Info className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" size={16} />
                              <p>{visualSteps[currentStep]?.description || "No description available"}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="implementation" className="mt-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">
                            {pattern.examples[selectedExample]?.name || "Implementation"}
                          </h3>
                          <div>
                            <select 
                              className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-sm"
                              value={selectedExample}
                              onChange={(e) => setSelectedExample(parseInt(e.target.value))}
                            >
                              {pattern.examples.map((ex, idx) => (
                                <option key={idx} value={idx}>{ex.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-[600px] p-4">
                        <AlgorithmCode
                          code={pattern.examples[selectedExample]?.codeString || ""}
                          highlightLine={visualSteps[currentStep]?.highlightLine}
                        />
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-b-lg border-t">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Time Complexity</h4>
                            <p className="text-sm">{pattern.examples[selectedExample]?.timeComplexity || "N/A"}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Space Complexity</h4>
                            <p className="text-sm">{pattern.examples[selectedExample]?.spaceComplexity || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnDSA;
