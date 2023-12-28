let productdiv = document.querySelector(".product-items-container");
let addcart = [];
let cartbtn = document.getElementById("cartbtn");

let categorylist = document.querySelector(".category");
let allCat = [];
let displayproduct = async (allcheckcat = []) => {
  // categorylist.innerHTML = '';
  productdiv.innerHTML = "";
  // let product = await fetch("https://fakestoreapi.com/products");
  let product = await fetch("allproduct-list.json");
  let finalproduct = await product.json();
  const sortSelect = document.getElementById("sort-select");
  const selectedSort = sortSelect.value;
  console.log(selectedSort.value);

  // Sort the products based on the selected criteria
  if (selectedSort === "Default") {
    
  } else if (selectedSort === "price-low-to-high") {
    finalproduct.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price-high-to-low") {
    finalproduct.sort((a, b) => b.price - a.price);
  }
  finalproduct.forEach((element) => {
    if (!allCat.includes(element.category)) {
      categorylist.innerHTML += `<label for=""><input type="checkbox" onclick='categoryfilter()' value="${element.category}" id="checkicon">${element.category}</label>`;
      allCat.push(element.category);
    }

    if (allcheckcat.length == 0) {
      allcheckcat = allCat;
    }
    if (allcheckcat.includes(element.category)) {
      productdiv.innerHTML += ` <div class="product-div">
                                   <a href="/productpage?id=${
                                     element.id
                                   }"><img src=${element.image} alt=""></a>
                                  <span>${element.title}</span>
                                    <div class="rating-price">
                                        <div class="rating">
                                          
                                        </div>
                                       
                  
                                        <div class="product-div-price">
                                        ${element.price + " Rs"}
                                        </div>   
                                        </div>
                                        <div class="cart-like">
                                        <button onclick='addtolike(${
                                          element.id
                                        })'class="cart-like-btn" id="likebtn" > <i class="ri-heart-line"></i></button>

                                        <button onclick='addtocart(${
                                          element.id
                                        })' class="cart-like-btn" id="cartbtn">  <i class="ri-shopping-cart-2-fill"></i></button>
                                       
                                        
                                        </div>
                                    
                                </div>`;
    }
  });
};






document.addEventListener("DOMContentLoaded", function () {
  const sortSelect = document.getElementById("sort-select");

  sortSelect.addEventListener("change", () => {
    displayproduct();
  });

  // ... existing code ...
});


















let categoryfilter = () => {
  let checkinput = document.querySelectorAll("#checkicon");
  let checkdata = [];
  checkinput.forEach((e) => {
    if (e.checked) {
      checkdata.push(e.value);
    }
  });

  displayproduct(checkdata);
};

function addtocart(productId) {
  fetch("allproduct-list.json")
    .then((response) => response.json())
    .then((data) => {
      const selectedProduct = data.find((product) => product.id === productId);

      // Check if the product is already in the cart
      const existingProductIndex = addcart.findIndex(
        (item) => item.id === selectedProduct.id
      );

      if (existingProductIndex !== -1) {
        // Product already in the cart
        // You can update the quantity or take other actions
        alert("Product already in the cart");
      } else {
        // Product not in the cart, add it
        // addcart = [];
        addcart.push(selectedProduct);

        // Update the UI to display the cart items
        setCookie('addcart', addcart, 7);
        renderCart();
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// function updateCartCookie() {
//   setCookie('addcart', addcart, 7); // Save cart in a cookie with 7 days expiration
// }

function getCookie(name) {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(name)) {
      return JSON.parse(cookie.split('=')[1]);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${JSON.stringify(value)};expires=${expires};path=/`;
}

// Retrieve cart data from the cookie when loading the page
window.addEventListener('load', () => {
  const cartData = getCookie('addcart');

  // Check if cartData exists and update the addcart variable accordingly
  if (cartData) {
    addcart = cartData;
    renderCart(); // Update the cart UI when the page loads
  }
});

























// document.getElementById("total").innerHTML = "";
function renderCart() {
  const totalElement = document.getElementById("total");
  document.getElementById("count").innerHTML = addcart.length;
  
  
  let shoppingcart = document.getElementById("addingtothecart");
  if (!shoppingcart) return;

  // Clear existing content
  shoppingcart.innerHTML = "";
  let total = 0;
  // debugger
  if (addcart.length === 0) {
    // If the cart is empty, display a message
    shoppingcart.textContent = "Your cart is empty";
    shoppingcart.style.fontSize = "3rem";
  } else {
    // Render each item in the cart
    addcart.forEach((item, index) => {
      console.log(item);
      // let shoppingcart = document.getElementById('addingtothecart');
      let shoppingcartitem = document.createElement("div");
      shoppingcartitem.classList.add("box");
      shoppingcartitem.innerHTML += `
          <i class="ri-close-line close-icon"onclick="removeFromCart(${index})"></i>
          <img src=${item.image}>
            <div class="content">
              <h3>${item.title}</h3>
              <span class="quantity">1</span>
              <span class="multiply">x</span>
              <span class="price">${item.price}rs</span>
              <i class="fa-solid fa-trash" ></i>
            </div>`;
      console.log(item.image);
      shoppingcart.appendChild(shoppingcartitem);
      total += item.price;
    });
  }
  totalElement.textContent = `${total} rs`;
}
function removeFromCart(index) {
  addcart.splice(index, 1);
  renderCart();
  setCookie('addcart', addcart, 7);
}

let likecart = [];
let likebtn = document.getElementById("like-btn");

function addtolike(productId) {
  fetch("allproduct-list.json")
    .then((response) => response.json())
    .then((data) => {
      const selectedProduct = data.find((product) => product.id === productId);

      // Check if the product is already in the cart
      const existingProductIndex = likecart.findIndex(
        (item) => item.id === selectedProduct.id
      );

      if (existingProductIndex !== -1) {
        // Product already in the cart
        // You can update the quantity or take other actions
        alert("Product already in the cart");
      } else {
        // Product not in the cart, add it
        // likecart = [];
        likecart.push(selectedProduct);

        // Update the UI to display the cart items
        renderlikeCart();
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// document.getElementById("total").innerHTML = "";
function renderlikeCart() {
  const totalElement = document.getElementById("liketotal");
  document.getElementById("likecount").innerHTML = likecart.length;
  let likingcart = document.getElementById("addingtothelikecart");
  if (!likingcart) return;

  // Clear existing content
  likingcart.innerHTML = "";
  let total = 0;
  // debugger
  if (likecart.length === 0) {
    // If the cart is empty, display a message
    likingcart.textContent = "Your cart is empty";
    likingcart.style.fontSize = "4rem";

  } else {
    // Render each item in the cart
    likecart.forEach((item, index) => {
      console.log(item);
      // let likingcart = document.getElementById('addingtothecart');
      let likingcartitem = document.createElement("div");
      likingcartitem.classList.add("box");
      likingcartitem.innerHTML += `
          <i class="ri-close-line close-icon" onclick="removeFromlikeCart(${index})" ></i>
          <img src=${item.image}>
            <div class="content">
              <h3>${item.title}</h3>
              <span class="quantity">1</span>
              <span class="multiply">x</span>
              <span class="price">${item.price}rs</span>
              
            </div>`;
      console.log(item.image);
      likingcart.appendChild(likingcartitem);
      total += item.price;
    });
  }
  totalElement.textContent = `${total}`;
}
function removeFromlikeCart(index) {
  likecart.splice(index, 1);
  renderlikeCart();
}
displayproduct();
