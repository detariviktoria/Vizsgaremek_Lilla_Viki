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
  user_id?: number;
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
      if (!response.ok) throw new Error('Hiba az alkalmak lekérésekor');
      return await response.json();
    } catch (error) {
      console.error('Hiba az alkalmak lekérésekor:', error);
      throw error;
    }
  },

  getStilusok: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/stilusok`);
      if (!response.ok) throw new Error('Hiba a stílusok lekérésekor');
      return await response.json();
    } catch (error) {
      console.error('Hiba a stílusok lekérésekor:', error);
      throw error;
    }
  },

  getCelcsoportok: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/celcsoportok`);
      if (!response.ok) throw new Error('Hiba a célcsoportok lekérésekor');
      return await response.json();
    } catch (error) {
      console.error('Hiba a célcsoportok lekérésekor:', error);
      throw error;
    }
  },

  getAjandekok: async (): Promise<Ajandek[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ajandekok`);
      if (!response.ok) throw new Error('Hiba az ajándékok lekérésekor');
      return await response.json();
    } catch (error) {
      console.error('Hiba az ajándékok lekérésekor:', error);
      throw error;
    }
  },

  getAjandekokByAlkalom: async (alkalom: string): Promise<Ajandek[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ajandekok/alkalom/${encodeURIComponent(alkalom)}`);
      if (!response.ok) throw new Error(`Hiba az ajándékok lekérésekor: ${alkalom} alkalomra`);
      return await response.json();
    } catch (error) {
      console.error('Hiba az ajándékok lekérésekor alkalom szerint:', error);
      throw error;
    }
  },

  getAjandekokByStilus: async (stilus: string): Promise<Ajandek[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ajandekok/stilus/${encodeURIComponent(stilus)}`);
      if (!response.ok) throw new Error(`Hiba az ajándékok lekérésekor: ${stilus} stílus alapján`);
      return await response.json();
    } catch (error) {
      console.error('Hiba az ajándékok lekérésekor stílus szerint:', error);
      throw error;
    }
  },

  getAjandekokByCelcsoport: async (celcsoport: string): Promise<Ajandek[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ajandekok/celcsoport/${encodeURIComponent(celcsoport)}`);
      if (!response.ok) throw new Error(`Hiba az ajándékok lekérésekor: ${celcsoport} célcsoportra`);
      return await response.json();
    } catch (error) {
      console.error('Hiba az ajándékok lekérésekor célcsoport szerint:', error);
      throw error;
    }
  },

  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('Hibás felhasználónév vagy jelszó!');
      return await response.json();
    } catch (error) {
      console.error('Hiba a bejelentkezéskor:', error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Kijelentkezés sikertelen!');
    } catch (error) {
      console.error('Hiba a kijelentkezéskor:', error);
      throw error;
    }
  },

  checkSession: async (): Promise<LoginResponse | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/check/session`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.status === 401) return null;
      if (!response.ok) throw new Error('Session ellenőrzés sikertelen!');
      return await response.json();
    } catch (error) {
      console.error('Hiba a session ellenőrzéskor:', error);
      return null;
    }
  },

  getKedvencek: async (userId: number): Promise<Ajandek[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/kedvencek/${userId}`);
      if (!response.ok) throw new Error('Hiba a kedvencek lekérésekor');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ajandek_id: ajandekId }),
      });
      if (!response.ok) throw new Error('Hiba a kedvenc hozzáadásakor');
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
      if (!response.ok) throw new Error('Hiba a kedvenc törlésekor');
    } catch (error) {
      console.error('Hiba a kedvenc törlésekor:', error);
      throw error;
    }
  },

  getUser: async (userId: number): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Hiba a felhasználó lekérésekor');
      return await response.json();
    } catch (error) {
      console.error('Hiba a felhasználó lekérésekor:', error);
      throw error;
    }
  },

  updateUser: async (userId: number, userData: Partial<User> & { oldPassword?: string }): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Hiba a felhasználó frissítésekor');
      }
    } catch (error) {
      console.error('Hiba a felhasználó frissítésekor:', error);
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      console.log('forgotPassword response.status:', response.status); // DEBUG
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Hiba a jelszó visszaállítás kérésekor');
      }
    } catch (error) {
      console.error('Hiba az elfelejtett jelszó kérésekor:', error);
      throw error;
    }
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Hiba a jelszó visszaállításakor');
      }
    } catch (error) {
      console.error('Hiba a jelszó visszaállításakor:', error);
      throw error;
    }
  },

  getElozmenyek: async (userId: number): Promise<Ajandek[]> => {

    try {
      const response = await fetch(`${API_BASE_URL}/elozmenyek/${userId}`);
      if (!response.ok) throw new Error('Hiba az előzmények lekérésekor');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ajandek_id: ajandekId }),
      });
      if (!response.ok) throw new Error('Hiba az előzmény hozzáadásakor');
    } catch (error) {
      console.error('Hiba az előzmény hozzáadásakor:', error);
      throw error;
    }
  },

  sendInvite: async (email: string, userId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, userId }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Meghívó küldése sikertelen!');
      }
    } catch (error) {
      console.error('Hiba a meghívó küldésekor:', error);
      throw error;
    }
  },

  register: async (name: string, email: string, password: string, ajanlo_id?: string): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, ajanlo_id }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || 'Regisztráció sikertelen!');
      }
      return await response.json();
    } catch (error) {
      console.error('Hiba a regisztrációkor:', error);
      throw error;
    }
  },

  getInvitedFriends: async (userId: number): Promise<Array<{ email: string; name: string; status: string; accepted: boolean }>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/invite/friends/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Hiba a barátok lekérésekor');
      return await response.json();
    } catch (error) {
      console.error('Hiba a barátok lekérésekor:', error);
      throw error;
    }
  },

  // Chat privát üzenetek és előzmények
  getChatHistory: async (user1: number, user2: number) => {
    const response = await fetch(`${API_BASE_URL}/api/chat/history/${user1}/${user2}`);
    if (!response.ok) throw new Error('Hiba az üzenet előzmények lekérésekor');
    return await response.json();
  },
  sendChatMessage: async (from: number, to: number, message: string) => {
    const response = await fetch(`${API_BASE_URL}/api/chat/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from_user_id: from, to_user_id: to, message })
    });
    if (!response.ok) throw new Error('Hiba az üzenet küldésekor');
    return await response.json();
  },
};