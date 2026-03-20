import React, { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import { api, type User, API_BASE_URL } from "../../api";
import "./Chat.css";

interface ChatProps {
  currentUser: User;
  selectedUser: User | null;
  onMessagesRead?: () => void;
}

const Chat: React.FC<ChatProps> = ({ currentUser, selectedUser, onMessagesRead }) => {
  const [messages, setMessages] = useState<
    { from_user_id: number; to_user_id: number; message: string; created_at: string }[]
  >([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cId = currentUser?.user_id;
    const sId = selectedUser?.user_id;

    if (cId && sId) {
      api.getChatHistory(cId, sId)
        .then(setMessages)
        .catch(console.error);
      
      api.markChatAsRead(sId, cId)
        .then(() => {
          if (onMessagesRead) onMessagesRead();
        })
        .catch(console.error);
    } else {
      setMessages([]);
    }
  }, [currentUser?.user_id, selectedUser?.user_id, onMessagesRead]);

  useEffect(() => {
    console.log("Chat component mounted/updated, setting up socket handler for user", currentUser?.user_id);
    
    const handler = (msg: { from: number; to: number; message: string }) => {
      console.log("Socket message received in Chat component:", msg);
      const cId = currentUser?.user_id;
      const sId = selectedUser?.user_id;

      if (!cId || !sId) {
        console.log("Missing cId or sId in handler, skipping.");
        return;
      }

      const isRelevant = 
        (Number(msg.from) === Number(sId) && Number(msg.to) === Number(cId)) ||
        (Number(msg.from) === Number(cId) && Number(msg.to) === Number(sId));

      if (isRelevant) {
        console.log("Message is relevant, adding to state.");
        setMessages((prev) => [
          ...prev,
          {
            from_user_id: msg.from,
            to_user_id: msg.to,
            message: msg.message,
            created_at: new Date().toISOString(),
          },
        ]);

        if (Number(msg.from) === Number(sId)) {
          api.markChatAsRead(msg.from, cId)
            .then(() => {
              if (onMessagesRead) onMessagesRead();
            })
            .catch(console.error);
        }
      } else {
        console.log("Message is not relevant to current conversation.");
      }
    };
    socket.on("private message", handler);
    return () => {
      console.log("Removing socket handler in Chat component.");
      socket.off("private message", handler);
    };
  }, [currentUser?.user_id, selectedUser?.user_id, onMessagesRead]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const cId = currentUser.user_id;
    const sId = selectedUser?.user_id;

    if (input.trim() && cId && sId) {
      const trimmed = input.trim();

      socket.emit("private message", {
        from: cId,
        to: sId,
        message: trimmed,
      });

      api.sendChatMessage(cId, sId, trimmed)
        .catch(console.error);

      setInput("");
    }
  };

  const renderAvatar = (user: User | null) => {
    if (!user) return <div className="chat-avatar-placeholder">?</div>;
    
    const safeName = user.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const imageUrl = `/Képek/${user.kep_url || safeName + ".jpg"}`;
    
    return (
      <img 
        src={imageUrl} 
        alt={user.name} 
        className="chat-avatar-img"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/Képek/logo.webp'; 
        }}
      />
    );
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => {
          const isMe = currentUser.user_id && Number(msg.from_user_id) === Number(currentUser.user_id);
          return (
            <div
              key={i}
              className={isMe ? "chat-message-row-me" : "chat-message-row-other"}
            >
              {!isMe && (
                <div className="chat-avatar">
                  {renderAvatar(selectedUser)}
                </div>
              )}
              <div className={isMe ? "chat-message-me" : "chat-message-other"}>
                {!isMe && <div style={{fontSize: '10px', marginBottom: '2px', opacity: 0.7}}>{selectedUser?.name}</div>}
                {msg.message}
              </div>
              {isMe && (
                <div className="chat-avatar">
                  {renderAvatar(currentUser)}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ 
            flex: 1, 
            padding: "10px 14px", 
            borderRadius: "20px", 
            border: "1px solid #ddd",
            outline: "none",
            fontSize: "14px"
          }}
          placeholder="Írj üzenetet..."
          disabled={!selectedUser}
        />
        <button 
          type="submit" 
          disabled={!selectedUser || !input.trim()}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "palevioletred",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.2s"
          }}
        >
          Küld
        </button>
      </form>
    </div>
  );
};

export default Chat;
