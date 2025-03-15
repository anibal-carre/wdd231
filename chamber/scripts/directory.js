const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");
const directoryContainer = document.getElementById("directory-container");

gridBtn.addEventListener("click", () => {
  directoryContainer.classList.add("grid");
  directoryContainer.classList.remove("list");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  directoryContainer.classList.add("list");
  directoryContainer.classList.remove("grid");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Failed to fetch member data");
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error:", error);
    directoryContainer.innerHTML = `<p class="error">Failed to load member data. Please try again later.</p>`;
  }
}

function displayMembers(members) {
  directoryContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("card");

    let membershipText = "";
    let membershipClass = "";

    switch (member.membershipLevel) {
      case 3:
        membershipText = "Gold Member";
        membershipClass = "gold";
        break;
      case 2:
        membershipText = "Silver Member";
        membershipClass = "silver";
        break;
      case 1:
      default:
        membershipText = "Bronze Member";
        membershipClass = "bronze";
    }

    card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">
            <div class="card-content">
                <div>
                    <h2>${member.name}</h2>
                    <p class="tagline">${member.tagline}</p>
                </div>
                <div class="contact-info">
                    <p><i class="fas fa-envelope"></i> ${member.email}</p>
                    <p><i class="fas fa-phone"></i> ${member.phone}</p>
                    <p><i class="fas fa-globe"></i> <a href="${member.website}" target="_blank">Website</a></p>
                    <p><i class="fas fa-map-marker-alt"></i> ${member.address}</p>
                </div>
                <div class="membership ${membershipClass}">${membershipText}</div>
            </div>
        `;

    directoryContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", getMembers);
