import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function useAuthUpdate() {
  return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useLocalStorage("USER_AUTH", null);
  
  function login(auth) {
    setAuthState(auth);
  }
  function logout() {
    setAuthState(null);
  }
  return (
    <AuthContext.Provider value={authState}>
      <AuthUpdateContext.Provider value={{ login, logout }}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
