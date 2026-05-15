const cars = [
  {
    id: "swift",
    name: "Maruti Swift",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    rentPerDay: 1499,
    sellPrice: 585000,
    fuel: "Petrol",
    transmission: "Manual",
  },
  {
    id: "creta",
    name: "Hyundai Creta",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    rentPerDay: 2499,
    sellPrice: 1250000,
    fuel: "Diesel",
    transmission: "Automatic",
  },
  {
    id: "nexon",
    name: "Tata Nexon EV",
    image:
      "https://images.unsplash.com/photo-1593941707889-a5bba14938c7?w=600&q=80",
    rentPerDay: 2999,
    sellPrice: 1420000,
    fuel: "Electric",
    transmission: "Automatic",
  },
  {
    id: "city",
    name: "Honda City",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
    rentPerDay: 2199,
    sellPrice: 980000,
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    rentPerDay: 3499,
    sellPrice: 1875000,
    fuel: "Diesel",
    transmission: "Manual",
  },
  {
    id: "thar",
    name: "Mahindra Thar",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    rentPerDay: 3299,
    sellPrice: 1340000,
    fuel: "Diesel",
    transmission: "Manual",
  },
];

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function renderCars(containerId, mode) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const fragment = document.createDocumentFragment();

  cars.forEach((car) => {
    const article = document.createElement("article");
    article.className = "car-card reveal";
    article.dataset.id = car.id;

    const meta = `${car.fuel} · ${car.transmission}`;
    let priceBlock = "";
    let cta = "";

    if (mode === "rent" || mode === "both") {
      const rentLabel =
        mode === "both"
          ? `<span class="price-badge price-badge--rent">Rent ${formatINR(car.rentPerDay)}/day</span>`
          : `<p class="card-price-main">${formatINR(car.rentPerDay)}<span class="per">/ day</span></p>`;
      if (mode === "both") priceBlock += rentLabel;
      else priceBlock = rentLabel;
    }

    if (mode === "sell" || mode === "both") {
      const sellLabel =
        mode === "both"
          ? `<span class="price-badge price-badge--sell">Sell ${formatINR(car.sellPrice)}</span>`
          : `<p class="card-price-main card-price-main--sell">${formatINR(car.sellPrice)}</p>`;
      priceBlock += mode === "both" ? sellLabel : sellLabel;
    }

    if (mode === "rent") {
      cta = `<button type="button" class="btn btn-primary btn-card" data-action="rent" data-car="${car.name}">Book for 1 day</button>`;
    } else if (mode === "sell") {
      cta = `<button type="button" class="btn btn-outline btn-card" data-action="sell" data-car="${car.name}">Enquire</button>`;
    } else {
      cta = `
        <div class="card-actions">
          <button type="button" class="btn btn-primary btn-sm" data-action="rent" data-car="${car.name}">Rent</button>
          <button type="button" class="btn btn-outline btn-sm" data-action="sell" data-car="${car.name}">Enquire</button>
        </div>`;
    }

    const priceClass = mode === "both" ? "card-prices card-prices--dual" : "card-prices";

    article.innerHTML = `
      <div class="card-image-wrap">
        <img src="${car.image}" alt="${car.name}" class="card-image" loading="lazy" width="600" height="380" />
      </div>
      <div class="card-body">
        <h3 class="card-title">${car.name}</h3>
        <p class="card-meta">${meta}</p>
        <div class="${priceClass}">${priceBlock}</div>
        ${cta}
      </div>
    `;

    fragment.appendChild(article);
  });

  container.appendChild(fragment);
}

function handleCardAction(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const car = btn.dataset.car;
  const action = btn.dataset.action;
  if (action === "rent") {
    alert(`Book ${car} for 1 day — call +91 98765 43210 or visit CARS Salem.`);
  } else {
    alert(`Enquire about ${car} — we will contact you at CARS Salem showroom.`);
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById("header")?.offsetHeight ?? 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      document.getElementById("nav")?.classList.remove("open");
      document.getElementById("navToggle")?.setAttribute("aria-expanded", "false");
    });
  });
}

function initNav() {
  const header = document.getElementById("header");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("header--shrink", window.scrollY > 48);
  });

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initForm() {
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    alert(`Thank you, ${name}! CARS Salem will reach you soon.`);
    form.reset();
  });
}

function init() {
  document.getElementById("year").textContent = String(new Date().getFullYear());

  renderCars("featuredGrid", "both");
  renderCars("rentGrid", "rent");
  renderCars("sellGrid", "sell");

  document.body.addEventListener("click", handleCardAction);

  initSmoothScroll();
  initNav();
  initReveal();
  initForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
