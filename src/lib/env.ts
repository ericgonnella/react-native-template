/**
 * Environment configuration with safe defaults
 */

interface EnvConfig {
  apiUrl: string;
  appEnv: 'development' | 'production' | 'test';
  featureFlags: {
    darkMode: boolean;
    animations: boolean;
  };
}

const getEnvVar = (key: string, defaultValue: string): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return defaultValue;
};

const parseFeatureFlags = (flagsStr: string) => {
  try {
    return JSON.parse(flagsStr);
  } catch {
    return {darkMode: true, animations: true};
  }
};

export const env: EnvConfig = {
  apiUrl: getEnvVar('API_URL', 'https://api.example.com'),
  appEnv: (getEnvVar('APP_ENV', 'development') as EnvConfig['appEnv']),
  featureFlags: parseFeatureFlags(
    getEnvVar('FEATURE_FLAGS', '{"darkMode":true,"animations":true}'),
  ),
};

export default env;
