import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue = null) {
  const getInitial = () => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        try {
          return JSON.parse(raw);
        } catch {
          return raw;
        }
      }
    } catch {}
    return initialValue;
  };

  const [state, setState] = useState(getInitial);

  useEffect(() => {
    try {
      if (typeof state === "string") {
        window.localStorage.setItem(key, state);
      } else {
        window.localStorage.setItem(key, JSON.stringify(state));
      }
    } catch {}
  }, [key, state]);

  return [state, setState];
}
