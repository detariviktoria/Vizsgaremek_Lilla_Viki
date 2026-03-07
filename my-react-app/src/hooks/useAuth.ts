import { useState, useEffect } from 'react';
import { api } from '../api';

const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 perc inaktivitás után



export const useAuth = () => {

  const [username, setUsername] = useState<string | null>(null);

  const [userId, setUserId] = useState<number | null>(null);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [isChecking, setIsChecking] = useState(true);

  const [remainingTime, setRemainingTime] = useState<string>('');



  useEffect(() => {

    const checkAuth = async () => {

      try {

        // Tab-specifikus tárolás: sessionStorage használata, hogy több fülön több user lehessen
        const storedUsername = sessionStorage.getItem('username');
        const storedUserId = sessionStorage.getItem('userId');
        const storedIsAdmin = sessionStorage.getItem('isAdmin') === 'true';
        const sessionStart = sessionStorage.getItem('sessionStart');

        // Ha nincs username vagy sessionStart, kijelentkezve
        if (!storedUsername || !sessionStart) {
          setUsername(null);
          setUserId(null);
          setIsAdmin(false);
          setIsChecking(false);
          return;
        }

        // Ellenőrizd, hogy lejárt-e a session (kliens oldali timeout)
        const now = Date.now();
        const start = parseInt(sessionStart, 10);
        if (now - start > SESSION_TIMEOUT) {
          console.log('⏰ Session lejárt - kijelentkezés');
          await logout();
          return;
        }

        // Szerver oldali ellenőrzés
        const session = await api.checkSession();

        if (session && session.username) {
          // Itt a kulcs: a szerver session-jét fogadjuk el igaznak!
          setUsername(session.username);
          setUserId(session.userId);
          setIsAdmin(session.isAdmin);
          
          // Frissítjük a storage-ot a szerver válasza alapján
          sessionStorage.setItem('username', session.username);
          sessionStorage.setItem('userId', session.userId.toString());
          sessionStorage.setItem('isAdmin', session.isAdmin.toString());
        } else {
          // Ha a szerver szerint nincs session, akkor mi is kiléptetünk
          setUsername(null);
          setUserId(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('🚨 Hiba a session ellenőrzéskor:', error);
      } finally {
        setIsChecking(false);
      }
    };



    checkAuth();



    // Aktivitás figyelő: ha a felhasználó kattint vagy gombot nyom, frissítjük a sessionStart-ot

    const resetTimer = () => {

      if (sessionStorage.getItem('username')) {

        sessionStorage.setItem('sessionStart', Date.now().toString());

      }

    };



    window.addEventListener('click', resetTimer);

    window.addEventListener('keypress', resetTimer);



    // Időzítő a hátralévő idő kijelzéséhez és a kijelentkeztetéshez

    const timerInterval = setInterval(() => {

      const storedUsername = sessionStorage.getItem('username');

      const sessionStart = sessionStorage.getItem('sessionStart');



      if (storedUsername && sessionStart) {

        const now = Date.now();

        const start = parseInt(sessionStart, 10);

        const elapsed = now - start;

        const remaining = SESSION_TIMEOUT - elapsed;



        if (remaining <= 0) {

          logout(); // Kijelentkeztetés, ha lejárt

        } else {

          // Idő formázása mm:ss formátumra

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



  const login = (user: string, id: number, admin: boolean) => {

    console.log('📝 Login:', user, id, admin);

    sessionStorage.setItem('username', user);

    if (id !== undefined && id !== null) sessionStorage.setItem('userId', id.toString());

    if (admin !== undefined && admin !== null) sessionStorage.setItem('isAdmin', admin.toString());

    sessionStorage.setItem('sessionStart', Date.now().toString());

    setUsername(user);

    setUserId(id);

    setIsAdmin(!!admin);

  };



  const logout = async () => {

    console.log('🚪 Logout...');

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



  return { username, userId, isAdmin, login, logout, isChecking, remainingTime };

};