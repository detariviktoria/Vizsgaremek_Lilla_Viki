const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });



const http = require('http');
const { Server } = require("socket.io");

const app = require("./app");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.io példány csatolása az app objektumhoz, hogy el lehessen érni a kontrollerekből
app.set('socketio', io);

io.on("connection", (socket) => {
  console.log("Felhasználó csatlakozott: " + socket.id);

  // Felhasználó azonosítása (user_id-t várunk a kliens oldaltól)
  socket.on("join", (userId) => {
    socket.join("user_" + userId);
    socket.userId = userId;
    console.log(`User ${userId} joined room user_${userId}`);
  });

  // Privát üzenet küldése
  socket.on("private message", ({ from, to, message }) => {
    console.log(`Private message from ${from} to ${to}: ${message}`);
    io.to("user_" + to).emit("private message", { from, to, message });
    io.to("user_" + from).emit("private message", { from, to, message }); // saját ablakban is jelenjen meg
  });

  socket.on("disconnect", () => {
    console.log("Felhasználó lecsatlakozott: " + socket.id);
  });
});

const PORT = 3000;



console.log('--- SZERVER INDÍTÁSA ---');

console.log('Környezeti változók betöltése innen:', path.join(__dirname, '.env'));

console.log('Email User:', process.env.EMAIL_USER ? 'BEÁLLÍTVA' : 'HIÁNYZIK');

console.log('Email Pass:', process.env.EMAIL_PASS ? 'BEÁLLÍTVA' : 'HIÁNYZIK');

console.log('------------------------');



server.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);

});