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

// REMOVE ACTIVE BUTTON 
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
      btn.classList.remove("bg-teal-100", "text-black", "border", "border-teal-300","rounded-full");
      btn.classList.add("bg-gray-100", "text-gray-600");
    }
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
  