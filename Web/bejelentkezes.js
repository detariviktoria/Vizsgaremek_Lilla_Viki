document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Hiba a bejelentkezéskor');
    }

    console.log(`Sikeres bejelentkezés! Üdv, ${data.user.name}`);

    localStorage.setItem('username', data.user.name);
    window.location.href = 'kategoria_oldal1.html';
  } catch (error) {
    alert(error.message);
  }
});
