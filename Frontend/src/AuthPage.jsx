import React, { useState } from "react";

function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" or "register"

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #ddd", borderRadius: 8, background: "#fafbfc" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => setMode("login")}
          style={{ background: mode === "login" ? "#1976d2" : "#eee", color: mode === "login" ? "#fff" : "#333", padding: "8px 16px", border: "none", borderRadius: 4, fontWeight: 600 }}
        >
          Bejelentkezés
        </button>
        <button
          onClick={() => setMode("register")}
          style={{ background: mode === "register" ? "#1976d2" : "#eee", color: mode === "register" ? "#fff" : "#333", padding: "8px 16px", border: "none", borderRadius: 4, fontWeight: 600 }}
        >
          Regisztráció
        </button>
      </div>
      {mode === "register" ? (
        <div id="registration-div">
          <h2 style={{ textAlign: "center" }}>Regisztráció</h2>
          <form autoComplete="off">
            <label style={{ display: "block", marginBottom: 4 }}>Név</label>
            <input type="text" placeholder="Név" style={{ width: "100%", marginBottom: 12, padding: 8 }} required /><br />
            <label style={{ display: "block", marginBottom: 4 }}>Email</label>
            <input type="email" placeholder="Email" style={{ width: "100%", marginBottom: 12, padding: 8 }} required /><br />
            <label style={{ display: "block", marginBottom: 4 }}>Jelszó</label>
            <input type="password" placeholder="Jelszó" style={{ width: "100%", marginBottom: 16, padding: 8 }} required /><br />
            <button type="submit" style={{ width: "100%", background: "#1976d2", color: "#fff", padding: 10, border: "none", borderRadius: 4, fontWeight: 600 }}>Regisztráció</button>
          </form>
        </div>
      ) : (
        <div id="login-div">
          <h2 style={{ textAlign: "center" }}>Bejelentkezés</h2>
          <form autoComplete="off">
            <label style={{ display: "block", marginBottom: 4 }}>Email</label>
            <input type="email" placeholder="Email" style={{ width: "100%", marginBottom: 12, padding: 8 }} required /><br />
            <label style={{ display: "block", marginBottom: 4 }}>Jelszó</label>
            <input type="password" placeholder="Jelszó" style={{ width: "100%", marginBottom: 16, padding: 8 }} required /><br />
            <button type="submit" style={{ width: "100%", background: "#1976d2", color: "#fff", padding: 10, border: "none", borderRadius: 4, fontWeight: 600 }}>Bejelentkezés</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
