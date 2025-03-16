
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight, Rewind, RefreshCw } from 'lucide-react';

interface AlgorithmControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToFirstStep: () => void;
  goToLastStep: () => void;
  resetAlgorithm: () => void;
  speed: number;
  setSpeed: (speed: number) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  currentStep: number;
  totalSteps: number;
  targetValue?: number;
  setTargetValue?: (value: number) => void;
  disableControls?: boolean;
  algorithmCategory: string;
}

const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({
  isPlaying,
  togglePlayPause,
  goToNextStep,
  goToPreviousStep,
  goToFirstStep,
  goToLastStep,
  resetAlgorithm,
  speed,
  setSpeed,
  arraySize,
  setArraySize,
  currentStep,
  totalSteps,
  targetValue,
  setTargetValue,
  disableControls = false,
  algorithmCategory
}) => {
  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
  };

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (!isNaN(size) && size >= 5 && size <= 100) {
      setArraySize(size);
    }
  };

  const handleTargetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setTargetValue) {
      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        setTargetValue(value);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 rounded-xl p-5 shadow-lg border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-medium text-white">
          Step: <span className="text-algo-blue">{currentStep + 1}</span> / <span className="text-algo-purple">{totalSteps}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetAlgorithm}
          disabled={disableControls}
          className="text-xs bg-slate-700 text-white hover:bg-slate-600 border-white/20"
        >
          <RefreshCw className="w-3 h-3 mr-1 text-algo-cyan" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div className="flex justify-between items-center space-x-2 bg-slate-700/50 rounded-lg p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToFirstStep}
              disabled={currentStep === 0 || disableControls}
              className="hover:bg-slate-600 text-algo-yellow"
            >
              <Rewind className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousStep}
              disabled={currentStep === 0 || disableControls}
              className="hover:bg-slate-600 text-algo-yellow"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button
              variant={isPlaying ? "outline" : "default"}
              size="icon"
              onClick={togglePlayPause}
              disabled={disableControls || currentStep === totalSteps - 1}
              className={`w-12 h-12 rounded-full transition-all ${isPlaying ? 'bg-algo-red hover:bg-algo-red/80' : 'bg-algo-green hover:bg-algo-green/80'}`}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNextStep}
              disabled={currentStep === totalSteps - 1 || disableControls}
              className="hover:bg-slate-600 text-algo-yellow"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={goToLastStep}
              disabled={currentStep === totalSteps - 1 || disableControls}
              className="hover:bg-slate-600 text-algo-yellow"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Speed</label>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-white/70">Slow</span>
            <Slider
              value={[speed]}
              min={1}
              max={10}
              step={1}
              onValueChange={handleSpeedChange}
              disabled={disableControls}
              className="flex-grow"
            />
            <span className="text-xs text-white/70">Fast</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Array Size</label>
          <Input
            type="number"
            value={arraySize}
            onChange={handleArraySizeChange}
            min={5}
            max={100}
            disabled={disableControls}
            className="h-8 bg-slate-700 text-white border-white/20"
          />
        </div>

        {algorithmCategory === 'searching' && setTargetValue && (
          <div className="col-span-2 space-y-1">
            <label className="text-sm font-medium text-white">Target Value</label>
            <Input
              type="number"
              value={targetValue}
              onChange={handleTargetValueChange}
              disabled={disableControls}
              className="h-8 bg-slate-700 text-white border-white/20"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmControls;
