import { useContext, createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth-service";

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
