import React, { useEffect, useState } from "react";
import type { User } from "../api";
import "./UserSelect.css";

type UserSelectProps = {
  onSelect: (user: User) => void;
  selectedUserId?: number;
};

const UserSelect: React.FC<UserSelectProps> = ({ onSelect, selectedUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) throw new Error("Hiba a felhasználók lekérésekor");
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const currentUserId = Number(sessionStorage.getItem('userId'));
  const filteredUsers = users.filter(u => u.user_id !== currentUserId);

  if (loading) return <div>Felhasználók betöltése...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div className="user-select">
      <label>Válassz felhasználót a chathez:</label>
      <select
        value={selectedUserId || ""}
        onChange={e => {
          const user = filteredUsers.find(u => u.user_id === Number(e.target.value));
          if (user) onSelect(user);
        }}
      >
        <option value="">-- Válassz --</option>
        {filteredUsers.map(user => (
          <option key={user.user_id} value={user.user_id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
