document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-product-form");
    form.addEventListener("submit", addProduct);
    fetchProducts();
});

const apiKey = "bfbd898c82d14a3cbdb1261cec8cf049"; 

function fetchProducts() {
    axios.get(`https://crudcrud.com/api/${apiKey}/products`)
        .then((response) => {
            const products = response.data;
            displayProducts(products);
        })
        .catch((error) => console.log("Error fetching products:", error));
}

function displayProducts(products) {
    const electronicsItems = document.getElementById("electronics-items");
    const foodItems = document.getElementById("food-items");
    const skincareItems = document.getElementById("skincare-items");

    electronicsItems.innerHTML = "<h2>Electronic Items</h2>";
    foodItems.innerHTML = "<h2>Food Items</h2>";
    skincareItems.innerHTML = "<h2>Skincare Items</h2>";

    products.forEach((product) => {
        const listItem = document.createElement("div");
        listItem.classList.add("product-item");
        listItem.textContent = `${product.price} - ${product.category} - ${product.name}`;

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete Order";
        deleteButton.addEventListener("click", () => deleteProduct(product._id));

        listItem.appendChild(deleteButton);

        if (product.category === "Electronics") {
            electronicsItems.appendChild(listItem);
        } else if (product.category === "Food") {
            foodItems.appendChild(listItem);
        } else if (product.category === "Skincare") {
            skincareItems.appendChild(listItem);
        }
    });
}

function addProduct(event) {
    event.preventDefault();

    const form = event.target;
    const product = {
        price: form.price.value,
        name: form.name.value,
        category: form.category.value
    };

    console.log("Adding product:", product); 

    axios.post(`https://crudcrud.com/api/${apiKey}/products`, product)
        .then((response) => {
            console.log("Product added successfully:", response.data);
            form.reset();
            fetchProducts(); 
        })
        .catch((error) => console.log("Error adding product:", error));
}

function deleteProduct(productId) {
    axios.delete(`https://crudcrud.com/api/${apiKey}/products/${productId}`)
        .then(() => {
            console.log("Product deleted successfully:", productId);
            fetchProducts(); 
        })
        .catch((error) => console.log("Error deleting product:", error));
}
