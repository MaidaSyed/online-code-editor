import { useState, useEffect } from "react";

const PREFIX = "online-codeEditor-";

const useLocalStorage = (key, initialVal) => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialVal === "function") {
      return initialVal();
    } else {
      return initialVal;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]); // ✅ Correct dependency array

  return [value, setValue];
};

export default useLocalStorage;