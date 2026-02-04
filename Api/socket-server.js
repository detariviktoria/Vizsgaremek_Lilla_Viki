const { Server } = require("socket.io");

const io = new Server(5173, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Felhasználó csatlakozott: " + socket.id);

  // Felhasználó azonosítása (user_id-t várunk a kliens oldaltól)
  socket.on("join", (userId) => {
    socket.join("user_" + userId);
    socket.userId = userId;
  });

  // Privát üzenet küldése
  socket.on("private message", ({ from, to, message }) => {
    // Előzmény mentése API-n keresztül (opcionális, de REST API már tudja)
    io.to("user_" + to).emit("private message", { from, to, message });
    io.to("user_" + from).emit("private message", { from, to, message }); // saját ablakban is jelenjen meg
  });

  socket.on("disconnect", () => {
    console.log("Felhasználó lecsatlakozott: " + socket.id);
  });
});

console.log("Socket.io chat szerver fut a 5173-as porton!");
