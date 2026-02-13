import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import { api, type User } from "../api";

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

  // Előzmények lekérése, ha partner változik
  useEffect(() => {
    if (currentUser?.user_id && selectedUser?.user_id) {
      api.getChatHistory(currentUser.user_id, selectedUser.user_id)
        .then(setMessages)
        .catch(console.error);
      
      // Üzenetek olvasottnak jelölése
      api.markChatAsRead(selectedUser.user_id, currentUser.user_id)
        .then(() => {
          if (onMessagesRead) onMessagesRead();
        })
        .catch(console.error);
    } else {
      setMessages([]);
    }
  }, [currentUser?.user_id, selectedUser?.user_id]);

  // Privát üzenetek fogadása
  useEffect(() => {
    const handler = (msg: { from: number; to: number; message: string }) => {
      if (msg.from === selectedUser?.user_id && msg.to === currentUser.user_id) {
        setMessages((prev) => [
          ...prev,
          {
            from_user_id: msg.from,
            to_user_id: msg.to,
            message: msg.message,
            created_at: new Date().toISOString(),
          },
        ]);

        // Ha nyitva van a chat ezzel a személlyel, azonnal olvasottnak jelöljük
        api.markChatAsRead(msg.from, currentUser.user_id)
          .then(() => {
            if (onMessagesRead) onMessagesRead();
          })
          .catch(console.error);
      }
    };
    socket.on("private message", handler);
    return () => {
      socket.off("private message", handler);
    };
  }, [currentUser?.user_id, selectedUser?.user_id, onMessagesRead]);

  // Automatikus legörgetés az utolsó üzenethez
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && selectedUser?.user_id) {
      const trimmed = input.trim();

      // Azonnali megjelenítés a saját ablakban
      setMessages((prev) => [
        ...prev,
        {
          from_user_id: currentUser.user_id!,
          to_user_id: selectedUser.user_id!,
          message: trimmed,
          created_at: new Date().toISOString(),
        },
      ]);
      

      // Socket üzenet a másik felhasználónak
      socket.emit("private message", {
        from: currentUser.user_id,
        to: selectedUser.user_id,
        message: trimmed,
      });

      // REST API mentés
      api.sendChatMessage(currentUser.user_id!, selectedUser.user_id, trimmed)
        .catch(console.error);

      setInput("");
    }
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "10px 0",
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "12px",
        backgroundColor: "#fff4fa",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      <div
        style={{
          height: 250,
          overflowY: "auto",
          marginBottom: 12,
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        {messages.map((msg, i) => {
          const isMe = msg.from_user_id === currentUser.user_id;
          return (
            <div
              key={i}
              style={{
                alignSelf: isMe ? "flex-end" : "flex-start",
                backgroundColor: isMe ? "palevioletred" : "#f0f0f0",
                color: isMe ? "white" : "#333",
                padding: "8px 12px",
                borderRadius: isMe ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                maxWidth: "80%",
                fontSize: "14px",
                lineHeight: "1.4",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {!isMe && <div style={{fontSize: '10px', marginBottom: '2px', opacity: 0.7}}>{selectedUser?.name}</div>}
              {msg.message}
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
