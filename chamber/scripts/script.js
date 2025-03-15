const hamburgerBtn = document.getElementById("hamburger-btn");
const primaryNav = document.getElementById("primary-nav");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("open");
  primaryNav.classList.toggle("open");
});

const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
  body.classList.add("dark");
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark");
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light");
  }
});

const currentDateElement = document.getElementById("current-date");
if (currentDateElement) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDateElement.textContent = new Date().toLocaleDateString(
    "en-US",
    options
  );
}

const currentYearElement = document.getElementById("current-year");
const lastModifiedElement = document.getElementById("last-modified");

if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
  lastModifiedElement.textContent = document.lastModified;
}
