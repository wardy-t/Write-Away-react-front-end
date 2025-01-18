import { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

export const AuthedUserContext = createContext({ user: null, signOut: () => {} });

const AuthedUserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const signOut = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={{ user, signOut }}>
      {children}
    </AuthedUserContext.Provider>
  );
};

export default AuthedUserContextProvider; 
