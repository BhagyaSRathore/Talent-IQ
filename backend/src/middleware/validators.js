// Input validation middleware using basic validation
// For production, consider using express-validator or joi

export const validateSessionCreation = (req, res, next) => {
  const { problem, difficulty } = req.body;

  // Validate problem
  if (!problem || typeof problem !== 'string') {
    return res.status(400).json({ message: 'Problem description is required and must be a string' });
  }

  if (problem.trim().length < 5) {
    return res.status(400).json({ message: 'Problem description must be at least 5 characters' });
  }

  if (problem.length > 1000) {
    return res.status(400).json({ message: 'Problem description must be less than 1000 characters' });
  }

  // Sanitize problem (basic XSS prevention)
  req.body.problem = problem.trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // Validate difficulty
  const validDifficulties = ['easy', 'medium', 'hard'];
  if (!difficulty || !validDifficulties.includes(difficulty.toLowerCase())) {
    return res.status(400).json({ 
      message: 'Difficulty must be one of: easy, medium, hard' 
    });
  }

  req.body.difficulty = difficulty.toLowerCase();

  next();
};

export const validateSessionId = (req, res, next) => {
  const { id } = req.params;

  // Basic MongoDB ObjectId validation (24 hex characters)
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({ message: 'Invalid session ID format' });
  }

  next();
};

export const sanitizeInput = (req, res, next) => {
  // Basic sanitization for all string inputs
  const sanitize = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove potential XSS vectors
        obj[key] = obj[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};
