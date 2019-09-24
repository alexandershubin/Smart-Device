var link = document.querySelector(".header__right--button");
var popup = document.querySelector(".modal");
var formPage = document.querySelector(".form__login");
var close = popup.querySelector(".modal__close");
var login = popup.querySelector("[name=login]");
var phone = popup.querySelector("[name=phone]");
var name = formPage.querySelector("[name=name]");
var number = formPage.querySelector("[name=number]");
var form = document.querySelectorAll("form");
var overlay = document.querySelector(".overlay");
var toggle = document.querySelector(".toggle");
var toggleOffice = document.querySelector(".toggle-button");
var list = document.querySelector(".part__list");
var listOffice = document.querySelector(".office__list");


var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("login", "name");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  overlay.classList.add("overlay-modal");
  if (storage) {
    login.value = storage;
     phone.focus();
   } else {
    login.focus();
   }
});

close.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
  overlay.classList.remove("overlay-modal");
});

toggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (toggle.classList.contains('toggle-plus')) {
    toggle.classList.remove("toggle-plus")
    toggle.classList.add("toggle-minus")
    list.style.display=`block`
  } else {
    toggle.classList.remove("toggle-minus")
    toggle.classList.add("toggle-plus")
    list.style.display=`none`
  }
});

toggleOffice.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (toggleOffice.classList.contains('toggle-plus')) {
    toggleOffice.classList.remove("toggle-plus")
    toggleOffice.classList.add("toggle-minus")
    listOffice.style.display=`block`
  } else {
    toggleOffice.classList.remove("toggle-minus")
    toggleOffice.classList.add("toggle-plus")
    listOffice.style.display=`none`
  }
});

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
  overlay.classList.remove("overlay-modal");
});

popup.addEventListener("submit", function (evt) {
  if (!login.value || !phone.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    formPage.offsetWidth = formPage.offsetWidth;
    popup.classList.add("modal-error");
    console.log("Нужно Имя и телефон");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
    }
  }
});

formPage.addEventListener("submit", function (evt) {
  if (!name.value || !number.value) {
    evt.preventDefault();
    formPage.offsetWidth = formPage.offsetWidth;
    console.log("Нужно Имя и телефон");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", name.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
  if (popup.classList.contains("modal-show")) {
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
    overlay.classList.remove("overlay-modal");
    }
  }
});