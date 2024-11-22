export type ApiError = {
  message: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  signin: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  signout: () => void;
  clearErrors: () => void;
  error?: ApiError;
  user?: User | null;
};
