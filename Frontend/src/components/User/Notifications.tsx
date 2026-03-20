import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import '../Social/Chat.css'; // Újrahasználjuk a chat stílusait

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  createdAt: string;
}

interface NotificationsProps {
  userId: number;
  onRead?: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ userId, onRead }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const data = await api.getNotifications(userId);
      setNotifications(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const timer = setTimeout(async () => {
      if (userId) {
        await api.markAllNotificationsAsRead(userId);
        if (onRead) onRead();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [userId]);

  if (loading) return <div style={{padding: '20px', textAlign: 'center'}}>Betöltés...</div>;

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {notifications.length === 0 ? (
          <div key="no-notifs" style={{textAlign: 'center', padding: '20px', color: '#888'}}>Nincsenek értesítéseid.</div>
        ) : (
          notifications.map((notif, index) => (
            <div 
              key={notif.id || `notif-${index}`} 
              className="chat-message-other" 
              style={{
                alignSelf: 'stretch', 
                backgroundColor: notif.is_read ? '#f9f9f9' : '#fff0fa',
                borderLeft: notif.is_read ? '3px solid #ddd' : '3px solid palevioletred',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{fontWeight: 'bold', fontSize: '10px', marginBottom: '5px', color: '#888'}}>
                {new Date(notif.createdAt).toLocaleString('hu-HU')}
              </div>
              {notif.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
