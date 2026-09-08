/**
 * In-memory sliding window rate limiter for Next.js server actions and API routes.
 */

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

class RateLimiter {
  private cache: Map<string, RateLimitRecord>;
  private windowMs: number;
  private maxRequests: number;

  constructor(options: { windowMs: number; maxRequests: number }) {
    this.cache = new Map();
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;

    // Periodic cleanup every 5 minutes to prevent memory growth
    if (typeof setInterval !== "undefined") {
      setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, record] of this.cache.entries()) {
      if (now > record.resetAt) {
        this.cache.delete(key);
      }
    }
  }

  public check(identifier: string): {
    success: boolean;
    remaining: number;
    resetInSeconds: number;
  } {
    const now = Date.now();
    const record = this.cache.get(identifier);

    if (!record || now > record.resetAt) {
      // First request or window expired
      this.cache.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs,
      });

      return {
        success: true,
        remaining: this.maxRequests - 1,
        resetInSeconds: Math.ceil(this.windowMs / 1000),
      };
    }

    if (record.count >= this.maxRequests) {
      // Limit reached
      return {
        success: false,
        remaining: 0,
        resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
      };
    }

    record.count += 1;
    return {
      success: true,
      remaining: this.maxRequests - record.count,
      resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }
}

// Global rate limiter instance for contact form submissions:
// Allows 5 contact form submissions per IP address per 10 minutes
export const contactFormRateLimiter = new RateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 5,
});
