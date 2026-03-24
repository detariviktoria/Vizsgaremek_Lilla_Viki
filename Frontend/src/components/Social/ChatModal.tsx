import React, { useState, useEffect } from 'react';
import { api, type User } from '../../api';
import Chat from './Chat';
import Notifications from '../User/Notifications';
import UserSelect from './UserSelect';
import './ChatModal.css';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  username: string;
  hasUnread: boolean;
  hasUnreadNotif: boolean;
  checkUnread: () => void;
  highlightUserIds: number[];
}

export default function ChatModal({
  isOpen,
  onClose,
  userId,
  username,
  hasUnread,
  hasUnreadNotif,
  checkUnread,
  highlightUserIds
}: ChatModalProps) {
  const [activeTab, setActiveTab] = useState<'messages' | 'notifications'>('messages');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      api.getUser(userId).then(setCurrentUserData).catch(console.error);
    }
  }, [userId]);

  // Keyboard navigation: Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="chat-modal-bg" onClick={onClose}>
      <div className="chat-modal fixed-modal-size" onClick={e => e.stopPropagation()}>
        <div className="chat-modal-header">
          <div className="chat-tabs">
            <button 
              className={`chat-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              Üzenetek
              {hasUnread && <span className="tab-unread-dot" />}
            </button>
            <button 
              className={`chat-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Értesítések
              {hasUnreadNotif && <span className="tab-unread-dot" />}
            </button>
          </div>
          <button className="chat-modal-close" onClick={onClose}>✖</button>
        </div>

        {activeTab === 'messages' ? (
          <div style={{display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
            {!selectedUser ? (
              <div style={{padding: '0 20px', flex: 1, overflowY: 'auto'}}>
                <h3 style={{margin: '10px 0', fontSize: '16px', color: '#666'}}>Kivel szeretnél chatelni?</h3>
                <UserSelect onSelect={setSelectedUser} selectedUserId={selectedUser?.user_id} highlightUserIds={highlightUserIds} />
              </div>
            ) : (
              <>
                <div style={{padding: '10px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px'}}>
                  <button 
                    onClick={() => setSelectedUser(null)} 
                    style={{background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'palevioletred', padding: '0 5px'}}
                    title="Vissza a listához"
                  >
                    ⬅
                  </button>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div className="user-grid-avatar" style={{width: '35px', height: '35px', fontSize: '16px'}}>
                      <img 
                        src={`/Képek/${selectedUser.kep_url || selectedUser.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ".jpg"}`} 
                        alt={selectedUser.name} 
                        style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/Képek/logo.webp';
                        }}
                      />
                    </div>
                    <span style={{fontWeight: 'bold', fontSize: '16px'}}>{selectedUser.name}</span>
                  </div>
                </div>
                <div className="modal-body-content">
                  <Chat 
                    key={selectedUser.user_id} 
                    currentUser={currentUserData || {user_id: userId, name: username || '', email: '', password: ''}} 
                    selectedUser={selectedUser}
                    onMessagesRead={checkUnread}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="modal-body-content">
            <Notifications userId={userId} onRead={checkUnread} />
          </div>
        )}
      </div>
    </div>
  );
}
