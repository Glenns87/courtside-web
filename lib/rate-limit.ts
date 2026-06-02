type Entry = { timestamps: number[] };

const store = new Map<string, Entry>();

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX = 5;
const MAX_KEYS = 10_000;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * Sliding-window log per key, process-local.
 *
 * Why: MVP only — geen Upstash. Op serverless reset dit bij cold start;
 * acceptabel als eerste lijn tegen burst-misbruik, niet als hard quota.
 */
export function rateLimit(
  key: string,
  opts: { windowMs?: number; max?: number } = {},
): RateLimitResult {
  const windowMs = opts.windowMs ?? DEFAULT_WINDOW_MS;
  const max = opts.max ?? DEFAULT_MAX;
  const now = Date.now();
  const cutoff = now - windowMs;

  const entry = store.get(key) ?? { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= max) {
    const oldest = entry.timestamps[0];
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000),
    );
    store.set(key, entry);
    return { ok: false, remaining: 0, retryAfterSeconds };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  if (store.size > MAX_KEYS) {
    for (const [k, v] of store) {
      const last = v.timestamps[v.timestamps.length - 1];
      if (last === undefined || last < cutoff) store.delete(k);
      if (store.size <= MAX_KEYS * 0.9) break;
    }
  }

  return {
    ok: true,
    remaining: max - entry.timestamps.length,
    retryAfterSeconds: 0,
  };
}
