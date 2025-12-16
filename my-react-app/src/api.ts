// Valódi API - Az Express Backend-hez csatlakozik (3000-es port)



export const API_BASE_URL = 'http://localhost:3000';



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



export type LoginResponse = {

  username: string;

  userId: number;

};



export const api = {
 
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

  login: async (username: string, password: string): Promise<LoginResponse> => {

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



  checkSession: async (): Promise<LoginResponse | null> => {

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



  // Kedvencek API hívások

  getKedvencek: async (userId: number): Promise<Ajandek[]> => {

    try {

      const response = await fetch(`${API_BASE_URL}/kedvencek/${userId}`);

      if (!response.ok) {

        throw new Error('Hiba a kedvencek lekérésekor');

      }

      return await response.json();

    } catch (error) {

      console.error('Hiba a kedvencek lekérésekor:', error);

      throw error;

    }

  },



  addKedvenc: async (userId: number, ajandekId: number): Promise<void> => {

    try {

      const response = await fetch(`${API_BASE_URL}/kedvencek/${userId}`, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify({ ajandek_id: ajandekId }),

      });

      if (!response.ok) {

        throw new Error('Hiba a kedvenc hozzáadásakor');

      }

    } catch (error) {

      console.error('Hiba a kedvenc hozzáadásakor:', error);

      throw error;

    }

  },



  removeKedvenc: async (userId: number, ajandekId: number): Promise<void> => {

    try {

      const response = await fetch(`${API_BASE_URL}/kedvencek/${userId}/${ajandekId}`, {

        method: 'DELETE',

      });

      if (!response.ok) {

        throw new Error('Hiba a kedvenc törlésekor');

      }

    } catch (error) {

      console.error('Hiba a kedvenc törlésekor:', error);

      throw error;

    }

  },



  // Előzmények API hívások

  getElozmenyek: async (userId: number): Promise<Ajandek[]> => {

    try {

      const response = await fetch(`${API_BASE_URL}/elozmenyek/${userId}`);

      if (!response.ok) {

        throw new Error('Hiba az előzmények lekérésekor');

      }

      return await response.json();

    } catch (error) {

      console.error('Hiba az előzmények lekérésekor:', error);

      throw error;

    }

  },



  addElozmeny: async (userId: number, ajandekId: number): Promise<void> => {

    try {

      const response = await fetch(`${API_BASE_URL}/elozmenyek/${userId}`, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify({ ajandek_id: ajandekId }),

      });

      if (!response.ok) {

        throw new Error('Hiba az előzmény hozzáadásakor');

      }

    } catch (error) {

      console.error('Hiba az előzmény hozzáadásakor:', error);

      throw error;

    }

  },


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