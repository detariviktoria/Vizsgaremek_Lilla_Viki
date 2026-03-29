import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api';
const SESSION_TIMEOUT = 10 * 60 * 1000;
interface AuthContextType {
  username: string | null;
  userId: number | null;
  isAdmin: boolean;
  isChecking: boolean;
  remainingTime: string;
  login: (user: string, id: number, admin: boolean, token?: string) => void;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState(true);
  const [remainingTime, setRemainingTime] = useState<string>('');
  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Hiba a kijelentkezéskor:', error);
    }
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('sessionStart');
    sessionStorage.removeItem('token');
    setUsername(null);
    setUserId(null);
    setIsAdmin(false);
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUsername = sessionStorage.getItem('username');
        const storedUserId = sessionStorage.getItem('userId');
        const sessionStart = sessionStorage.getItem('sessionStart');
        if (!storedUsername || !sessionStart) {
          setUsername(null);
          setUserId(null);
          setIsAdmin(false);
          setIsChecking(false);
          return;
        }
        const now = Date.now();
        const start = parseInt(sessionStart, 10);
        if (now - start > SESSION_TIMEOUT) {
          await logout();
          return;
        }
        const session = await api.checkSession();
        if (session && session.username) {
          setUsername(session.username);
          setUserId(session.userId);
          setIsAdmin(session.isAdmin);
          sessionStorage.setItem('username', session.username);
          sessionStorage.setItem('userId', session.userId.toString());
          sessionStorage.setItem('isAdmin', session.isAdmin.toString());
        } else {
          setUsername(null);
          setUserId(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Hiba a session ellenőrzéskor:', error);
      } finally {
        setIsChecking(false);
      }
    };
    checkAuth();
    const resetTimer = () => {
      if (sessionStorage.getItem('username')) {
        sessionStorage.setItem('sessionStart', Date.now().toString());
      }
    };
    window.addEventListener('click', resetTimer);
    window.addEventListener('keypress', resetTimer);
    const timerInterval = setInterval(() => {
      const storedUsername = sessionStorage.getItem('username');
      const sessionStart = sessionStorage.getItem('sessionStart');
      if (storedUsername && sessionStart) {
        const now = Date.now();
        const start = parseInt(sessionStart, 10);
        const elapsed = now - start;
        const remaining = SESSION_TIMEOUT - elapsed;
        if (remaining <= 0) {
          logout();
        } else {
          const minutes = Math.floor(remaining / 60000);
          const seconds = Math.floor((remaining % 60000) / 1000);
          setRemainingTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      } else {
        setRemainingTime('');
      }
    }, 1000);
    return () => {
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearInterval(timerInterval);
    };
  }, []);
  const login = (user: string, id: number, admin: boolean, token?: string) => {
    sessionStorage.setItem('username', user);
    if (id !== undefined) sessionStorage.setItem('userId', id.toString());
    if (admin !== undefined) sessionStorage.setItem('isAdmin', admin.toString());
    if (token) sessionStorage.setItem('token', token);
    sessionStorage.setItem('sessionStart', Date.now().toString());
    setUsername(user);
    setUserId(id);
    setIsAdmin(!!admin);
  };
  return (
    <AuthContext.Provider value={{ username, userId, isAdmin, isChecking, remainingTime, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
