function renderSubcategories(cats) {
  const div = document.getElementById("subcategories");
  div.innerHTML = `
    <div class="subcat-list">
      ${cats.map(cat => `<div class="subcat-item">${cat}</div>`).join('')}
    </div>
  `;
}

document.getElementById("alkalomBtn").addEventListener("click", () => {
  fetch("/alkalmak")
    .then(response => response.json())
    .then(renderSubcategories)
    .catch(error => console.error('Hiba az alkalmak lekérésekor:', error));
});

document.getElementById("stilusBtn").addEventListener("click", () => {
  fetch("/stilusok")
    .then(response => response.json())
    .then(renderSubcategories)
    .catch(error => console.error('Hiba a stílusok lekérésekor:', error));
});

document.getElementById("celcsoportBtn").addEventListener("click", () => {
  fetch("/celcsoportok")
    .then(response => response.json())
    .then(renderSubcategories)
    .catch(error => console.error('Hiba a célcsoportok lekérésekor:', error));
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