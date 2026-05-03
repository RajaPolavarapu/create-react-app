import { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

const AuthContext = createContext({ user: null as User | null, login: async () => {}, logout: async () => {} });
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <AuthContext.Provider value={{ user, login: () => signInWithPopup(auth, googleProvider), logout: () => signOut(auth) }}>
      {children}
    </AuthContext.Provider>
  );
};
