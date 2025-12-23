// API base
const API_URL = 'https://fakestoreapi.com/products';

// DOM elements
const ProfileInfoCards = document.querySelector(".section__right__bottom");
const createBtn = document.querySelector(".create__card");
const modal = document.getElementById("productModal");
const modalClose = document.querySelector(".modal-close");
const productForm = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");
const submitBtn = document.getElementById("submitBtn");
const productIdInput = document.getElementById("productId");
const Profile = document.querySelector(".section__button-profile");
const Logout = document.querySelector(".section__button-logout");
const Home = document.querySelector(".section__button-home");
const profile = document.querySelector(".profile");
const img = document.querySelector(".profile__img");
const imgfile = document.querySelector(".profile__input-file");
const profileusername = document.querySelector('profile__info-username');
const profileemail = document.querySelector('profile__info-email');
const profilepassword = document.querySelector('profile__info-password');
const profileClose = document.querySelector('.profile__button-cancel');
const profileSave = document.querySelector('.profile__button-save');


Home.addEventListener("click", () => {
    window.location.href = "../index.html";
    localStorage.setItem('password', 'derek');
    localStorage.setItem('username', 'jklg*_56');
});

Logout.addEventListener("click", () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    window.location.href = "../index.html";
});

Profile.addEventListener("click", () => {
    profile.style.display = "flex";
});

profileClose.addEventListener("click", () => {
    profile.style.display = "none";
});

imgfile.addEventListener("change", () => {
    const file = imgfile.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

profileSave.addEventListener("click", () => {
    profile.style.display = "none";
});

// Fetch and display products
async function loadProducts() {
    ProfileInfoCards.innerHTML = "<p class='loading'>Loading...</p>";
    const loading = document.querySelector(".loading");
    loading.style.color = "red";
    loading.style.fontSize = "20px";
    loading.style.textAlign = "center";
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        showData(data);
    } catch (error) {
        ProfileInfoCards.innerHTML = "<p class='error'>Error loading products</p>";
        const errorElement = document.querySelector(".error");
        errorElement.style.color = "red";
        errorElement.style.fontSize = "20px";
        errorElement.style.textAlign = "center";
        console.error(error);
    }
}

function showData(data) {
    ProfileInfoCards.innerHTML = "";

    data.forEach(product => {
        createProductCard(product);
    });

    attachEventListeners();
}



function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card__img">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="card__info">
            <p class="card__info-title">${product.title}</p>
            <p class="card__info-category">${product.category}</p>
            <p class="card__info-description">${product.description}</p>
            <p class="card__info-price">$${product.price}</p>
        </div>
        <div class="card__actions">
            <button class="edit-btn" data-id="${product.id}">Edit</button>
            <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>
    `;
    ProfileInfoCards.appendChild(card);
    return card;
}

function updateProductCard(product) {
    const card = document.querySelector(`.edit-btn[data-id="${product.id}"]`).closest('.card');
    if (card) {
        card.innerHTML = `
            <div class="card__img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="card__info">
                <p class="card__info-title">${product.title}</p>
                <p class="card__info-category">${product.category}</p>
                <p class="card__info-description">${product.description}</p>
                <p class="card__info-price">$${product.price}</p>
            </div>
            <div class="card__actions">
                <button class="edit-btn" data-id="${product.id}">Edit</button>
                <button class="delete-btn" data-id="${product.id}">Delete</button>
            </div>
        `;
    }
}

function attachEventListeners() {
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => openEditModal(parseInt(btn.dataset.id)));
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => deleteProduct(parseInt(btn.dataset.id)));
    });
}

// Create tugmasi
createBtn.addEventListener("click", () => {
    modalTitle.textContent = "Create New Product";
    submitBtn.textContent = "Create";
    productForm.reset();
    productIdInput.value = "";
    modal.style.display = "flex";
});

// Modal yopish
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

// Forma submit
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        title: document.getElementById("title").value,
        price: parseFloat(document.getElementById("price").value),
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        image: document.getElementById("image").value
    };

    const id = productIdInput.value;

    try {
        let response;
        if (id) {
            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });
            const updatedProduct = await response.json();
            updateProductCard(updatedProduct);
            attachEventListeners(); 
        } else {
            response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });
            const newProduct = await response.json();
            createProductCard(newProduct);
            attachEventListeners();
        }

        modal.style.display = "none";
        showToast("Saved successfully!");
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Edit modal ochish
async function openEditModal(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const product = await response.json();

        modalTitle.textContent = "Edit Product";
        submitBtn.textContent = "Update";

        productIdInput.value = product.id;
        document.getElementById("title").value = product.title;
        document.getElementById("price").value = product.price;
        document.getElementById("description").value = product.description;
        document.getElementById("category").value = product.category;
        document.getElementById("image").value = product.image;

        modal.style.display = "flex";
    } catch (error) {
        alert("Error loading product");
    }
}

// Delete product
async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const card = document.querySelector(`.delete-btn[data-id="${id}"]`).closest('.card');
        if (card) {
            card.remove();
        }
        showToast("Deleted successfully!");
    } catch (error) {
        alert("Error deleting product");
    }
}

// Toast funksiyasi (agar yo'q bo'lsa)
function showToast(message) {
    const toast = document.getElementById("save");
    toast.textContent = message;
    toast.style.display = "flex";
    toast.style.opacity = "1";
    toast.style.transform = "translateY(5%)";
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(0)";
        setTimeout(() => toast.style.display = "none", 500);
    }, 3000);
}

document.getElementById("Search").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        const title = card.querySelector(".card__info-title").innerText.toLowerCase();
        card.style.display = title.includes(value) ? "flex" : "none";
    });
});

loadProducts();