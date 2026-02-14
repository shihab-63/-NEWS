// const categoriesContainer = document.getElementById("categoriesContainer");
// const newsContainer = document.getElementById("newsContainer");

// // LoadCategoriesAPI
// const LoadCategoriesAPI = () => {
//   const url = "https://news-api-fs.vercel.app/api/categories";
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       displayCategories(data.categories);
//     });
// };

// // Display Categories
// const displayCategories = (categories) => {
//   categories.forEach((categorie) => {
//     categoriesContainer.innerHTML += `
//        <li id = ${categorie.id} class = "py-2 border-b-4 cursor-pointer border-transparent text-xl hover:border-b-4 hover:border-red-600">${categorie.title}</li>
//     `;
//   });

//   categoriesContainer.addEventListener("click", (e) => {
//     const liClicked = e.target.closest("li");
    
    

//     const allLiElement = categoriesContainer.querySelectorAll("li");
//     allLiElement.forEach((li) => {
//       li.classList.remove("border-transparent");
//       li.classList.remove("border-red-600");
//       li.classList.remove("border-b-4");
//     });
//     liClicked.classList.add("border-b-4");
//     liClicked.classList.add("border-red-600");

//     loadNewsByCategories(e.target.id);
//   });
// };

// // Load News by Categories
// const loadNewsByCategories = (categoriesId) => {
//   const url = `https://news-api-fs.vercel.app/api/categories/${categoriesId}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       displayNewsByCategories(data.articles);
//     });
// };

// // Display News By Categories
// const displayNewsByCategories = (articles) => {
//   newsContainer.innerHTML = "";

//   articles.forEach((article) => {
//     newsContainer.innerHTML += `
//       <div class = "space-y-3">
//         <img src="${article.image.srcset[6].url}" alt="">
//         <h1 class = "text-xl font-bold">${article.title}</h1>
//         <span>${article.time}</span>
//       </div>
//     `;
//   });
// };

// loadNewsByCategories("main");
// LoadCategoriesAPI();
