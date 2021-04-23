import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) return saved;
    if (initialState instanceof Function) return initialState();
    return initialState;
  });

  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [key, state]);

  return [state, setState];
};

export default useLocalStorage;
