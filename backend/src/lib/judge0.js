import axios from 'axios';

// Judge0 Language IDs
export const LANGUAGE_IDS = {
  javascript: 63,    // Node.js
  python: 71,        // Python 3
  java: 62,          // Java
  cpp: 54,           // C++ (GCC 9.2.0)
  c: 50,             // C (GCC 9.2.0)
  typescript: 74,    // TypeScript
};

// Judge0 Configuration
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const JUDGE0_HOST = 'judge0-ce.p.rapidapi.com';

// Create axios instance for Judge0
const judge0Client = axios.create({
  baseURL: JUDGE0_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': JUDGE0_API_KEY || 'demo-key',
    'X-RapidAPI-Host': JUDGE0_HOST,
  },
});

/**
 * Submit code for execution
 * @param {string} code - The source code to execute
 * @param {string} language - Programming language (javascript, python, java, cpp, c, typescript)
 * @param {string} stdin - Standard input for the program
 * @returns {Promise<Object>} Submission token and details
 */
export async function submitCode(code, language, stdin = '') {
  try {
    const languageId = LANGUAGE_IDS[language.toLowerCase()];
    
    if (!languageId) {
      throw new Error(`Unsupported language: ${language}`);
    }

    // Check if Judge0 is configured
    if (!JUDGE0_API_KEY || JUDGE0_API_KEY === 'demo-key') {
      console.warn('⚠️  Judge0 API not configured - returning mock response');
      return {
        token: `mock_${Date.now()}`,
        isMock: true,
      };
    }

    const response = await judge0Client.post('/submissions?base64_encoded=false&wait=false', {
      source_code: code,
      language_id: languageId,
      stdin: stdin || '',
      cpu_time_limit: 5,        // 5 seconds max
      memory_limit: 128000,      // 128 MB max
      wall_time_limit: 10,       // 10 seconds max wall time
    });

    return {
      token: response.data.token,
      isMock: false,
    };
  } catch (error) {
    console.error('Error submitting code to Judge0:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to submit code for execution');
  }
}

/**
 * Get execution result
 * @param {string} token - Submission token
 * @returns {Promise<Object>} Execution result
 */
export async function getSubmission(token) {
  try {
    // Handle mock submissions
    if (token.startsWith('mock_')) {
      return {
        status: { id: 3, description: 'Accepted' },
        stdout: 'Mock execution successful!\nJudge0 API not configured.\nConfigure JUDGE0_API_KEY in .env to enable real code execution.',
        stderr: null,
        compile_output: null,
        time: '0.001',
        memory: 2048,
        isMock: true,
      };
    }

    const response = await judge0Client.get(`/submissions/${token}?base64_encoded=false`);
    
    return {
      status: response.data.status,
      stdout: response.data.stdout,
      stderr: response.data.stderr,
      compile_output: response.data.compile_output,
      time: response.data.time,
      memory: response.data.memory,
      exit_code: response.data.exit_code,
      exit_signal: response.data.exit_signal,
      isMock: false,
    };
  } catch (error) {
    console.error('Error getting submission from Judge0:', error.response?.data || error.message);
    throw new Error('Failed to get execution result');
  }
}

/**
 * Submit and wait for result (polling)
 * @param {string} code - The source code
 * @param {string} language - Programming language
 * @param {string} stdin - Standard input
 * @returns {Promise<Object>} Final execution result
 */
export async function executeCode(code, language, stdin = '') {
  try {
    // Submit code
    const submission = await submitCode(code, language, stdin);
    
    // If mock, return immediately
    if (submission.isMock) {
      return await getSubmission(submission.token);
    }

    // Poll for result (max 30 seconds)
    const maxAttempts = 30;
    const pollInterval = 1000; // 1 second
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      
      const result = await getSubmission(submission.token);
      
      // Status IDs: 1=In Queue, 2=Processing, 3=Accepted, 4+=Error states
      if (result.status.id > 2) {
        return result;
      }
    }

    throw new Error('Code execution timeout - took longer than 30 seconds');
  } catch (error) {
    console.error('Error executing code:', error.message);
    throw error;
  }
}

/**
 * Get language information
 * @returns {Promise<Array>} List of supported languages
 */
export async function getLanguages() {
  try {
    if (!JUDGE0_API_KEY || JUDGE0_API_KEY === 'demo-key') {
      return Object.keys(LANGUAGE_IDS).map(lang => ({
        id: LANGUAGE_IDS[lang],
        name: lang,
      }));
    }

    const response = await judge0Client.get('/languages');
    return response.data;
  } catch (error) {
    console.error('Error getting languages:', error.message);
    return [];
  }
}

/**
 * Validate code for security concerns
 * @param {string} code - Source code
 * @param {string} language - Programming language
 * @returns {Object} Validation result
 */
export function validateCode(code, language) {
  const errors = [];
  const warnings = [];

  // Basic size check
  if (code.length > 50000) {
    errors.push('Code is too long (max 50,000 characters)');
  }

  if (code.length === 0) {
    errors.push('Code cannot be empty');
  }

  // Language-specific checks
  if (language === 'javascript' || language === 'typescript') {
    // Warn about potentially dangerous operations (informational only)
    if (code.includes('require(') && code.includes('fs')) {
      warnings.push('File system access is restricted in the sandbox');
    }
    if (code.includes('require(') && code.includes('child_process')) {
      warnings.push('Child process execution is restricted in the sandbox');
    }
  }

  if (language === 'python') {
    if (code.includes('import os') || code.includes('import subprocess')) {
      warnings.push('System commands are restricted in the sandbox');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
