import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number): T | null => {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
