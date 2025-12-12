// Data for the page
const heroContent = {
  title: "Two Iconic Designer Bags",
  text:
    "My Purse celebrates the history and design of two favorites: " +
    "the Chanel Classic Flap and the Marc Jacobs Stam Satchel."
};

const purses = [
  {
    id: "chanel",
    name: "Chanel Classic Flap",
    brandLogo: "chanellogo.png",
    image: "chanelflap.jpg",
    imageAlt: "Black Chanel Classic Flap bag with chain strap",
    description:
      "The Chanel Classic Flap is known for its quilted leather, leather-woven chain strap, " +
      "and the iconic double-C turn-lock. A timeless purse that can be dressed up or down.",
    linkHref: "chanel.html",
    linkText: "Learn more about the Classic Flap"
  },
  {
    id: "stam",
    name: "Marc Jacobs Stam Satchel",
    brandLogo: "marcjacobslogo.png",
    image: "stam.jpg",
    imageAlt: "Black Marc Jacobs Stam satchel with gold chain",
    description:
      "The Marc Jacobs Stam Satchel features a soft, quilted shape, chunky chain, " +
      "and kiss-lock frame. It became an early-2000s it-bag and is still loved by collectors.",
    linkHref: "stam.html",
    linkText: "Learn more about the Stam Satchel"
  }
];

// Insert hero text
function renderHero() {
  const heroTitleEl = document.getElementById("hero-title");
  const heroTextEl = document.getElementById("hero-text");

  if (!heroTitleEl || !heroTextEl) return;

  heroTitleEl.textContent = heroContent.title;
  heroTextEl.textContent = heroContent.text;
}

// Build purse cards dynamically
function renderPurses() {
  const container = document.getElementById("purse-list");
  if (!container) return;

  purses.forEach((purse) => {
    const article = document.createElement("article");
    article.classList.add("purse-card");

    article.innerHTML = `
      <img
        src="${purse.image}"
        alt="${purse.imageAlt}"
        class="purse-image"
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
      />

      <div class="purse-header">
        <h3 class="purse-title">${purse.name}</h3>
        <img
          src="${purse.brandLogo}"
          alt="${purse.name} brand logo"
          class="brand-logo"
          width="120"
          height="40"
          loading="lazy"
          decoding="async"
        />
      </div>

      <p>${purse.description}</p>

      <a href="${purse.linkHref}" class="more-link">
        ${purse.linkText}
      </a>
    `;

    container.appendChild(article);
  });
}

// Footer year
function setCurrentYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Run when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderPurses();
  setCurrentYear();
});