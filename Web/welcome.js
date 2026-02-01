const username = localStorage.getItem('username');
const welcomeMessage = document.getElementById('welcome-message');
if (username) {
  welcomeMessage.textContent = `Üdvözöllek, ${username}!`;
}
const tovabbGomb = document.getElementById('tovabb_gomb');
if (tovabbGomb) {
  tovabbGomb.addEventListener('click', () => {
    window.location.href = 'tovabb.html';
  });
}
