import { useContext, useEffect } from "react";
import { AppContext } from "../context/app.context";

// Hook to get the app context
export const useApp = () => {
  const [state, dispatch] = useContext<any>(AppContext);

  return [state, dispatch];
};
