// welcome_kategoria.js
window.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  const nav = document.getElementById('main-nav');
  const welcomeMsg = document.getElementById('welcome-message');
  if (username && nav) {
    nav.innerHTML = `<span>${username}</span>`;
    welcomeMsg.textContent = `${username}`;
  } else if (nav) {
    nav.innerHTML = '<a href="bejelentkezes.html">Bejelentkezés</a> <a href="regisztracio.html">Regisztráció</a>';
  }
  const tovabbGomb = document.getElementById('tovabb_gomb');
  if (tovabbGomb) {
    tovabbGomb.addEventListener('click', () => {
      window.location.href = 'tovabb.html';
    });
  }
});
