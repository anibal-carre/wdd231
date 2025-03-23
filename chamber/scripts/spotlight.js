async function fetchChamberMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Error loading data");
    }
    const data = await response.json();
    return data.members.map((member) => ({
      ...member,
      membershipLevel:
        member.membershipLevel === 3
          ? "gold"
          : member.membershipLevel === 2
          ? "silver"
          : "bronze",
      logo: member.image,
      description: member.tagline,
    }));
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
}

async function getRandomSpotlightMembers(count = 3) {
  const chamberMembers = await fetchChamberMembers();

  const eligibleMembers = chamberMembers.filter(
    (member) =>
      member.membershipLevel === "gold" || member.membershipLevel === "silver"
  );

  const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

async function displaySpotlights() {
  const spotlightsContainer = document.getElementById("spotlights-container");
  const spotlightMembers = await getRandomSpotlightMembers();

  spotlightsContainer.innerHTML = "";

  spotlightMembers.forEach((member) => {
    const spotlightCard = document.createElement("div");
    spotlightCard.className = "spotlight-card";

    spotlightCard.innerHTML = `
      <img src="${member.logo}" alt="${
      member.name
    } Logo" class="spotlight-logo">
      <h3 class="spotlight-name">${member.name}</h3>
      <p class="spotlight-description"><em>${member.description}</em></p>
      <span class="spotlight-level ${member.membershipLevel}">
        ${
          member.membershipLevel.charAt(0).toUpperCase() +
          member.membershipLevel.slice(1)
        } Member
      </span>
      <p class="spotlight-info">${member.address}</p>
      <p class="spotlight-info">${member.phone}</p>
      <a href="${
        member.website
      }" class="spotlight-website" target="_blank">Website</a>
    `;

    spotlightsContainer.appendChild(spotlightCard);
  });
}

document.addEventListener("DOMContentLoaded", displaySpotlights);
