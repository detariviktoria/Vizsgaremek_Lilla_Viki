import { useState, useEffect } from 'react';
import { api } from '../api';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 perc

export const useAuth = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUsername = sessionStorage.getItem('username');
        const sessionStart = sessionStorage.getItem('sessionStart');

        // Ha nincs username vagy sessionStart, kijelentkezve
        if (!storedUsername || !sessionStart) {
          console.log('❌ Nincs sessionStorage-ben username vagy sessionStart - kijelentkezve');
          await api.logout();
          setUsername(null);
          setIsChecking(false);
          return;
        }

        // Ellenőrizd, hogy lejárt-e a session
        const now = Date.now();
        const start = parseInt(sessionStart, 10);
        if (now - start > SESSION_TIMEOUT) {
          console.log('⏰ Session lejárt - kijelentkezés');
          await api.logout();
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('sessionStart');
          setUsername(null);
          setIsChecking(false);
          return;
        }

        // Ha van username és a session nem járt le, ellenőrizd a szerver oldali session-t
        console.log('🔍 Session ellenőrzés...');
        const session = await api.checkSession();
        console.log('✅ Session válasz:', session);

        if (session && session.username) {
          if (session.username === storedUsername) {
            console.log('👤 Bejelentkezve mint:', session.username);
            setUsername(session.username);
          } else {
            console.log('⚠️ Session nem egyezik, kijelentkezés...');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('sessionStart');
            setUsername(null);
          }
        } else {
          console.log('❌ Nincs aktív szerver oldali session');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('sessionStart');
          setUsername(null);
        }
      } catch (error) {
        console.error('🚨 Hiba a session ellenőrzéskor:', error);
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('sessionStart');
        setUsername(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  const login = (user: string) => {
    console.log('📝 Login:', user);
    sessionStorage.setItem('username', user);
    sessionStorage.setItem('sessionStart', Date.now().toString());
    setUsername(user);
  };

  const logout = async () => {
    console.log('🚪 Logout...');
    try {
      await api.logout();
    } catch (error) {
      console.error('Hiba a kijelentkezéskor:', error);
    }
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('sessionStart');
    setUsername(null);
  };

  return { username, login, logout, isChecking };
};