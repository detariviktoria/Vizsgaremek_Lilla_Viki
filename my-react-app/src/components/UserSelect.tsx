import React, { useEffect, useState } from "react";
import type { User } from "../api";
import "./UserSelect.css";

type UserSelectProps = {
  onSelect: (user: User) => void;
  selectedUserId?: number;
  highlightUserId?: number;
};

const UserSelect: React.FC<UserSelectProps> = ({ onSelect, selectedUserId, highlightUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // <-- IDE KERÜL!

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

  // Rendezés: ha van kiemelt felhasználó (pl. aki küldött nekünk új üzenetet), tegyük az elejére
  const orderedUsers = [...filteredUsers].sort((a, b) => {
    if (highlightUserId && a.user_id === highlightUserId) return -1;
    if (highlightUserId && b.user_id === highlightUserId) return 1;
    return a.name.localeCompare(b.name);
  });

  if (loading) return <div>Felhasználók betöltése...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  // Saját custom dropdown
  const selected = orderedUsers.find(u => u.user_id === selectedUserId);

  return (
    <div className="user-select">
      <label>Válassz felhasználót a chathez:</label>
      <div className="custom-dropdown" tabIndex={0} onBlur={() => setOpen(false)}>
        <div
          className="custom-dropdown-selected"
          onClick={() => setOpen(o => !o)}
        >
          {selected ? (highlightUserId === selected.user_id ? `${selected.name} (ÚJ)` : selected.name) : "-- Válassz --"}
        </div>
        {open && (
          <ul className="custom-dropdown-list">
            <li
              className={!selectedUserId ? "custom-dropdown-option selected" : "custom-dropdown-option"}
              onClick={() => { onSelect(undefined as any); setOpen(false); }}
            >
              -- Válassz --
            </li>
            {orderedUsers.map(user => (
              <li
                key={user.user_id}
                className={
                  "custom-dropdown-option" +
                  (highlightUserId === user.user_id ? " highlighted-user-option" : "") +
                  (selectedUserId === user.user_id ? " selected" : "")
                }
                onClick={() => { onSelect(user); setOpen(false); }}
              >
                {highlightUserId === user.user_id ? `${user.name} (ÚJ)` : user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserSelect;
