import React, { useEffect, useState } from "react";
import { api, type User } from "../../api";
import "./UserSelect.css";
type UserSelectProps = {
  onSelect: (user: User) => void;
  selectedUserId?: number;
  highlightUserIds?: number[];
};
const UserSelect: React.FC<UserSelectProps> = ({ onSelect, selectedUserId, highlightUserIds = [] }) => {
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
      const data = await api.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const currentUserId = Number(sessionStorage.getItem('userId'));
  const filteredUsers = users.filter(u => u.user_id !== currentUserId);
  const orderedUsers = [...filteredUsers].sort((a, b) => {
    const aHighlighted = highlightUserIds.some(id => Number(id) === Number(a.user_id));
    const bHighlighted = highlightUserIds.some(id => Number(id) === Number(b.user_id));
    if (aHighlighted && !bHighlighted) return -1;
    if (!aHighlighted && bHighlighted) return 1;
    return a.name.localeCompare(b.name);
  });
  if (loading) return <div className="user-select-loading">Felhasználók betöltése...</div>;
  if (error) return <div className="user-select-error">{error}</div>;
  const isHighlighted = (userId?: number) => {
    if (!userId) return false;
    return highlightUserIds.some(id => Number(id) === Number(userId));
  };
  return (
    <div className="user-grid-container">
      <div className="user-grid">
        {orderedUsers.map(user => (
          <div 
            key={user.user_id} 
            className={`user-grid-item ${selectedUserId === user.user_id ? 'selected' : ''} ${isHighlighted(user.user_id) ? 'highlighted' : ''}`}
            onClick={() => onSelect(user)}
          >
            <div className="user-grid-avatar">
              <img 
                src={`/Képek/${user.kep_url || user.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ".jpg"}`} 
                alt={user.name} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/Képek/logo.webp';
                }}
              />
              {isHighlighted(user.user_id) && <span className="unread-badge" />}
            </div>
            <span className="user-grid-name">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserSelect;
