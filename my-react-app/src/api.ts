// Valódi API - Az Express Backend-hez csatlakozik (3000-es port)

const API_BASE_URL = 'http://localhost:3000';

export type Ajandek = {
  id?: number;
  nev: string;
  leiras?: string;
  ar?: number;
  kategoria: string;
  stilus_id?: number;
  image_url?: string;
  link_url?: string;
};

export type User = {
  id?: number;
  name: string;
  email: string;
  password?: string;
};

// Valódi API - Adatbázisból lekéri az adatokat
export const api = {
  // Alkalmak - Az adatbázisból lekéri az összes alkalmakat
  getAlkalmak: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/alkalmak`);
      if (!response.ok) {
        throw new Error('Hiba az alkalmak lekérésekor');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba az alkalmak lekérésekor:', error);
      throw error;
    }
  },

  // Stílusok - Az adatbázisból lekéri az összes stílusokat
  getStilusok: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/stilusok`);
      if (!response.ok) {
        throw new Error('Hiba a stílusok lekérésekor');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba a stílusok lekérésekor:', error);
      throw error;
    }
  },

  // Célcsoportok - Az adatbázisból lekéri az összes célcsoportokat
  getCelcsoportok: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/celcsoportok`);
      if (!response.ok) {
        throw new Error('Hiba a célcsoportok lekérésekor');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba a célcsoportok lekérésekor:', error);
      throw error;
    }
  },

  // Ajándékok - Az adatbázisból lekéri az összes ajándékot
  getAjandekok: async (): Promise<Ajandek[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ajandekok`);
      if (!response.ok) {
        throw new Error('Hiba az ajándékok lekérésekor');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba az ajándékok lekérésekor:', error);
      throw error;
    }
  },

  // Ajándékok lekérése alkalom alapján - Az adatbázisból lekéri a szűrt ajándékokat
  getAjandekokByAlkalom: async (alkalom: string): Promise<Ajandek[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ajandekok/alkalom/${encodeURIComponent(alkalom)}`);
      if (!response.ok) {
        throw new Error(`Hiba az ajándékok lekérésekor: ${alkalom} alkalomra`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba az ajándékok lekérésekor alkalom szerint:', error);
      throw error;
    }
  },

  // Ajándékok lekérése stílus alapján - Az adatbázisból lekéri a szűrt ajándékokat
  getAjandekokByStilus: async (stilus: string): Promise<Ajandek[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ajandekok/stilus/${encodeURIComponent(stilus)}`);
    if (!response.ok) {
      throw new Error(`Hiba az ajándékok lekérésekor: ${stilus} stílus alapján`);
    }
    return await response.json();
  } catch (error) {
    console.error('Hiba az ajándékok lekérésekor stílus szerint:', error);
    throw error;
  }
},
  // Ajándékok lekérése célcsoport alapján - Az adatbázisból lekéri a szűrt ajándékokat
  getAjandekokByCelcsoport: async (celcsoport: string): Promise<Ajandek[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ajandekok/celcsoport/${encodeURIComponent(celcsoport)}`);
      if (!response.ok) {
        throw new Error(`Hiba az ajándékok lekérésekor: ${celcsoport} célcsoportra`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba az ajándékok lekérésekor célcsoport szerint:', error);
      throw error;
    }
  },

  // Felhasználók - Bejelentkezés az adatbázis alapján
  login: async (username: string, password: string): Promise<{ username: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Hibás felhasználónév vagy jelszó!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba a bejelentkezéskor:', error);
      throw error;
    }
  },

  // Felhasználók - Kijelentkezés
  logout: async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Kijelentkezés sikertelen!');
      }
    } catch (error) {
      console.error('Hiba a kijelentkezéskor:', error);
      throw error;
    }
  },

  // Session ellenőrzés
  checkSession: async (): Promise<{ username: string } | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/check/session`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.status === 401) {
        return null;
      }
      if (!response.ok) {
        throw new Error('Session ellenőrzés sikertelen!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Hiba a session ellenőrzéskor:', error);
      return null;
    }
  },

  // Felhasználók - Regisztráció az adatbázisba

  register: async (name: string, email: string, password: string): Promise<User> => {

    try {

      const response = await fetch(`${API_BASE_URL}/users`, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        credentials: 'include',

        body: JSON.stringify({ name, email, password }),

      });

      if (!response.ok) {

        const errorData = await response.json().catch(() => ({}));

        throw new Error(errorData.message || errorData.error || 'Regisztráció sikertelen!');

      }

      const data = await response.json();

      return data;

    } catch (error) {

      console.error('Hiba a regiztrációkor:', error);

      throw error;

    }

  },
};