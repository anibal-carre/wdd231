document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("current-year");
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;

  const lastModifiedElement = document.getElementById("lastModified");
  lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;
});
