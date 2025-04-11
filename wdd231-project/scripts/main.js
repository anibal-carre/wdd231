let projects = [];

fetch("data/projects.json")
  .then((response) => response.json())
  .then((data) => {
    projects = data;
    initProjectGallery();
  })
  .catch((error) => console.error("Error loading JSON:", error));

document.addEventListener("DOMContentLoaded", function () {
  feather.replace();

  document.getElementById("currentYear").textContent = new Date().getFullYear();

  initContactForm();

  initSmoothScrolling();
});

function initProjectGallery() {
  const projectsGrid = document.querySelector(".projects-grid");
  const filterButtons = document.querySelectorAll(".btn-filter");

  renderProjects("all");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");

      const category = this.getAttribute("data-category");
      renderProjects(category);
    });
  });

  function renderProjects(category) {
    projectsGrid.innerHTML = "";

    const filteredProjects =
      category === "all"
        ? projects
        : projects.filter((project) => project.category === category);

    filteredProjects.forEach((project) => {
      const projectCard = createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });
  }

  function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          
          <div class="project-tags">
            ${project.technologies
              .map(
                (tech) => `
              <span class="project-tag">${tech}</span>
            `
              )
              .join("")}
          </div>
          
          <div class="project-links">
            <a href="${
              project.demoUrl
            }" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <i data-feather="external-link" class="icon-sm"></i> Live Demo
            </a>
            <a href="${
              project.githubUrl
            }" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <i data-feather="github" class="icon-sm"></i> Code
            </a>
          </div>
        </div>
      `;

    feather.replace();

    return card;
  }
}

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("submitBtn");
  const sendAnotherBtn = document.getElementById("sendAnotherBtn");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.innerHTML =
      '<i data-feather="loader" class="icon-sm"></i> Sending...';
    submitBtn.disabled = true;
    feather.replace();

    setTimeout(() => {
      contactForm.classList.add("hidden");
      formSuccess.classList.remove("hidden");

      contactForm.reset();
      submitBtn.innerHTML =
        '<i data-feather="send" class="icon-sm"></i> Send Message';
      submitBtn.disabled = false;
      feather.replace();
    }, 1500);
  });

  sendAnotherBtn.addEventListener("click", function () {
    formSuccess.classList.add("hidden");
    contactForm.classList.remove("hidden");
  });
}

function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link, .footer-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}
