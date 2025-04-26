/* RESPONZIVNÍ NAVIGACE (bars + cross) */
//--------------------------------------//
const menuIcon = document.querySelector(".menu-icon")
const menuList = document.querySelector(".main-nav")
const hamburgerIcon = document.querySelector(".menu-icon i")

menuIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("fa-bars-staggered")
  hamburgerIcon.classList.toggle("fa-xmark")
  menuList.classList.toggle("show")
})

// zavření menu po kliknutí na odkaz na mobilním zařízení
const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuList.classList.remove('show');
    hamburgerIcon.classList.add('fa-bars-staggered');
    hamburgerIcon.classList.remove('fa-xmark');
  });
});


/* INTERAKTIVNÍ NAVIGACE - ODKAZY */
//---------------------------------//
const scrollLinks = document.querySelectorAll('.scroll-btn');
const headerHeight = document.querySelector('header').offsetHeight;

scrollLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const sectionTop = targetSection.offsetTop;
      
      window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: 'smooth'
      });
    }
  });
});



/* DARK & LIGHT REŽIM */
//---------------------//
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeLabel = document.querySelector('#theme-toggle .theme-label');

// Funkce pro nastavení tmavého režimu //
const darkMode = () => {
  themeLabel.textContent = 'Dark';
  html.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  toggleBtn.querySelector('.icon').textContent = '🌙';
};

// Funkce pro nastavení světlého režimu //
const lightMode = () => {
  themeLabel.textContent = 'Light';
  html.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
  toggleBtn.querySelector('.icon').textContent = '🔆';
};

// Přepínač tématu (přepne podle aktuálního) //
const switchTheme = () => {
  if (html.getAttribute('data-theme') === 'light') {
    darkMode();
  } else {
    lightMode();
  }
};

// Při načtení stránky zkontroluj localStorage a nastav téma //
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    darkMode();
  } else if (savedTheme === 'light') {
    lightMode();
  } else {
    darkMode();
  }
});

// Přepnutí tématu kliknutím na tlačítko
toggleBtn.addEventListener('click', switchTheme);



/* SHRING HEADERU PŘI SCROLLU */
//-----------------------------//
const header = document.querySelector('header');
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



/* FOCUS TEXT ANIMACE PŘI SCROLLU */
//--------------------------------//
const focusText = document.querySelector('.focus-text p');
const section = document.querySelector('.focus-text');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionBottom = sectionTop + sectionHeight;

  let scale = 1;
  let opacity = 1;

  if (scrollY > sectionTop - 550 && scrollY < sectionBottom + 650) {
    const progress = (scrollY - sectionTop + 550) / 650;

    scale = Math.min(1 + progress, 1.3);
    opacity = 1 - Math.min(progress * 0.5, 0.5);
  }

  focusText.style.transform = `scale(${scale})`;
  focusText.style.opacity = opacity;
});



/* TLAČÍTKO PRO POSUN NA ZAČÁTEK STRÁNKY */
//----------------------------------------//
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



/* FORMULÁŘ */
//-----------//
const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const nameStatus = document.getElementById('nameStatus');
    const emailStatus = document.getElementById('emailStatus');
    const passwordStatus = document.getElementById('passwordStatus');
    const confirmPasswordStatus = document.getElementById('confirmPasswordStatus');

    const message = document.getElementById('message');
    const submitMessage = document.getElementById('submitMessage');

    function validateName() {
      if (nameInput.value.trim() !== "") {
        nameStatus.textContent = "✅";
        nameStatus.className = "status-icon success";
        return true;
      } else {
        nameStatus.textContent = "❌";
        nameStatus.className = "status-icon error";
        return false;
      }
    }

    function validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(emailInput.value)) {
        emailStatus.textContent = "✅";
        emailStatus.className = "status-icon success";
        message.textContent = "";
        return true;
      } else {
        emailStatus.textContent = "❌";
        emailStatus.className = "status-icon error";
        message.textContent = "Uveďte platný email!";
        message.className = "message error";
        return false;
      }
    }

    function validatePassword() {
      if (passwordInput.value.trim() !== "") {
        passwordStatus.textContent = "✅";
        passwordStatus.className = "status-icon success";
        return true;
      } else {
        passwordStatus.textContent = "❌";
        passwordStatus.className = "status-icon error";
        return false;
      }
    }

    function validateConfirmPassword() {
      if (confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value !== "") {
        confirmPasswordStatus.textContent = "✅";
        confirmPasswordStatus.className = "status-icon success";
        return true;
      } else {
        confirmPasswordStatus.textContent = "❌";
        confirmPasswordStatus.className = "status-icon error";
        return false;
      }
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', () => {
      validatePassword();
      validateConfirmPassword();
    });
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    form.addEventListener('submit', function(e) {
      e.preventDefault(); // zabránění klasickému odeslání

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();

      if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        submitMessage.textContent = "Děkujeme za registraci!";
    
        // Vyčištění formuláře
        form.reset();
        nameStatus.textContent = "";
        emailStatus.textContent = "";
        passwordStatus.textContent = "";
        confirmPasswordStatus.textContent = "";
        message.textContent = "";
        message.className = "message";
      } else {
        submitMessage.textContent = "";
        message.textContent = "Vyplňte prosím správně všechna pole.";
        message.className = "message error";
      }
    });