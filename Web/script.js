document.getElementById("startBtn").addEventListener("click", function() {
  window.location.href = "kategoria_oldal1.html";
});

fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(users => {
    console.log("Felhasználók az adatbázisból:", users);
  })
  .catch(err => {
    console.error("Hiba történt a lekérés közben:", err);
  });

function updateNav() {
  fetch("/auth/check", { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      // Mindig a nav id-t keresd, ha van, különben a sima nav tag-et
      const nav = document.getElementById("main-nav") || document.querySelector("nav");
      if (nav) {
        if (data.loggedIn) {
          nav.innerHTML = `<span>${data.user.name}</span>`;
        } else {
          nav.innerHTML = `
            <a href="bejelentkezes.html">Bejelentkezés</a>
            <a href="regisztracio.html">Regisztráció</a>
          `;
        }
      }
    });
}

updateNav();