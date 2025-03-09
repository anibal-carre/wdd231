document.addEventListener("DOMContentLoaded", () => {
  const courses = [
    {
      code: "CSE 110",
      name: "Programming Building Blocks",
      credits: 3,
      completed: true,
    },
    {
      code: "CSE 111",
      name: "Programming with Functions",
      credits: 3,
      completed: true,
    },
    {
      code: "CSE 210",
      name: "Programming with Classes",
      credits: 3,
      completed: false,
    },
    {
      code: "WDD 130",
      name: "Web Fundamentals",
      credits: 3,
      completed: true,
    },
    {
      code: "WDD 131",
      name: "Web Frontend Development I",
      credits: 3,
      completed: true,
    },
    {
      code: "WDD 231",
      name: "Web Frontend Development II",
      credits: 3,
      completed: false,
    },
  ];

  const coursesContainer = document.getElementById("courses-container");
  const totalCreditsElement = document.getElementById("total-credits");
  const allBtn = document.getElementById("all-btn");
  const cseBtn = document.getElementById("cse-btn");
  const wddBtn = document.getElementById("wdd-btn");

  allBtn.addEventListener("click", () => {
    setActiveButton(allBtn);
    displayCourses(courses);
  });

  cseBtn.addEventListener("click", () => {
    setActiveButton(cseBtn);
    const cseFilter = courses.filter((course) => course.code.startsWith("CSE"));
    displayCourses(cseFilter);
  });

  wddBtn.addEventListener("click", () => {
    setActiveButton(wddBtn);
    const wddFilter = courses.filter((course) => course.code.startsWith("WDD"));
    displayCourses(wddFilter);
  });

  function setActiveButton(activeButton) {
    [allBtn, cseBtn, wddBtn].forEach((btn) => {
      btn.classList.remove("active");
    });
    activeButton.classList.add("active");
  }

  function displayCourses(coursesToDisplay) {
    coursesContainer.innerHTML = "";

    coursesToDisplay.forEach((course) => {
      const courseCard = document.createElement("div");
      courseCard.className = `course-card ${
        course.completed ? "completed" : ""
      }`;
      courseCard.textContent = `${course.code} - ${course.name}`;
      coursesContainer.appendChild(courseCard);
    });

    const totalCredits = coursesToDisplay.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    totalCreditsElement.textContent = totalCredits;
  }

  displayCourses(courses);
});
