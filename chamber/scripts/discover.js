document.addEventListener("DOMContentLoaded", () => {
  trackLastVisit();

  loadAttractions();
});

function trackLastVisit() {
  const visitMessage = document.getElementById("visit-message");
  const currentDate = Date.now();

  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const daysSinceLastVisit = Math.floor(
      (currentDate - Number.parseInt(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastVisit < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayText = daysSinceLastVisit === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentDate);
}

async function loadAttractions() {
  try {
    const attractions = [
      {
        name: "Sankore Mosque",
        address: "Old Town District, Ecowanderer, Mali",
        description:
          "A historic mosque and center of Islamic learning dating back to the 14th century. The distinctive mud-brick architecture showcases traditional Sudano-Sahelian design.",
        image: "images/discover/sankore.png",
      },
      {
        name: "Desert Oasis Gardens",
        address: "45 Palm Avenue, Ecowanderer, Mali",
        description:
          "A lush green sanctuary in the midst of the desert, featuring indigenous plants, water features, and shaded rest areas. Perfect for relaxation and nature appreciation.",
        image: "images/discover/desert-garden.png",
      },
      {
        name: "Ecowanderer Cultural Museum",
        address: "78 Heritage Road, Ecowanderer, Mali",
        description:
          "Explore the rich cultural heritage of Mali through artifacts, textiles, and interactive exhibits. Regular demonstrations of traditional crafts and music performances.",
        image: "images/discover/museum.png",
      },
      {
        name: "Sahara Market",
        address: "120 Trade Street, Ecowanderer, Mali",
        description:
          "The bustling heart of commerce in Ecowanderer, where local artisans sell handcrafted goods, textiles, spices, and fresh produce. Experience the vibrant atmosphere of a traditional West African market.",
        image: "images/discover/sahara-market.png",
      },
      {
        name: "Ancient Salt Caravan Route",
        address: "Northern Desert Trail, Ecowanderer, Mali",
        description:
          "Walk in the footsteps of ancient traders on this historic route once used to transport salt across the Sahara. Guided tours available with stories of the region's trading history.",
        image: "images/discover/sahara.png",
      },
      {
        name: "Riverside Arts District",
        address: "25 Niger Bend Road, Ecowanderer, Mali",
        description:
          "A vibrant community of artists and craftspeople along the river. Visit studios, galleries, and workshops to see traditional and contemporary Malian arts being created.",
        image: "images/discover/river-arts.png",
      },
      {
        name: "Ecowanderer Botanical Gardens",
        address: "90 Science Avenue, Ecowanderer, Mali",
        description:
          "Discover the unique plant life of the Sahel region in these beautiful gardens. Educational exhibits on desert ecology and sustainable agriculture practices.",
        image: "images/discover/botanical-gardens.png",
      },
      {
        name: "Sunset Dune Overlook",
        address: "Desert Edge Road, Ecowanderer, Mali",
        description:
          "The perfect spot to witness breathtaking Saharan sunsets. A viewing platform offers panoramic vistas of the golden dunes and the city below.",
        image: "images/discover/sunset.png",
      },
    ];

    displayAttractions(attractions);
  } catch (error) {
    console.error("Error loading attractions:", error);
    document.getElementById("discover-grid").innerHTML =
      '<p class="error">Error loading attractions. Please try again later.</p>';
  }
}

function displayAttractions(attractions) {
  const grid = document.getElementById("discover-grid");
  grid.innerHTML = "";

  attractions.forEach((attraction) => {
    const card = document.createElement("div");
    card.className = "discover-card";

    card.innerHTML = `
              <figure>
                  <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
              </figure>
              <div class="discover-card-content">
                  <h2>${attraction.name}</h2>
                  <address>${attraction.address}</address>
                  <p>${attraction.description}</p>
                  <button class="learn-more-btn">Learn More</button>
              </div>
          `;

    grid.appendChild(card);
  });

  document.querySelectorAll(".learn-more-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const cardTitle =
        this.closest(".discover-card").querySelector("h2").textContent;
      alert(`More information about ${cardTitle} coming soon!`);
    });
  });
}
