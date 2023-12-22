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
                                  <img src=${element.image} alt="">
                                  <span>${element.title}</span>
                                    <div class="rating-price">
                                        <div class="rating">
                                          <i class="ri-star-fill"></i><i   class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>
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
        renderCart();
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

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
