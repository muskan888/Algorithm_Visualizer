
import React from 'react';

interface AlgorithmCodeProps {
  code: string;
  highlightLine?: number;
}

const AlgorithmCode: React.FC<AlgorithmCodeProps> = ({ code, highlightLine = -1 }) => {
  // Split the code into lines
  const codeLines = code.split('\n');

  return (
    <div className="bg-slate-900 rounded-xl p-4 overflow-hidden flex flex-col h-full shadow-lg border border-white/10">
      <h2 className="text-lg font-medium mb-2 text-white">Code Implementation</h2>
      <div className="flex-grow overflow-auto rounded-lg bg-slate-800 shadow-inner">
        {codeLines.map((line, index) => (
          <div
            key={index}
            className={`py-1 px-3 font-mono text-sm transition-colors ${
              highlightLine === index 
                ? 'bg-algo-yellow/20 border-l-4 border-algo-yellow' 
                : 'border-l-4 border-transparent'
            }`}
          >
            <span className="mr-3 text-slate-500 select-none inline-block w-6 text-right">{index + 1}</span>
            <span className={highlightLine === index ? 'text-white font-semibold' : 'text-slate-300'}>
              {line || ' '}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmCode;
