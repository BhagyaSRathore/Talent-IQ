import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Settings, Loader2 } from 'lucide-react';

const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript', extension: 'js' },
  { value: 'python', label: 'Python', extension: 'py' },
  { value: 'java', label: 'Java', extension: 'java' },
  { value: 'cpp', label: 'C++', extension: 'cpp' },
  { value: 'c', label: 'C', extension: 'c' },
  { value: 'typescript', label: 'TypeScript', extension: 'ts' },
];

const STARTER_CODE = {
  javascript: `// Write your JavaScript solution here
function solution() {
  // Your code here
  return null;
}

console.log(solution());`,
  python: `# Write your Python solution here
def solution():
    # Your code here
    return None

print(solution())`,
  java: `// Write your Java solution here
public class Solution {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello World");
    }
}`,
  cpp: `// Write your C++ solution here
#include <iostream>
using namespace std;

int main() {
    // Your code here
    cout << "Hello World" << endl;
    return 0;
}`,
  c: `// Write your C solution here
#include <stdio.h>

int main() {
    // Your code here
    printf("Hello World\\n");
    return 0;
}`,
  typescript: `// Write your TypeScript solution here
function solution(): any {
  // Your code here
  return null;
}

console.log(solution());`,
};

const CodeEditor = ({ 
  sessionId, 
  socket, 
  currentUser,
  onRunCode 
}) => {
  const [code, setCode] = useState(STARTER_CODE.javascript);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);
  const isRemoteChange = useRef(false);

  useEffect(() => {
    if (!socket) return;

    // Handle code updates from other users
    socket.on('code-update', ({ code: newCode, language: newLanguage }) => {
      isRemoteChange.current = true;
      setCode(newCode);
      if (newLanguage) {
        setLanguage(newLanguage);
      }
    });

    // Handle language updates
    socket.on('language-update', ({ language: newLanguage }) => {
      setLanguage(newLanguage);
      setCode(STARTER_CODE[newLanguage] || '');
    });

    return () => {
      socket.off('code-update');
      socket.off('language-update');
    };
  }, [socket]);

  const handleEditorChange = (value) => {
    setCode(value || '');
    
    // Only emit changes if they're from local user
    if (!isRemoteChange.current && socket && sessionId) {
      socket.emit('code-change', {
        sessionId,
        code: value || '',
        language,
      });
    }
    
    isRemoteChange.current = false;
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(STARTER_CODE[newLanguage] || '');
    
    if (socket && sessionId) {
      socket.emit('language-change', {
        sessionId,
        language: newLanguage,
      });
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the code? This will affect all participants.')) {
      const starterCode = STARTER_CODE[language] || '';
      setCode(starterCode);
      
      if (socket && sessionId) {
        socket.emit('code-change', {
          sessionId,
          code: starterCode,
          language,
        });
      }
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    
    if (socket && sessionId) {
      socket.emit('code-execution', {
        sessionId,
        userId: currentUser?._id,
        userName: currentUser?.name,
      });
    }

    try {
      if (onRunCode) {
        await onRunCode(code, language);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    
    // Configure editor
    editor.updateOptions({
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: fontSize,
      wordWrap: 'on',
      automaticLayout: true,
    });
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize });
    }
  }, [fontSize]);

  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-1.5 bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-blue-500 focus:outline-none cursor-pointer"
          >
            {LANGUAGE_OPTIONS.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          {/* Theme Selector */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-3 py-1.5 bg-slate-700 text-white text-sm rounded border border-slate-600 focus:border-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 text-slate-400 hover:text-white transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors flex items-center space-x-1"
            title="Reset Code"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded font-semibold transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm text-slate-300">
              <span>Font Size:</span>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-white w-8">{fontSize}</span>
            </label>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme={theme}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
