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



/* DARK & LIGHT REŽIM */
//---------------------//
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeName = document.querySelector('.main-nav p');

// Funkce pro nastavení tmavého režimu //
const darkMode = () => {
  themeName.textContent = 'Dark';
  html.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  toggleBtn.textContent = '🌙';
};

// Funkce pro nastavení světlého režimu //
const lightMode = () => {
  themeName.textContent = 'Light';
  html.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
  toggleBtn.textContent = '🔆';
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

// Event listener pro přepnutí tématu kliknutím //
toggleBtn.addEventListener('click', switchTheme);



/* Shrink headeru při scrollu */
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



/* Focus text animace při scrollu */
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

  if (scrollY > sectionTop - 400 && scrollY < sectionBottom + 500) {
    const progress = (scrollY - sectionTop + 400) / 500;

    const maxWidth = 800;
    const scaleLimit = Math.min(maxWidth / focusText.offsetWidth, window.innerWidth / focusText.offsetWidth);
    scale = Math.min(1 + progress, scaleLimit);
    opacity = 1 - Math.min(progress * 0.5, 0.5);
  }

  focusText.style.transform = `scale(${scale})`;
  focusText.style.opacity = opacity;
});



/* Tlačítko pro posun na začátek stránky */
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

/*const formular = document.querySelector("form")

const fullName = document.querySelector(".fullName")
const email = document.querySelector(".email")
const password = document.querySelector("password")
const confirmPassword = document.querySelector("confirmPassword")

const notName = document.querySelector(".notificationName")
const notEmail = document.querySelector(".notificationEmail")
const notPassword = document.querySelector(".notificationPassword");
const notConfirmPassword = document.querySelector(".notificationConfirmPassword");

const successMessage = document.querySelector(".notificationSuccess");

formular.addEventListener("submit", (event) => {
    event.preventDefault()
    notName.style.display = fullName.value === "" ? "block" : "none";
    notEmail.style.display = email.value === "" ? "block" : "none";
    notPassword.style.display = password.value === "" ? "block" : "none";
    notConfirmPassword.style.display = confirmpassword.value === "" ? "block" : "none";
})*/


/*const form = document.getElementById("form")
const emailInput = document.querySelector(".email")
const resultText = document.querySelector(".text")
const pattern = /^([a-z\d\.\-]+)@([a-z\d\-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/

console.log(form, emailInput, resultText)

emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value
    
    if(emailValue.match(pattern)){
        form.classList.add("valid")
        form.classList.remove("invalid")
        resultText.textContent = ""
        resultText.style.color = "#00ff00"
    } else {
        form.classList.add("invalid")
        form.classList.remove("valid")
        resultText.textContent = "Uveďte prosím platný email!"
        resultText.style.color = "#ff0000"
    }
    if (emailValue === ""){
        form.classList.remove("invalid")
        form.classList.remove("valid")
        resultText.textContent = ""
    }
})*/


const form = document.getElementById("form");
const fullName = document.querySelector(".fullName");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirmPassword");
const resultText = document.querySelector(".text");
const notification = document.querySelector(".notificationSuccess");

// Vzory
const emailPattern = /^([a-z\d\.\-]+)@([a-z\d\-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;

// Pomocná funkce pro validaci
function setValidationState(fieldName, isValid) {
  form.classList.remove(`valid${fieldName}`, `invalid${fieldName}`);
  form.classList.add(isValid ? `valid${fieldName}` : `invalid${fieldName}`);
}

// Validace každého pole
function validateFullName() {
  const value = fullName.value.trim();
  const isValid = value.length > 2;
  setValidationState("Name", isValid);
  if (!isValid) resultText.textContent = "Zadejte celé jméno.";
  return isValid;
}

function validateEmail() {
  const value = email.value.trim();
  const isValid = emailPattern.test(value);
  setValidationState("Email", isValid);
  if (!isValid) resultText.textContent = "Uveďte prosím platný email!";
  return isValid;
}

function validatePassword() {
  const value = password.value.trim();
  const isValid = value.length >= 6;
  setValidationState("Password", isValid);
  if (!isValid) resultText.textContent = "Heslo musí mít alespoň 6 znaků.";
  return isValid;
}

function validateConfirmPassword() {
  const isValid = password.value === confirmPassword.value && confirmPassword.value !== "";
  setValidationState("Confirm", isValid);
  if (!isValid) resultText.textContent = "Hesla se neshodují!";
  return isValid;
}

// Události při opuštění políčka
fullName.addEventListener("blur", () => {
  resultText.textContent = "";
  validateFullName();
});
email.addEventListener("blur", () => {
  resultText.textContent = "";
  validateEmail();
});
password.addEventListener("blur", () => {
  resultText.textContent = "";
  validatePassword();
});
confirmPassword.addEventListener("blur", () => {
  resultText.textContent = "";
  validateConfirmPassword();
});

// Odeslání formuláře
form.addEventListener("submit", (e) => {
  e.preventDefault();

  resultText.textContent = "";

  const isNameValid = validateFullName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();

  if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
    notification.style.display = "block";
    form.reset();
    form.className = ""; // smaže všechny valid/invalid třídy
  } else {
    notification.style.display = "none";
  }
});