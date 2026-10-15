import { useState } from 'react';
import { Terminal, X, Check, AlertCircle, Loader2 } from 'lucide-react';

const OutputConsole = ({ output, isLoading, error }) => {
  const [customInput, setCustomInput] = useState('');

  const getStatusIcon = () => {
    if (isLoading) {
      return <Loader2 className="h-5 w-5 animate-spin text-blue-400" />;
    }
    if (error) {
      return <AlertCircle className="h-5 w-5 text-red-400" />;
    }
    if (output) {
      return <Check className="h-5 w-5 text-green-400" />;
    }
    return <Terminal className="h-5 w-5 text-slate-400" />;
  };

  const getStatusText = () => {
    if (isLoading) return 'Running...';
    if (error) return 'Error';
    if (output) return 'Completed';
    return 'Ready';
  };

  const getStatusColor = () => {
    if (isLoading) return 'text-blue-400';
    if (error) return 'text-red-400';
    if (output) return 'text-green-400';
    return 'text-slate-400';
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-sm font-semibold ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {isLoading && (
          <div className="flex items-center space-x-2 text-blue-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Executing your code...</span>
          </div>
        )}

        {error && (
          <div className="space-y-2">
            <div className="flex items-start space-x-2 text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Execution Error:</p>
                <pre className="mt-2 text-sm whitespace-pre-wrap">{error}</pre>
              </div>
            </div>
          </div>
        )}

        {output && !error && (
          <div className="space-y-2">
            {output.stdout && (
              <div>
                <p className="text-green-400 font-semibold mb-1">Output:</p>
                <pre className="text-slate-300 whitespace-pre-wrap">{output.stdout}</pre>
              </div>
            )}

            {output.stderr && (
              <div className="mt-3">
                <p className="text-yellow-400 font-semibold mb-1">Errors:</p>
                <pre className="text-yellow-300 whitespace-pre-wrap">{output.stderr}</pre>
              </div>
            )}

            {output.compile_output && (
              <div className="mt-3">
                <p className="text-orange-400 font-semibold mb-1">Compilation:</p>
                <pre className="text-orange-300 whitespace-pre-wrap">{output.compile_output}</pre>
              </div>
            )}

            {output.time && (
              <div className="mt-3 text-slate-400 text-xs">
                Execution time: {output.time}s
              </div>
            )}

            {output.memory && (
              <div className="text-slate-400 text-xs">
                Memory used: {(output.memory / 1024).toFixed(2)} MB
              </div>
            )}
          </div>
        )}

        {!isLoading && !output && !error && (
          <div className="text-slate-500 text-center py-8">
            <Terminal className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Run your code to see the output here</p>
          </div>
        )}
      </div>

      {/* Custom Input Section */}
      <div className="border-t border-slate-700 p-3 bg-slate-800">
        <label className="block text-xs text-slate-400 mb-2">
          Custom Input (optional):
        </label>
        <textarea
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Enter custom input for your program..."
          className="w-full px-3 py-2 bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-blue-500 focus:outline-none resize-none font-mono"
          rows={3}
        />
      </div>
    </div>
  );
};

export default OutputConsole;
