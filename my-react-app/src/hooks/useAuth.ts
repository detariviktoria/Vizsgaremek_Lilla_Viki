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

        const storedUsername = sessionStorage.getItem('username');

        const storedUserId = sessionStorage.getItem('userId');

        const storedIsAdmin = sessionStorage.getItem('isAdmin') === 'true';

        const sessionStart = sessionStorage.getItem('sessionStart');



        // Ha nincs username vagy sessionStart, kijelentkezve

        if (!storedUsername || !sessionStart) {

          console.log('❌ Nincs sessionStorage-ben username vagy sessionStart - kijelentkezve');

          await api.logout();

          sessionStorage.removeItem('token');

          setUsername(null);

          setUserId(null);

          setIsAdmin(false);

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

          sessionStorage.removeItem('userId');

          sessionStorage.removeItem('isAdmin');

          sessionStorage.removeItem('token');

          sessionStorage.removeItem('sessionStart');

          setUsername(null);

          setUserId(null);

          setIsAdmin(false);

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

            setUserId(session.userId);

            setIsAdmin(session.isAdmin);

            // Ha esetleg hiányzott a storage-ból, pótoljuk

            if (!storedUserId && session.userId) sessionStorage.setItem('userId', session.userId.toString());
            if (session.isAdmin !== undefined) sessionStorage.setItem('isAdmin', session.isAdmin.toString());

          } else {

            console.log('⚠️ Session nem egyezik, kijelentkezés...');

            sessionStorage.removeItem('username');

            sessionStorage.removeItem('userId');

            sessionStorage.removeItem('isAdmin');

            sessionStorage.removeItem('token');

            sessionStorage.removeItem('sessionStart');

            setUsername(null);

            setUserId(null);

            setIsAdmin(false);

          }

        } else {

          console.log('❌ Nincs aktív szerver oldali session');

          sessionStorage.removeItem('username');

          sessionStorage.removeItem('userId');

          sessionStorage.removeItem('isAdmin');

          sessionStorage.removeItem('token');

          sessionStorage.removeItem('sessionStart');

          setUsername(null);

          setUserId(null);

          setIsAdmin(false);

        }

      } catch (error) {

        console.error('🚨 Hiba a session ellenőrzéskor:', error);
        // Hálózati hiba esetén ne jelentkeztessük ki azonnal, hátha csak átmeneti
        setIsChecking(false);

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



  const login = (user: string, id: number, admin: boolean, token?: string) => {

    console.log('📝 Login:', user, id, admin);

    sessionStorage.setItem('username', user);

    if (id !== undefined && id !== null) sessionStorage.setItem('userId', id.toString());

    if (admin !== undefined && admin !== null) sessionStorage.setItem('isAdmin', admin.toString());

    if (token) sessionStorage.setItem('token', token);

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

    sessionStorage.removeItem('token');

    sessionStorage.removeItem('sessionStart');

    setUsername(null);

    setUserId(null);

    setIsAdmin(false);

  };



  return { username, userId, isAdmin, login, logout, isChecking, remainingTime };

};