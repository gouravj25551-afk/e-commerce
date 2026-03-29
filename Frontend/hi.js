document.addEventListener("DOMContentLoaded", function () {

  // 🔗 Elements
  const productsContainer = document.getElementById("productsContainer");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortOption = document.getElementById("sortOption");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  let allProducts = [];

  // 🔥 Fetch Products
  async function fetchProducts() {
    try {
      loading.style.display = "block";

      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      allProducts = data;

      displayProducts(allProducts);

      loading.style.display = "none";
    } catch (err) {
      error.textContent = "Failed to load products!";
      loading.style.display = "none";
    }
  }

  // 🛒 Display Products
  function displayProducts(products) {
    productsContainer.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
      let product = products[i];

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML =
        "<img src='" + product.image + "'>" +
        "<h3>" + product.title.slice(0, 40) + "...</h3>" +
        "<p>₹ " + product.price + "</p>" +
        "<div>⭐ " + product.rating.rate + "</div>";

      productsContainer.appendChild(card);
    }
  }

  // 🔍 Search
  searchInput.addEventListener("input", applyFilters);

  // 🔽 Filter
  categoryFilter.addEventListener("change", applyFilters);

  // 🔼 Sort
  sortOption.addEventListener("change", applyFilters);

  // 🧠 Apply Filters
  function applyFilters() {
    let filtered = [];

    let searchValue = searchInput.value.toLowerCase();

    for (let i = 0; i < allProducts.length; i++) {
      let product = allProducts[i];

      // 🔍 Search check
      if (!product.title.toLowerCase().includes(searchValue)) {
        continue;
      }

      // 🔽 Category check
      if (categoryFilter.value !== "all") {
        if (product.category !== categoryFilter.value) {
          continue;
        }
      }

      // pass ho gaya → add karo
      filtered.push(product);
    }

    // 🔼 Sorting
    if (sortOption.value === "low-high") {
      filtered.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (sortOption.value === "high-low") {
      filtered.sort(function (a, b) {
        return b.price - a.price;
      });
    }

    displayProducts(filtered);
  }

  // 🚀 Start
  fetchProducts();

});