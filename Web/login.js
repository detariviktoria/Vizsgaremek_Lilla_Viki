// login.js
// Bejelentkezési logika

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (response.ok && data.username) {
    localStorage.setItem('username', data.username);
    window.location.href = 'welcome.html';
  } else {
    alert('Hibás felhasználónév vagy jelszó!');
  }
});
