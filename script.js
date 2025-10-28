const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const perPageSelect = document.getElementById("perPageSelect");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxInfo = document.getElementById("lightboxInfo");
const closeBtn = document.getElementById("closeBtn");

let currentPage = 1;
let perPage = parseInt(perPageSelect.value);
let images = [];

async function loadImages() {
  const res = await fetch("images.json");
  images = await res.json();
  showPage();
}

function showPage() {
  gallery.innerHTML = "";
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageImages = images.slice(start, end);

  pageImages.forEach(img => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${img.url}" alt="${img.title}">
      <div class="info">
        <h3>${img.title}</h3>
        <small>📂 ${img.category} | ✍️ ${img.author}</small>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(img));
    gallery.appendChild(card);
  });

  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(images.length / perPage)}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= images.length;
}

function openLightbox(img) {
  lightboxImg.src = img.url;
  lightboxInfo.innerHTML = `
    <h2>${img.title}</h2>
    <p>${img.description}</p>
    <small>📂 ${img.category} | ✍️ <a href="${img.profile}" target="_blank">${img.author}</a> |🗓️ ${img.date}</small>

  `;
  lightbox.style.display = "flex";
}

closeBtn.addEventListener("click", () => (lightbox.style.display = "none"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showPage();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage * perPage < images.length) {
    currentPage++;
    showPage();
  }
});

perPageSelect.addEventListener("change", (e) => {
  perPage = parseInt(e.target.value);
  currentPage = 1;
  showPage();
});

loadImages();
