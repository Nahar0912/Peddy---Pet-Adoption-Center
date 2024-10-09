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


//Create Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category}" class="btn category-btn btn-lg btn-wide bg-gray-100 text-gray-600" onclick="loadPetsByCategory('${item.category}')">
        <img src="${item.category_icon}" alt=""><span class="font-bold">${item.category}</span>
      </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};


// Spinner Toggle Function
const toggleSpinner = (show) => {
  const spinner = document.getElementById("spinner");
  const petsContainer = document.getElementById("pets");
  const likedPetsBox = document.getElementById("likedPetsBox");
  
  if (show) {
    spinner.classList.remove("hidden");
    spinner.classList.add("flex");
    petsContainer.classList.add("hidden");
    likedPetsBox.classList.add("hidden");  
  } else {
    spinner.classList.add("hidden");
    petsContainer.classList.remove("hidden");
    likedPetsBox.classList.remove("hidden"); 
  }
};

// Sort by Price button in descending order
document.getElementById("sort-price-btn").addEventListener("click", () => {
  toggleSpinner(true); 
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      const sortedPets = data.pets.sort((a, b) => b.price - a.price); 
      toggleSpinner(false); 
      displayPets(sortedPets); 
    })
    .catch((error) => {
      console.log(error);
      toggleSpinner(false); 
    });
});

// Fetch Pets Data By Category
const loadPetsByCategory = (category) => {
  toggleSpinner(true); 

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      toggleSpinner(false); 
      displayPets(data.data);
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${category}`);
      activeBtn.classList.add("bg-teal-100", "text-black", "border", "border-teal-300");
      activeBtn.classList.remove("bg-gray-100", "text-gray-600");
    })
    .catch((error) => {
      toggleSpinner(false); 
      console.error(error);
    });
};

// REMOVE ACTIVE BUTTON 
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("bg-teal-100", "text-black", "border", "border-teal-300");
    btn.classList.add("bg-gray-100", "text-gray-600");
  }
};


//<-------Deatails In the MODAL-------->
const loadDetails = async (Id) => {
  try {
    console.log(Id);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${Id}`;
    const res = await fetch(uri);
    if (!res.ok) {
      throw new Error(`Failed to fetch details for pet with ID: ${Id}`);
    }
    const data = await res.json();
    displayDetailsOfPets(data.petData);
  } catch (error) {
    console.error("Error loading pet details:", error);
  }
};
const displayDetailsOfPets = (petData) => {
  const modal = document.getElementById("pet-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.getElementById("modal-image").src = petData.image;
  document.getElementById("modal-name").innerText = petData.pet_name;
  document.getElementById("modal-details").innerText = petData.pet_details;
  document.getElementById("modal-price").innerText = `$ Price: ${petData.price}`;
  document.getElementById("modal-breed").innerText = `Breed: ${petData.breed}`;
  document.getElementById("modal-dob").innerText = `Date of Birth: ${petData.date_of_birth}`;
  document.getElementById("modal-gender").innerText = `Gender: ${petData.gender}`;
  document.getElementById("modal-vaccination").innerText = `Vaccination Status: ${petData.vaccinated_status}`;
  document.getElementById("close-modal").addEventListener("click", () => {
    const modal = document.getElementById("pet-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });
};



// Display Pets on Cards----->
const displayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = "";

  // No Content Found  
  if (pets.length === 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="../images/error.webp" alt="No Content" /> 
        <h2 class="text-center text-xl font-bold"> No Content Here in this Category </h2> 
      </div>`;
    document.getElementById("likedPetsBox").classList.add("hidden");  // Hide liked box when no content found
  } else {
    petsContainer.classList.add("grid");
    document.getElementById("likedPetsBox").classList.remove("hidden");  // Show liked box
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
     <div class="card bg-base-100 border shadow-xl">
      <figure class="px-5 pt-10">
          <img src=${pet.image} alt="Pet" class="rounded-xl" />
      </figure>
      <div class="card-body">
          <h2 class="card-title">${pet.pet_name}</h2>
          <p>Breed: ${pet.breed}</p>
          <p>Birth: ${pet.date_of_birth}</p>
          <p>Gender: ${pet.gender}</p>
          <p>Price: ${pet.price}</p>
          <div class="card-actions flex justify-between">
              <button class="btn font-bold" onclick="likedPet('${pet.image}')">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                  </svg>
              </button>
              <button class="btn text-teal-600 font-bold adopt-button" onclick="adoptPet(this)">Adopt</button>
              <button class="btn text-teal-600 font-bold" onclick="loadDetails(${pet.petId})">Details</button>
          </div>
      </div>
      </div>
    `;
    petsContainer.append(card);
  });
};

// Function to show the countdown modal and update the button text
const adoptPet = (button) => {
  const modal = document.getElementById("my_modal_2");
  const countdownDisplay = document.getElementById("countdown");
  modal.showModal();

  let countdown = 3;
  const countdownInterval = setInterval(() => {
    countdownDisplay.innerText = countdown; 
    countdown--;
    if (countdown < 0) {
      clearInterval(countdownInterval); 
      button.innerText = "Adopted";
      button.classList = "btn btn-disabled"
      modal.close(); 
    }
  }, 1000);
};


// Display pets on LIKE box
const likedPets = [];
const likedPet = (image) => {
  if (likedPets.includes(image)) {
    return;
  }
  likedPets.push(image);

  const likedPetsContainer = document.getElementById("likedPets");
  const likedPetItem = document.createElement("div");
  likedPetItem.classList.add("flex", "items-center", "gap-2");
  likedPetItem.innerHTML = `<img src="${image}" alt="" class="w-20 h-20 rounded-md">`;

  likedPetsContainer.append(likedPetItem);
};

loadPetsByCategories();
loadPets();