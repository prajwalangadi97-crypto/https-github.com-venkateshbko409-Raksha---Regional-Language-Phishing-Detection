import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useAnimatedCounter — Smoothly animates a number from 0 to target.
 * Used for the telemetry dashboard cards.
 */
export function useAnimatedCounter(target: number, duration = 2000, enabled = true): number {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || target <= 0) {
      setCount(target);
      return;
    }
    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, enabled]);

  return count;
}

/**
 * useApiHealth — Pings the backend health endpoint periodically.
 * Returns live connection status.
 */
export function useApiHealth(intervalMs = 30000) {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [latency, setLatency] = useState<number | null>(null);

  const check = useCallback(async () => {
    const start = performance.now();
    try {
      const res = await fetch('/api/v1/telemetry/stats', { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        setLatency(Math.round(performance.now() - start));
        setStatus('connected');
      } else {
        setStatus('disconnected');
        setLatency(null);
      }
    } catch {
      setStatus('disconnected');
      setLatency(null);
    }
  }, []);

  useEffect(() => {
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [check, intervalMs]);

  return { status, latency };
}

/**
 * useCurrentTime — Returns a live-updating IST timestamp string.
 */
export function useCurrentTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
