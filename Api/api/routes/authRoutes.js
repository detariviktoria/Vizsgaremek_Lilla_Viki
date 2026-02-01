const express = require("express");
const router = express.Router();

const db = require("../db"); // -> api/db/index.js
const { User } = db;
const authUtils = require("../utilities/authUtils");

// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Hibás email vagy jelszó!" });

    const stored = user.password;
    let ok = false;

    // Ha bcrypt hash található (pl. "$2a$..."), használjuk a compare-t
    if (typeof stored === "string" && stored.startsWith("$2")) {
      ok = await authUtils.comparePassword(password, stored);
    } else {
      // Legacy: plaintext a DB-ben
      ok = password === stored;
      if (ok) {
        // Rehash és mentés (átállítjuk biztonságos tárolásra)
        user.password = authUtils.hashPasswordSync(password);
        await user.save();
      }
    }

    if (!ok) return res.status(401).json({ message: "Hibás email vagy jelszó!" });

    res.json({
      userId: user.user_id,
      username: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba történt a bejelentkezéskor" });
  }
});

module.exports = router;