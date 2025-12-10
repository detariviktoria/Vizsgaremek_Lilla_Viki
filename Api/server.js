const app = require("./app");

const PORT = 3000; // vagy bármelyik port, amit szeretnél

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// futtatas node server.js