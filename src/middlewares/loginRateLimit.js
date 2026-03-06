const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const bucket = new Map();

const cleanup = () => {
  const now = Date.now();
  for (const [key, value] of bucket.entries()) {
    if (value.resetAt <= now) bucket.delete(key);
  }
};

setInterval(cleanup, 60 * 1000).unref();

export default function loginRateLimit(req, res, next) {
  const key = `${req.ip || 'unknown'}:${(req.body?.email || '').toLowerCase()}`;
  const now = Date.now();
  const current = bucket.get(key);

  if (!current || current.resetAt <= now) {
    bucket.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (current.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((current.resetAt - now) / 1000);
    res.setHeader('Retry-After', retryAfter);
    return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
  }

  current.count += 1;
  bucket.set(key, current);
  return next();
}
