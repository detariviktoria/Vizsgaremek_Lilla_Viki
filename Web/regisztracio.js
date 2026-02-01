document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.querySelector('input[type="email"]').value;
  const username = document.querySelector('input[type="text"]').value;
  const password = document.getElementById('password').value;
  const confirmPwd = document.getElementById('confirmPassword').value;
  const messageBox = document.getElementById('message');
  messageBox.textContent = "";
  if (password !== confirmPwd) {
    messageBox.textContent = "A jelszavak nem egyeznek!";
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: username, email: email, password: password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Hiba történt a regisztráció során.');
    messageBox.style.color = "green";
    messageBox.textContent = "Sikeres regisztráció! Átirányítás...";
    setTimeout(() => {
      window.location.href = 'bejelentkezes.html';
    }, 1500);
  } catch (err) {
    messageBox.style.color = "red";
    messageBox.textContent = err.message;
  }
});
