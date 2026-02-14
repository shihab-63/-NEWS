const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const categorieContainer = document.getElementById("categorie-Container");
const dropWordMenu = document.getElementById("dropdown-menu");
const newsContainer = document.getElementById("newsContainer");
const modalContainer = document.getElementById("modalContainer");
const showModalAll = document.getElementById("my_modal_5");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

dropWordMenu.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});

//! Load Catagory API
const loadCategoryApi = async () => {
  const url = `https://news-api-fs.vercel.app/api/categories`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayCategory(data.categories);
  } catch (error) {
    console.error(error);
  }
};

//? Display Categories
const displayCategory = (categories) => {
  categories.forEach((categorie) => {
    categorieContainer.innerHTML += `
        <li id="${categorie.id}" onclick="addStableColor(event)" class="li-list cursor-pointer hover:text-yellow-400 text-2xl">${categorie.title}</li>
    `;
    // Dropdown menu
    dropWordMenu.innerHTML += `
        <li id="${categorie.id}" onclick="addStableColor(event)" class="li-list cursor-pointer block hover:text-yellow-400 text-center text-2xl py-2">${categorie.title}</li>
    `;
  });
};

//? Color Switching
const addStableColor = (e) => {
  const allLi = document.querySelectorAll(".li-list");
  newsByCategories(e.target.id);
  allLi.forEach((li) => {
    li.classList.remove("text-yellow-400");
  });

  if (e.target.closest("li")) {
    e.target.classList.add("text-yellow-400");
  }
};

//! Load News by Categories
const newsByCategories = async (id) => {
  loadingContainer();
  const url = `https://news-api-fs.vercel.app/api/categories/${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    showError();
  }
};

//? Display News By Categories
const displayNews = (newsByCategories) => {
  if (newsByCategories.length === 0) {
    showEmpty();
    return;
  }
  newsContainer.innerHTML = "";
  newsByCategories.forEach((news) => {
    newsContainer.innerHTML += `
      <div class = "space-y-3 border border-gray-300 h-fit rounded-xl p-4 hover:bg-gray-100 transition-all duration-300">
          <img src="${news.image.srcset[8].url}" class="rounded-xl" alt="${news.image.alt}">
          <h1 class = "text-xl text-justify font-black p-3 rounded-b-lg">${news.title}</h1>
          <p class="text-lg ml-2 text-justify">${news.description ? news.description : ""}</p>
          <div class="flex justify-between items-center">
            <span class="text-lg ml-2 font-bold">${news.time}</span>
            <button id="${news.id}" class="font-bold active:scale-95 cursor-pointer text-red-500"><i class="fa-solid animate-pulse text-green-600 fa-eye"></i> View Details...</button>
          </div>
      </div>
    `;
  });
};

newsContainer.addEventListener("click", (e) => {
  loadModalDetails(e.target.id);
});

// Load Modal Details
const loadModalDetails = async (id) => {
  const url = `https://news-api-fs.vercel.app/api/news/${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayModal(data.article);
  } catch (error) {
    showModalAll.showModal(showModalEmpty);
  }
};

// Display Modal Details
const displayModal = (articles) => {
  console.log(articles);
  modalContainer.innerHTML = `
    <p class="text-lg pb-6">${articles.timestamp}</p>
    <img class="w-full rounded-xl" src="${articles.images[0].url}" alt="">
    <h3 class="text-3xl py-5 text-justify font-bold">${articles.title ? articles.title : "⚠️ Somthing Wrong"}</h3>
    <p class="py-4 text-justify text-lg">${articles.content.join("")}</p>
  `;

  showModalAll.showModal();
};

const loadingContainer = () => {
  newsContainer.innerHTML = `
    <div class="col-span-full text-center" id="loading-container">
        <span class="loading loading-dots w-20 font-normal"></span>
    </div>
  `;
};

const showEmpty = () => {
  newsContainer.innerHTML = `
    <div class="col-span-full text-center">
          <h1 class="text-8xl text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></h1>
          <h2 class="text-2xl">No data Found</h2>
    </div>
  `;
};

const showModalEmpty = () => {
  modalContainer.innerHTML = `
    <div class="col-span-full text-center">
          <h1 class="text-8xl text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></h1>
          <h2 class="text-2xl">No data Found</h2>
    </div>
  `;
};

const showError = () => {
  newsContainer.innerHTML = `
    <div class="col-span-full text-center">
          <h1 class="text-8xl text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></h1>
          <h2 class="text-2xl">No data Found</h2>
    </div>
  `;
};

newsByCategories("main");
loadCategoryApi();
