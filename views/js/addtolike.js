// let productdiv = document.querySelector(".product-items-container");
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
  const totalElement = document.getElementById("total");
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
  } else {
    // Render each item in the cart
    likecart.forEach((item, index) => {
      console.log(item);
      // let likingcart = document.getElementById('addingtothecart');
      let likingcartitem = document.createElement("div");
      likingcartitem.classList.add("box");
      likingcartitem.innerHTML += `
          <i class="ri-close-line close-icon"></i>
          <img src=${item.image}>
            <div class="content">
              <h3>${item.title}</h3>
              <span class="quantity">1</span>
              <span class="multiply">x</span>
              <span class="price">${item.price}rs</span>
              <i class="fa-solid fa-trash" onclick="removeFromlikeCart(${index})"></i>
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


