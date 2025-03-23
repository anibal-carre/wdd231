document.getElementById("hamburger-btn").addEventListener("click", function () {
  document.getElementById("primary-nav").classList.toggle("open");
  this.classList.toggle("open");
});

const now = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
document.getElementById("current-date").textContent = now.toLocaleDateString(
  "en-US",
  options
);

document.getElementById("current-year").textContent = now.getFullYear();

document.getElementById(
  "last-modified"
).textContent = `Last Modified: ${document.lastModified}`;

document
  .getElementById("dark-mode-toggle")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      this.textContent = "☀️";
    } else {
      this.textContent = "🌙";
    }

    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  });

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("dark-mode-toggle").textContent = "☀️";
  }
});
