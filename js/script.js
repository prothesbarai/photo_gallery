const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const perPageSelect = document.getElementById("perPageSelect");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxInfo = document.getElementById("lightboxInfo");
const closeBtn = document.getElementById("closeBtn");
const loadingSpinner = document.getElementById("loadingSpinner");

const prothesShreyasi = "aHR0cHM6Ly9wcm90aGVzYmFyYWkuZ2l0aHViLmlvL3Byb3RoZXNiYXJhaS9hc3BfaW1hZ2VfZ2FsbGVyeS8=";
const angkan = atob(prothesShreyasi);

let currentPage = 1;
let perPage = parseInt(perPageSelect.value);
let images = [];


async function loadImages() {
  const res = await fetch("images.json");
  images = await res.json();
  images = images.map(img => ({...img,url: angkan + img.url }));
  showPage();
}


function showPage() {
  gallery.innerHTML = "";
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageImages = images.slice(start, end);

  pageImages.forEach(img => {
    const card = document.createElement("div");
    card.className = "card mb-3 overflow-hidden shadow cursor-pointer"; 
    // Card image
    const image = document.createElement("img");
    image.src = img.url;
    image.alt = img.title;
    image.className = "card-img-top w-100 d-block";
    // Card body for info
    const info = document.createElement("div");
    info.className = "card-body p-2 text-start"; 
    // Title
    const title = document.createElement("h3");
    title.className = "card-title my-1 fs-6 text-dark";
    title.textContent = img.title;
    // Small info
    const smallInfo = document.createElement("p");
    smallInfo.className = "card-text text-muted";
    smallInfo.innerHTML = `<i class="bi bi-folder-fill"></i> ${img.category} |<i class="bi bi-person-fill"></i> ${img.author}`;
    // Append title and info to card-body
    info.appendChild(title);
    info.appendChild(smallInfo);
    // Append image and card-body to card
    card.appendChild(image);
    card.appendChild(info);
    // Click event
    card.addEventListener("click", () => openLightbox(img));
    // Append to gallery
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
    <small><i class="bi bi-folder-fill"></i> ${img.category} | <i class="bi bi-person-fill"></i> <a href="${img.profile}" target="_blank">${img.author}</a> | <i class="bi bi-calendar-fill"></i> ${img.date}</small>`;
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

// Hide loading spinner and initialize gallery when page loads
window.addEventListener('DOMContentLoaded', () => {
  // Simulate loading delay
  setTimeout(() => {
    loadingSpinner.style.display = 'none';
    initGallery();
  }, 800);
});