import { useState, useCallback } from 'react';

export default () => {
  const [counter, setCounter] = useState<number>(0);

  const increment = useCallback(() => {
    setCounter((c) => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCounter((c) => c - 1);
  }, []);

  return {
    counter,
    increment,
    decrement,
  };
};
