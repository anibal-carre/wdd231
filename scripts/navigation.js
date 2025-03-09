document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const primaryNav = document.getElementById("primary-nav");

  hamburgerBtn.addEventListener("click", () => {
    primaryNav.classList.toggle("open");

    const isOpen = primaryNav.classList.contains("open");
    hamburgerBtn.innerHTML = isOpen ? "&times;" : "&#9776;";

    hamburgerBtn.setAttribute("aria-expanded", isOpen);
  });

  document.addEventListener("click", (event) => {
    if (
      !hamburgerBtn.contains(event.target) &&
      !primaryNav.contains(event.target)
    ) {
      primaryNav.classList.remove("open");
      hamburgerBtn.innerHTML = "&#9776;";
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }
  });

  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });
});
