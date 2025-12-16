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

// Edit card variables
const EditCard = document.querySelector(".edit__card");

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
SectionProfile.addEventListener("click", () => {
    Profile.style.display = "flex";
});

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

    ProfileInfoCards.innerHTML += `
    <div class="user">
        <img src="${localStorage.getItem("profileImage") || "../img/profile.png"}" class="user-img">
        <div class="user-info">
            <p class='user-info-name'>Name: ${localStorage.getItem("username") || "No name"}</p>
            <p class='user-info-email'>Email: ${localStorage.getItem("email") || "No email"}</p>
            <p class='user-info-password'> Password: ${localStorage.getItem("password") || "No password"}</p>
        </div>
    </div>
    `
    
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
        const base64Img = reader.result;
        
        localStorage.setItem("profileImage", base64Img);
        
        ProfileImg.src = base64Img;
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
ProfileInputUsername.value = localStorage.getItem("username");
ProfileInputEmail.value = localStorage.getItem("email");
ProfileInputPassword.value = localStorage.getItem("password");

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

// create card
CreateCard.addEventListener("click", () => {
    ProfileInfoCards.innerHTML += `
    <div class="user">
        <img src="${localStorage.getItem("profileImage") || "../img/profile.png"}" class="user-img">
        <div class="user-info">
            <p class='user-info-name'>Name: ${localStorage.getItem("username") || "No name"}</p>
            <p class='user-info-email'>Email: ${localStorage.getItem("email") || "No email"}</p>
            <p class='user-info-password'> Password: ${localStorage.getItem("password") || "No password"}</p>
        </div>
    </div>
    `
});

// edit card
EditCard.addEventListener("click", () => {
    ProfileInfoCards.innerHTML += `
    <div class="user">
        <img src="${localStorage.getItem("profileImage") || "../img/profile.png"}" class="user-img">
        <div class="user-info">
            <p class='user-info-name'>Name: ${localStorage.getItem("username") || "No name"}</p>
            <p class='user-info-email'>Email: ${localStorage.getItem("email") || "No email"}</p>
            <p class='user-info-password'> Password: ${localStorage.getItem("password") || "No password"}</p>
        </div>
    </div>
    `
});

// search card
SearchCard.addEventListener("input", () => {
    const searchValue = SearchCard.value.toLowerCase();
    const users = document.querySelectorAll(".user");
    users.forEach((user) => {
        const name = user.querySelector(".user-info-name").textContent.toLowerCase();
        if (name.includes(searchValue)) {
            user.style.display = "flex";
        } else {
            user.style.display = "none";
        }
    });
});

// delete card
DeleteCard.addEventListener("click", () => {
    if (SearchCard.value === "") {
        const searchValue = SearchCard.value.toLowerCase();
        const users = document.querySelectorAll(".user");
        users.forEach((user) => {
            const name = user.querySelector(".user-info-name").textContent.toLowerCase();
            if (name.includes(searchValue)) {
                user.style.display = "none";
            }
        });
    }else{
        const user = document.querySelectorAll(".user");
        user.forEach((user) => {
            user.style.display = "none";
        });
    }
});