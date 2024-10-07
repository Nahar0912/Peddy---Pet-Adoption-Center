//fetch the categories data
const loadPetsByCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
      .catch((error) => console.log(error));
};

// Fetch All Pets Data 
const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
// Fetch Pets Data By Category
const loadPetsByCategory = (category) => {
  console.log("hiiiii" );
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //sobaike active class remove korao
      // removeActiveClass();
      //id er class k active korao
      // const activeBtn = document.getElementById(`btn-${category}`);
      // activeBtn.classList.add("active");
      displayPets(data.data);
    })
    .catch((error) => console.log(error));
};
  
//Create Display Categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
      console.log(item.category);
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
        <button id="btn-${item.category}" class="btn category-btn btn-lg btn-wide" onclick="loadPetsByCategory('${item.category}')">
        <img src="${item.category_icon}" alt=""><span class="font-bold">${item.category}</span>
        </button>
      `;
      categoryContainer.append(buttonContainer);
    });
};

// Display Pets on Cards
const displayPets = (pets) => {
    const petsContainer = document.getElementById("pets");
    petsContainer.innerHTML = "";
  
    if (pets.length == 0) {
      petsContainer.classList.remove("grid");
      petsContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="../images/error.webp" /> 
        <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
      </div>`;
    } else {
      petsContainer.classList.add("grid");
    }
  
    pets.forEach((pets) => {
      const card = document.createElement("div");
      card.classList = "card card-compact grid grid-cols-3";
      card.innerHTML = `
       <div class="card bg-base-100 w-96 shadow-xl">
        <figure class="px-5 pt-10">
            <img
            src=${pets.image}
            alt="Pets"
            class="rounded-xl" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${pets.pet_name}</h2>
            <p>Breed: ${pets.breed}</p>
            <p>Birth: ${pets.date_of_birth}</p>
            <p>Gender: ${pets.gender}</p>
            <p>Price: ${pets.price}</p>
            <div class="card-actions flex justify-between">
                <button class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                </button>
            <button class="btn text-teal-600 font-bold">Adopt</button>
            <button class="btn text-teal-600 font-bold">Detailes</button>
            </div>
        </div>
        </div>
      `;
      petsContainer.append(card);
    });
  };

loadPetsByCategories();
loadPets();