"use client"
import React, { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  return (
    <CompanyContext.Provider value={{ selectedSymbol, setSelectedSymbol }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
