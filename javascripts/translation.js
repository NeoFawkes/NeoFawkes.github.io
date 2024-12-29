const languageSelector = document.getElementById('language_selector');
const elements = document.querySelectorAll('[data-key]');
const interim = document.getElementById('interim');

/*
ONLY when Node.js server is running

async function loadFile() {
  const response = await fetch("translations/translations.json");
  return await response.json();
}
async function changeLanguage(lang) {
  const translations = await loadFile();
  interim.innerHTML = translations;
  elements.foreach((element)=>{
    const key = element.getAttribute("data-key");
    element.textContent = translations[lan][key];
  });
}
*/

const translations = {
  "en":{
    "facebookButton": "Continue with Facebook",
    "or": "OR",
    "username_field": "Phone number, username, or email",
    "password_field": "Password",
    "forgotPassword": "Forgot password?",
    "login_button": "Log in",
    "notAccount": "Don't have an account?",
    "signUp": "Sign up",
    "agree": "By continuing, you agree to Instagram's",
    "terms": "Terms of use",
    "and": "and",
    "privacy": "Privacy Policy"
  },
  "es-la":{
    "facebookButton": "Continuar con Facebook",
    "or": "o",
    "username_field": "Numero de teléfono, usuario, o correo electrónico",
    "password_field": "Contraseña",
    "forgotPassword": "¿Has olvidado tu contraseña?",
    "login_button": "Iniciar sesión",
    "notAccount": "¿No tienes una cuenta?",
    "signUp": "Crear cuenta",
    "agree": "Al continuar, aceptas las",
    "terms": "Condiciones de uso",
    "and": "y",
    "privacy": "Política de privacidad",
    "ofInstagram":"de Instagram"
  } 
};


function changeLanguage(lang) {
  interim.innerHTML = lang;
  elements.forEach((element)=>{
    const key = element.getAttribute("data-key");
    if (element.tagName.toLowerCase() === 'a') {
      element.textContent = translations[lang][key];
    } else {
      element.textContent = translations[lang][key];
    }

    if (element.hasAttribute("placeholder")) {
      element.placeholder = translations[lang][key];
    }

  });
}

const defaultLanguage = navigator.language.startsWith("es") ? "es-la" : "en";
languageSelector.value = defaultLanguage;
changeLanguage(defaultLanguage);

languageSelector.addEventListener("change", (e) => {
  changeLanguage(e.target.value);
});
