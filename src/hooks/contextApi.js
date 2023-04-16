import { createContext, useEffect, useState } from "react";

export const CardContext = createContext();
export const CardContextWrapper = ({ children }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("items")) {
      const total = JSON.parse(localStorage.getItem("items")).length;
      setCount(total);
    }
  }, []);

  return (
    <CardContext.Provider value={{ count, setCount }}>
      {children}
    </CardContext.Provider>
  );
};
