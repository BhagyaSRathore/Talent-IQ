// Simple in-memory rate limiter
// For production with multiple servers, use Redis-based rate limiting

const requestCounts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // 100 requests per window

export const rateLimiter = (req, res, next) => {
  // Skip rate limiting in development if needed
  if (process.env.NODE_ENV === 'development' && process.env.SKIP_RATE_LIMIT === 'true') {
    return next();
  }

  const identifier = req.user?.clerkId || req.ip || 'anonymous';
  const now = Date.now();
  
  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    for (const [key, data] of requestCounts.entries()) {
      if (now - data.resetTime > WINDOW_MS) {
        requestCounts.delete(key);
      }
    }
  }

  // Get or create rate limit data for this identifier
  let rateData = requestCounts.get(identifier);
  
  if (!rateData || now - rateData.resetTime > WINDOW_MS) {
    rateData = {
      count: 0,
      resetTime: now,
    };
    requestCounts.set(identifier, rateData);
  }

  rateData.count++;

  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - rateData.count));
  res.setHeader('X-RateLimit-Reset', new Date(rateData.resetTime + WINDOW_MS).toISOString());

  if (rateData.count > MAX_REQUESTS) {
    return res.status(429).json({
      message: 'Too many requests, please try again later',
      retryAfter: Math.ceil((rateData.resetTime + WINDOW_MS - now) / 1000),
    });
  }

  next();
};

// Stricter rate limiter for sensitive operations
export const strictRateLimiter = (req, res, next) => {
  const identifier = req.user?.clerkId || req.ip || 'anonymous';
  const key = `strict_${identifier}`;
  const now = Date.now();
  const STRICT_WINDOW = 60 * 1000; // 1 minute
  const STRICT_MAX = 10; // 10 requests per minute

  let rateData = requestCounts.get(key);
  
  if (!rateData || now - rateData.resetTime > STRICT_WINDOW) {
    rateData = {
      count: 0,
      resetTime: now,
    };
    requestCounts.set(key, rateData);
  }

  rateData.count++;

  if (rateData.count > STRICT_MAX) {
    return res.status(429).json({
      message: 'Too many requests, please slow down',
      retryAfter: Math.ceil((rateData.resetTime + STRICT_WINDOW - now) / 1000),
    });
  }

  next();
};
