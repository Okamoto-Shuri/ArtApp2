import { useState, useCallback } from 'react';

interface RetryConfig {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
}

export function useRetry(
  operation: () => Promise<any>,
  config: RetryConfig = {}
) {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
  } = config;

  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const calculateDelay = (attempt: number) => {
    const delay = initialDelay * Math.pow(backoffFactor, attempt);
    return Math.min(delay, maxDelay);
  };

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await operation();
      setAttempts(0);
      return result;
    } catch (err) {
      setAttempts((current) => current + 1);
      
      if (attempts < maxAttempts - 1) {
        const delay = calculateDelay(attempts);
        await new Promise(resolve => setTimeout(resolve, delay));
        return execute();
      }
      
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [operation, attempts, maxAttempts]);

  const reset = useCallback(() => {
    setAttempts(0);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    execute,
    reset,
    attempts,
    isLoading,
    error,
    hasError: error !== null,
  };
}