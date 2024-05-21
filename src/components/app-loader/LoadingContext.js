import React, { createContext, useContext, useState } from 'react';
import Loading from './Loading'

// Create a context for managing the loading state
const LoadingContext = createContext();

// Custom hook to use loading context
export const useLoading = () => useContext(LoadingContext);

// Loading provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loading />} {/* Display loading component when loading is true */}
    </LoadingContext.Provider>
  );
};
