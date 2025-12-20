// Api variables
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => showData(data));

// Showdata
function showData(data) {
    ProfileInfoCards.innerHTML = "";

    data.forEach(element => {
        ProfileInfoCards.innerHTML += `
        <div class="card">
            <div class="card__img">
                <img src="${element.image}" alt="" class="card__img-img">
            </div>
            <div class="card__info">
                <p class="card__info-title">${element.title}</p>
                <p class="card__info-category">${element.category}</p>
                <p class="card__info-description">${element.description}</p>
                <p class="card__info-price">$${element.price}</p>
            </div>
        </div>
        `;
    });
}

// Section variables
const SectionWrapper = document.querySelector("section");
const section = document.querySelector(".section");
const sectionLeft = document.querySelector(".section__left");
const sectionRight = document.querySelector(".section__right");
const SectionHide = document.querySelector(".section__button-hide");
const SectionShow = document.querySelector(".section__button-show");
const SectionHome = document.querySelector(".section__button-home");
const SectionLogout = document.querySelector(".section__button-logout");
const SectionProfile = document.querySelector(".section__button-profile");
const LinkBlock = document.querySelector(".link__blok");
const CloseSpline = document.querySelector(".close-spline");

// Create card variables
const CreateCard = document.querySelector(".create__card");

// Delete card variables
const DeleteCard = document.querySelector(".delete__card");

// Update card variables
const UpdateCard = document.querySelector(".edit__card");

// Serch card variables
const SearchCard = document.querySelector("#Search");

// Profile variables
const Profile = document.querySelector(".profile");
const ProfileImg = document.querySelector(".profile__img");
const ProfileInputFile = document.querySelector(".profile__input-file");
const ProfileInputUsername = document.querySelector(".profile__info-username");
const ProfileInputEmail = document.querySelector(".profile__info-email");
const ProfileInputPassword = document.querySelector(".profile__info-password");
const ProfileButtonSave = document.querySelector(".profile__button-save");
const ProfileButtonCancel = document.querySelector(".profile__button-cancel");
const ProfileInfoCards = document.querySelector(".section__right__bottom");

// Save Toast
const ToastSave = document.querySelector("#save");

// Profile show
if (SectionProfile) {
    SectionProfile.addEventListener("click", () => {
        Profile.style.display = "flex";
    });
}


// Profile hide
ProfileButtonCancel.addEventListener("click", () => {
    Profile.style.display = "none";
});

// Profile save
ProfileButtonSave.addEventListener("click", () => {
    localStorage.setItem("username", ProfileInputUsername.value);
    localStorage.setItem("email", ProfileInputEmail.value);
    localStorage.setItem("password", ProfileInputPassword.value);
    Profile.style.display = "none";
    
    ToastSave.style.display = "flex";
    ToastSave.style.transition = "1s ease-in-out";
    ToastSave.style.transform = "translateY(0)";
    ToastSave.style.opacity = "0";
    setTimeout(() => {
        ToastSave.style.transform = "translateY(5%)";
        ToastSave.style.opacity = "1";
    }, 1000);
    setTimeout(() => {
        ToastSave.style.display = "none";
    }, 5000);
});

// Profile input file
ProfileInputFile.addEventListener("change", () => {
    const file = ProfileInputFile.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = () => {
        const img = reader.result;
        
        localStorage.setItem("profileImage", img);
        
        ProfileImg.src = img;
    };
    
    reader.readAsDataURL(file);
});

// Profile imege from local storage
window.addEventListener("DOMContentLoaded", () => {
    const savedImg = localStorage.getItem("profileImage");
    if (savedImg) {
        ProfileImg.src = savedImg;
    }
});

// Profile data
ProfileInputUsername.value = localStorage.getItem("username") || "";
ProfileInputEmail.value = localStorage.getItem("email") || "";
ProfileInputPassword.value = localStorage.getItem("password") || "";


// Section hide
SectionHide.addEventListener("click", () => {
    SectionWrapper.style.display = "none";
    LinkBlock.style.display = "flex";
    CloseSpline.style.display = "block";
});

// Section show
CloseSpline.addEventListener("click", () => {
    SectionWrapper.style.display = "flex";
    LinkBlock.style.display = "none";
    CloseSpline.style.display = "none";
});

// Home button
SectionHome.addEventListener("click", () => {
    localStorage.setItem('password', 'derek');
    localStorage.setItem('username', 'jklg*_56');
    window.location.href = "../index.html";
});

// Logout button
SectionLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("email");
    localStorage.removeItem("profileImage");
    window.location.href = "../index.html";
});

// delete card
DeleteCard.addEventListener("click", () => {
    if (SearchCard.value === "") {
        const cards = document.querySelectorAll(".card"); 
        cards.forEach(card => {
            card.style.display = "none";
        });
    } else {
        const cards = document.querySelectorAll(".card"); 
        cards.forEach(card => {
            const title = card.querySelector(".card__info-title").innerText.toLowerCase();
            card.style.display = title.includes(SearchCard.value) ? "none" : "flex";
        });
    }
});

// search card
SearchCard.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const title = card.querySelector(".card__info-title").innerText.toLowerCase();
        card.style.display = title.includes(value) ? "flex" : "none";
    });
});
