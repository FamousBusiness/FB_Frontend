'use client';

import { createContext, useContext, useState } from "react";

const SchemaContext = createContext();

export function SchemaProvider({ children }) {
  const [schema, setSchema] = useState(null);

  return (
    <SchemaContext.Provider value={{ schema, setSchema }}>
      {children}
    </SchemaContext.Provider>
  );
}


export function useSchema() {
  const context = useContext(SchemaContext);

  if (!context) {
    throw new Error("useSchema must be used within a SchemaProvider");
  }
  
  return context;
}
