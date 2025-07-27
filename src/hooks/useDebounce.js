import { useEffect, useState } from "react";

/**
 * useDebounce hook
 * @param {any} value - the value to debounce
 * @param {number} delay - delay in ms
 * @returns {any} debouncedValue
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}