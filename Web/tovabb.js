window.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const username = localStorage.getItem('username');
  if (nav && username) {
    nav.innerHTML = `<span class="user-name">${username}</span>`;
  }
});

function updateNav() {
  fetch("/auth/check")
    .then(res => res.json())
    .then(data => {
      const nav = document.getElementById("main-nav");
      if (data.loggedIn) {
        nav.innerHTML = `<span>${data.user.name}</span>`;
      } else {
        nav.innerHTML = `
          <a href="bejelentkezes.html">Bejelentkezés</a>
          <a href="regisztracio.html">Regisztráció</a>
        `;
      }
    });
}

updateNav();

// Védett oldal ellenőrzés
fetch("/auth/check")
  .then(res => res.json())
  .then(data => {
    if (!data.loggedIn) {
      window.location.href = "bejelentkezes.html";
    }
  });
