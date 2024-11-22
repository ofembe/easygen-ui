import React from "react";
import { useAuth } from "../context/AuthContext";

const Welcome: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-center h-screen">
      <div>Welcome to the application. {user?.name}</div>
    </div>
  );
};

export default Welcome;
