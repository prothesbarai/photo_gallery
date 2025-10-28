const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let currentPage = 1;
const perPage = 20; // প্রতি পেজে ২০টা ছবি দেখাবে
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
    const imgEl = document.createElement("img");
    imgEl.src = img.url;
    imgEl.alt = img.title;
    gallery.appendChild(imgEl);
  });

  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(images.length / perPage)}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= images.length;
}

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

loadImages();
