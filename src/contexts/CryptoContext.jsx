import { createContext, useContext, useEffect, useState } from "react";

export const CryptoContext = createContext();

export const CryptoContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency == "USD") {
      setSymbol("$");
    } else if (currency == "INR") {
      setSymbol("₹");
    }
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => useContext(CryptoContext);
