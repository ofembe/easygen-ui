import React, { useEffect } from "react";
import SigninForm from "../components/SigninForm";
import AuthError from "../components/AuthError";

import { useAuth } from "../context/AuthContext";

const Signin: React.FC = () => {
  const { signin, loading, clearErrors } = useAuth();

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  return (
    <div className="flex justify-center h-screen">
      <div className="max-w-md">
        <AuthError />
        <div className="divider divider-primary">Signin</div>
        <SigninForm
          onSubmit={(data) => {
            signin(data.email, data.password);
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Signin;
