import React from "react";
import { useSession } from "../../hooks/reactQuery.hooks";

interface IProtectedProps {
  children: React.ReactNode;
}

function Protected({ children }: IProtectedProps) {
  const [session, status] = useSession({ required: true });
  //   console.log("session", session);
  //   console.log(status);
  if (!session) {
    return <div>Loading...</div>;
  }
  return <>{children};</>;
}

export default Protected;
