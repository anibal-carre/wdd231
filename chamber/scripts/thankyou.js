document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const submissionData = document.getElementById("submission-data");

  if (params.toString()) {
    const requiredFields = [
      { param: "first-name", label: "First Name" },
      { param: "last-name", label: "Last Name" },
      { param: "email", label: "Email" },
      { param: "phone", label: "Phone" },
      { param: "business-name", label: "Business Name" },
      { param: "membership", label: "Membership Level" },
      { param: "timestamp", label: "Submission Date/Time" },
    ];

    requiredFields.forEach((field) => {
      if (params.has(field.param)) {
        let value = params.get(field.param);

        if (field.param === "membership") {
          switch (value) {
            case "np":
              value = "Non-Profit Membership";
              break;
            case "bronze":
              value = "Bronze Membership";
              break;
            case "silver":
              value = "Silver Membership";
              break;
            case "gold":
              value = "Gold Membership";
              break;
          }
        }

        if (field.param === "timestamp") {
          const date = new Date(value);
          value = date.toLocaleString();
        }

        const dataItem = document.createElement("div");
        dataItem.className = "data-item";
        dataItem.innerHTML = `
                      <span class="data-label">${field.label}:</span>
                      <span class="data-value">${value}</span>
                  `;

        submissionData.appendChild(dataItem);
      }
    });
  } else {
    submissionData.innerHTML = "<p>No submission data available.</p>";
  }
});
