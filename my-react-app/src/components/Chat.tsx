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
    const cId = currentUser?.user_id;
    const sId = selectedUser?.user_id;

    if (cId && sId) {
      api.getChatHistory(cId, sId)
        .then(setMessages)
        .catch(console.error);
      
      // Üzenetek olvasottnak jelölése
      api.markChatAsRead(sId, cId)
        .then(() => {
          if (onMessagesRead) onMessagesRead();
        })
        .catch(console.error);
    } else {
      setMessages([]);
    }
  }, [currentUser?.user_id, selectedUser?.user_id, onMessagesRead]);

  // Privát üzenetek fogadása
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

      // Csak akkor adjuk hozzá, ha a kiválasztott beszélgetéshez tartozik (vagy mi küldtük neki, vagy ő nekünk)
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

        // Ha a partner küldte és nyitva van a chat, azonnal olvasottnak jelöljük
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

  // Automatikus legörgetés az utolsó üzenethez
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

      // Socket üzenet küldése - a backend visszaküldi nekünk is, így a handler fogja megjeleníteni
      socket.emit("private message", {
        from: cId,
        to: sId,
        message: trimmed,
      });

      // REST API mentés az adatbázisba
      api.sendChatMessage(cId, sId, trimmed)
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
          const isMe = currentUser.user_id && Number(msg.from_user_id) === Number(currentUser.user_id);
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
