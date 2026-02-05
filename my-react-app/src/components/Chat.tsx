import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import type { User } from "../api";

interface ChatProps {
  currentUser: User;
  selectedUser: User | null;
}

const Chat: React.FC<ChatProps> = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState<
    { from_user_id: number; to_user_id: number; message: string; created_at: string }[]
  >([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Előzmények lekérése, ha partner változik
  useEffect(() => {
    if (currentUser?.user_id && selectedUser?.user_id) {
      fetch(`http://localhost:3000/api/chat/history/${currentUser.user_id}/${selectedUser.user_id}`)
        .then((res) => res.json())
        .then(setMessages);
    } else {
      setMessages([]);
    }
  }, [currentUser?.user_id, selectedUser?.user_id]);

  // Privát üzenetek fogadása (csak bejövő üzenetek, a saját küldötteket lokálisan kezeljük)
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
      }
    };
    socket.on("private message", handler);
    return () => {
      socket.off("private message", handler);
    };
  }, [currentUser?.user_id, selectedUser?.user_id]);

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
      if (selectedUser?.user_id) {
        setMessages((prev) => [
          ...prev,
          {
            from_user_id: currentUser.user_id!,
            to_user_id: selectedUser.user_id!,
            message: trimmed,
            created_at: new Date().toISOString(),
          },
        ]);
      }
      

      // Socket üzenet a másik felhasználónak
      socket.emit("private message", {
        from: currentUser.user_id,
        to: selectedUser.user_id,
        message: trimmed,
      });

      // REST API mentés
      fetch("http://localhost:3000/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_user_id: currentUser.user_id,
          to_user_id: selectedUser.user_id,
          message: trimmed,
        }),
      });

      setInput("");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div
        style={{
          height: 200,
          overflowY: "auto",
          marginBottom: 8,
          background: "#fafafa",
          padding: 8,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.from_user_id === currentUser.user_id ? "right" : "left",
            }}
          >
            <b>{msg.from_user_id === currentUser.user_id ? "Én" : selectedUser?.name}:</b>{" "}
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{ display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, marginRight: 8 }}
          placeholder="Írj üzenetet..."
          disabled={!selectedUser}
        />
        <button type="submit" disabled={!selectedUser}>
          Küld
        </button>
      </form>
    </div>
  );
};

export default Chat;
