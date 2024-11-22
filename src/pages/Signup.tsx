import React, { useEffect } from "react";
import SignupForm from "../components/SignupForm";
import { useAuth } from "../context/AuthContext";
import AuthError from "../components/AuthError";

const Signup: React.FC = () => {
  const { signup, loading, clearErrors } = useAuth();

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  return (
    <div className="flex justify-center h-screen">
      <div className="max-w-md">
        <AuthError />
        <div className="divider divider-primary">Signup</div>
        <SignupForm
          onSubmit={(data) => {
            signup(data.name, data.email, data.password);
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Signup;
