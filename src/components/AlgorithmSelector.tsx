
import React from 'react';
import { Card } from '@/components/ui/card';
import { sortingAlgorithms } from '@/utils/algorithms/sortingAlgorithms';
import { searchingAlgorithms } from '@/utils/algorithms/searchingAlgorithms';
import { graphAlgorithms } from '@/utils/algorithms/graphAlgorithms';
import { Badge } from '@/components/ui/badge';

interface AlgorithmSelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedAlgorithm: string | null;
  onSelectAlgorithm: (algorithmId: string) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedAlgorithm,
  onSelectAlgorithm
}) => {
  // Get algorithms based on the selected category
  const getAlgorithms = () => {
    switch (selectedCategory) {
      case 'sorting':
        return sortingAlgorithms;
      case 'searching':
        return searchingAlgorithms;
      case 'graph':
        return graphAlgorithms;
      default:
        return [];
    }
  };

  const algorithms = getAlgorithms();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sorting':
        return 'from-algo-blue to-algo-purple';
      case 'searching':
        return 'from-algo-green to-algo-cyan';
      case 'graph':
        return 'from-algo-red to-algo-yellow';
      default:
        return 'from-primary to-primary/70';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        {['sorting', 'searching', 'graph'].map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-3 rounded-full transition-all duration-300 shadow-md ${
              selectedCategory === category
                ? `bg-gradient-to-r ${getCategoryColor(category)} text-white`
                : 'bg-slate-800 text-white/80 hover:bg-slate-700'
            }`}
          >
            <span className="capitalize font-medium">{category}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {algorithms.map((algorithm) => (
          <Card
            key={algorithm.id}
            className={`transition-all duration-300 hover:shadow-lg overflow-hidden ${
              selectedAlgorithm === algorithm.id
                ? 'ring-2 ring-primary transform scale-[1.02]'
                : 'hover:scale-[1.01]'
            }`}
            onClick={() => onSelectAlgorithm(algorithm.id)}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${getCategoryColor(selectedCategory)}`}></div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">{algorithm.name}</h3>
              <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {algorithm.description}
              </div>
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                  Time: {algorithm.timeComplexity}
                </Badge>
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                  Space: {algorithm.spaceComplexity}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
