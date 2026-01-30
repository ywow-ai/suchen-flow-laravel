type ValidKeys<T> = {
  [K in keyof T]: T[K] extends string | number | boolean ? K : never;
}[keyof T];
type ValidTypeMapKeys = ValidKeys<{
  string: string;
  boolean: boolean;
  number: number;
}>;

function load(key: string): string;
function load(key: string, defaultValue: string): string;
function load(key: string, defaultValue: number): number;
function load(key: string, defaultValue: boolean): boolean;
function load<T extends string | number | boolean>(
  key: string,
  defaultValue?: T,
): string | T {
  const value = import.meta.env[key];

  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is required`);
    } else {
      return defaultValue;
    }
  }

  const fn: Record<ValidTypeMapKeys, () => string | number | boolean> = {
    string: () => String(value),
    boolean: () => String(value) === 'true',
    number: () => Number(value),
  };

  const callback =
    fn[typeof defaultValue as ValidTypeMapKeys] ?? (() => String(value));

  return callback() as T;
}

export const env = {
  viteAppName: load('VITE_APP_NAME', 'Laravel'),
} as const;
