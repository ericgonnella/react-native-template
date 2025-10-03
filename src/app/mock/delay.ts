/**
 * Simulate network latency and random failures for mock data
 */

export const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const randomDelay = (min: number = 300, max: number = 800): Promise<void> => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
};

export const withRandomFailure = async <T>(
  fn: () => Promise<T>,
  failureRate: number = 0.1,
): Promise<T> => {
  await randomDelay();
  
  if (Math.random() < failureRate) {
    throw new Error('🚨 FAKE ERROR: Random failure simulation (10% chance)');
  }
  
  return fn();
};

export default delay;
