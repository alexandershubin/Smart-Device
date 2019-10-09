
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
var body = document.querySelector("body");


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
  body.style.overflow = `hidden`;
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
  body.style.overflow = `inherit`;
});

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
  overlay.classList.remove("overlay-modal");
  body.style.overflow = `inherit`;
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
  var formPage = document.querySelector(".form__login");
  var name = formPage.querySelector("[name=name]");
var number = formPage.querySelector("[name=number]");
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
    body.style.overflow = `inherit`;
    }
  }
});

toggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (toggle.classList.contains('toggle-plus')) {
    toggle.classList.remove("toggle-plus");
    toggle.classList.add("toggle-minus");
    list.style.display = ` block`;
    listOffice.style.display = `none`;
    toggleOffice.classList.add("toggle-plus");
    toggleOffice.classList.remove("toggle-minus");
  } else {
    toggle.classList.remove("toggle-minus");
    toggle.classList.add("toggle-plus");
    list.style.display = `none`;
    toggleOffice.classList.add("toggle-plus");
  }
});

toggleOffice.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (toggleOffice.classList.contains('toggle-plus')) {
    toggleOffice.classList.remove("toggle-plus");
    toggleOffice.classList.add("toggle-minus");
    listOffice.style.display = `block`;
    list.style.display = `none`;
    toggle.classList.add("toggle-plus");
    toggle.classList.remove("toggle-minus");
  } else {
    toggleOffice.classList.remove("toggle-minus");
    toggleOffice.classList.add("toggle-plus");
    listOffice.style.display = `none`;
    toggle.classList.add("toggle-plus");
  }
});

// form
function mask(text, mask, evt) {
try {
  var text = document.getElementById("number");
  var value = text.value;

  // If user pressed DEL or BACK SPACE, clean the value
  try {
    var e = (evt.which) ? evt.which : event.keyCode;
    if ( e == 46 || e == 8 ) {
      text.value = "";
      return;
    }
  } catch (e1) {}

  var literalPattern=/[0\*]/;
  var numberPattern=/[0-9]/;
  var newValue = "";

  for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
    if (mId >= value.length)
      break;

    // Number expected but got a different value, store only the valid portion
    if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
      break;
    }

    // Found a literal
    while (mask[mId].match(literalPattern) == null) {
      if (value[vId] == mask[mId])
        break;

    newValue += mask[mId++];
  }

  newValue += value[vId++];
  mId++;
}

text.value = newValue;
  } catch(e) {}
}

// // modal form
window.addEventListener("DOMContentLoaded", function() {
  function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
      else if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.collapse(true);
          range.moveEnd("character", pos);
          range.moveStart("character", pos);
          range.select()
      }
  }

  function mask(event) {
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, function(a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });
      if (event.type == "blur") {
          if (this.value.length == 2) this.value = ""
      } else setCursorPosition(this.value.length, this)
  };

    var input = document.getElementById("phone");
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
});

// scroll
var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 1;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        var w = window.pageYOffset,  // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}
