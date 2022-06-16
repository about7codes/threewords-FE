import React, { createContext, useReducer } from "react";
import appReducer, { initialState } from "./reducers/app.reducer";

export const AppContext = createContext({});

interface IAppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IAppProviderProps) => {
  const useAppState = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={[...useAppState]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
