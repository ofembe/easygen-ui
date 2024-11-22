import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../types";

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        credentials: "include",
      });
      const res = await response.json();
      if (!response.ok) {
        return;
      }
      setUser(res);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err: any) {
      // Log this error with Sentry or any other logging solution
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      processAuthResponse(response);
    } catch (err) {
      // Log this error with Sentry or any other logging solution
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      await fetch(`${API_URL}/signout`, {
        method: "GET",
        credentials: "include",
      });
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      // Log this error with Sentry or any other logging solution
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      processAuthResponse(response);
    } catch (err) {
      // Log this error with Sentry or any other logging solution
    } finally {
      setLoading(false);
    }
  };

  const processAuthResponse = async (response: Response) => {
    const res = await response.json();

    if (!response.ok) {
      // Log this error with Sentry or any other logging solution
      setError(res);
      return;
    }

    setUser(res);
    setIsAuthenticated(true);
    setError(undefined);
    navigate("/");
  };

  const clearErrors = () => {
    setError(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        signout,
        clearErrors,
        isAuthenticated,
        loading,
        error,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
