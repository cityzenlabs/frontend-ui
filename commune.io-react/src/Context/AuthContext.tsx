import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (userToken: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const saveToken = (userToken: string | null) => {
    if (userToken) {
      localStorage.setItem("token", userToken);
      setToken(userToken);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Effect to run once on mount and initialize the state if there's a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
