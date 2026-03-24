import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return {
      username: null,
      userId: null,
      isAdmin: false,
      isChecking: true,
      remainingTime: '',
      login: () => {},
      logout: async () => {}
    };
  }
  return context;
};
