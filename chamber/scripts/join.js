document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  document.getElementById("timestamp").value = now.toISOString();

  const modals = document.querySelectorAll(".modal");
  const benefitsLinks = document.querySelectorAll(".benefits-link");
  const closeButtons = document.querySelectorAll(".close-modal");

  benefitsLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      document.getElementById(modalId).style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        modal.style.display = "none";
      });
      document.body.style.overflow = "auto";
    }
  });

  const form = document.getElementById("join-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      console.log("Form submitted successfully");
    });
  }
});
