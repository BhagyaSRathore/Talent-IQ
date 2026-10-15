import { executeCode, validateCode } from '../lib/judge0.js';
import Submission from '../models/Submission.js';
import Session from '../models/Session.js';

export async function runCode(req, res) {
  try {
    const { code, language, stdin } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!code || !language) {
      return res.status(400).json({ message: 'Code and language are required' });
    }

    // Validate code
    const validation = validateCode(code, language);
    if (!validation.isValid) {
      return res.status(400).json({ 
        message: 'Code validation failed',
        errors: validation.errors 
      });
    }

    // Execute code
    const result = await executeCode(code, language, stdin || '');

    // Return result immediately (don't save to DB for quick runs)
    res.status(200).json({
      output: {
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        compile_output: result.compile_output || '',
        time: result.time || '0',
        memory: result.memory || 0,
        status: result.status,
        exit_code: result.exit_code,
      },
      warnings: validation.warnings,
      isMock: result.isMock || false,
    });
  } catch (error) {
    console.error('Error in runCode controller:', error);
    res.status(500).json({ 
      message: error.message || 'Code execution failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export async function submitCode(req, res) {
  try {
    const { sessionId, code, language, stdin } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!sessionId || !code || !language) {
      return res.status(400).json({ 
        message: 'Session ID, code, and language are required' 
      });
    }

    // Check if session exists and user is a participant
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const isParticipant = 
      session.host.toString() === userId.toString() || 
      session.participant?.toString() === userId.toString();

    if (!isParticipant) {
      return res.status(403).json({ message: 'You are not a participant in this session' });
    }

    // Validate code
    const validation = validateCode(code, language);
    if (!validation.isValid) {
      return res.status(400).json({ 
        message: 'Code validation failed',
        errors: validation.errors 
      });
    }

    // Execute code
    const result = await executeCode(code, language, stdin || '');

    // Save submission to database
    const submission = await Submission.create({
      user: userId,
      session: sessionId,
      code,
      language,
      stdin: stdin || '',
      stdout: result.stdout || '',
      stderr: result.stderr || '',
      compileOutput: result.compile_output || '',
      status: result.status,
      time: result.time || '0',
      memory: result.memory || 0,
      exitCode: result.exit_code || 0,
      judgeToken: result.token || '',
      isMock: result.isMock || false,
    });

    res.status(201).json({
      submission: {
        _id: submission._id,
        output: {
          stdout: result.stdout || '',
          stderr: result.stderr || '',
          compile_output: result.compile_output || '',
          time: result.time || '0',
          memory: result.memory || 0,
          status: result.status,
          exit_code: result.exit_code,
        },
        language,
        createdAt: submission.createdAt,
      },
      warnings: validation.warnings,
      isMock: result.isMock || false,
    });
  } catch (error) {
    console.error('Error in submitCode controller:', error);
    res.status(500).json({ 
      message: error.message || 'Code submission failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export async function getSubmissions(req, res) {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;

    // Check if session exists
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if user is a participant
    const isParticipant = 
      session.host.toString() === userId.toString() || 
      session.participant?.toString() === userId.toString();

    if (!isParticipant) {
      return res.status(403).json({ message: 'You are not a participant in this session' });
    }

    // Get submissions for this session
    const submissions = await Submission.find({ session: sessionId })
      .populate('user', 'name email profileImage')
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({ submissions });
  } catch (error) {
    console.error('Error in getSubmissions controller:', error);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
}

export async function getUserSubmissions(req, res) {
  try {
    const userId = req.user._id;
    const { limit = 20 } = req.query;

    const submissions = await Submission.find({ user: userId })
      .populate('session', 'problem difficulty status')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ submissions });
  } catch (error) {
    console.error('Error in getUserSubmissions controller:', error);
    res.status(500).json({ message: 'Failed to fetch user submissions' });
  }
}
