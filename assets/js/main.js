/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 100,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 100,
});
sr.reveal(".home__social-icon", { interval: 100 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 100 });
sr.reveal(".project__container, .project__information", { interval: 100 });

/*===== DARK MODE =====*/
sessionStorage.setItem("dark-mode", false);

function toggleDarkMode() {
  let checked = sessionStorage.getItem("dark-mode");
  checked = checked == "false" ? true : false;
  sessionStorage.setItem("dark-mode", checked);
  const toggles = document.querySelectorAll(".dark_mode_toggle");
  toggles.forEach((toggle) => (toggle.checked = checked));

  const body = document.body;
  body.classList.toggle("dark-mode");
  const footer = document.querySelector(".footer");
  footer.classList.toggle("dark-mode1");

  const icons = document.querySelectorAll(".home__social-icon");
  icons.forEach((i) => i.classList.toggle("dark-mode"));
  const header = document.querySelector(".l-header");
  header.classList.toggle("dark-mode");
  const logo = document.querySelector(".nav__logo");
  logo.classList.toggle("dark-mode");
  const nav_items = document.querySelectorAll(
    ".nav__list .nav__item .nav__link"
  );
  const skillsDivs = document.querySelectorAll(".skills__data");
  skillsDivs.forEach((div) => div.classList.toggle("dark-mode-skills"));

  if (window.screen.width < 769) {
    nav_items.forEach((item) => item.classList.toggle("dark-mode1"));
  } else {
    nav_items.forEach((item) => item.classList.toggle("dark-mode"));
  }

  const mobile_menu = document.querySelector("#nav-toggle i");
  mobile_menu.classList.toggle("dark-mode");
}

const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

/*===== EMAIL CONTACT FORM =====*/
function sendEmail() {
  const bodyMessage = `Name: ${name.value}<br> Email: ${email.value}<br><br> Message: ${message.value}`;

  Email.send({
    SecureToken: "e37c4cd5-654e-4caa-bbb3-1b6500f8ef2c",
    To: "nace.gorgievski123@gmail.com",
    From: "quickybaby.wot@gmail.com",
    Subject: "Portfolio Message",
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const inputs = document.querySelectorAll(".contact__input");
  for (const input of inputs) {
    if (input.value == "") {
      input.classList.add("error");
      input.parentElement.classList.add("error");
    }

    if (inputs[1].value != "") {
      checkEmail();
    }

    inputs[1].addEventListener("keyup", () => {
      checkEmail();
    });

    input.addEventListener("keyup", () => {
      if (input.value != "") {
        input.classList.remove("error");
        input.parentElement.classList.remove("error");
      } else {
        input.classList.add("error");
        input.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailErrorText = document.querySelector(".email-error");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      emailErrorText.innerText = "Enter a valid email address";
    } else {
      emailErrorText.innerText = "Email can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !name.classList.contains("error") &&
    !email.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    sendEmail();
    form.reset();
    return false;
  }
});
