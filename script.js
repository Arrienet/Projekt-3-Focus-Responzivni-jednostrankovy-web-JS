const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeName = document.querySelector('.main-nav p');

// Funkce pro nastavení tmavého režimu
const darkMode = () => {
  themeName.textContent = 'Dark';
  html.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  toggleBtn.textContent = '🌙';
};

// Funkce pro nastavení světlého režimu
const lightMode = () => {
  themeName.textContent = 'Light';
  html.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
  toggleBtn.textContent = '🔆';
};

// Přepínač tématu (přepne podle aktuálního)
const switchTheme = () => {
  if (html.getAttribute('data-theme') === 'dark') {
    lightMode();
  } else {
    darkMode();
  }
};

// Při načtení stránky zkontroluj localStorage a nastav téma
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    darkMode();
  } else {
    lightMode();
  }
});

// Event listener pro přepnutí tématu kliknutím
toggleBtn.addEventListener('click', switchTheme);

// Shrink header on scroll
const header = document.querySelector('.main-header');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      header.classList.toggle('shrink', scrollY > 50);
      ticking = false;
    });
    ticking = true;
  }
});