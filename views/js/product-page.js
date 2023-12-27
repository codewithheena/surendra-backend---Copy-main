

//Single product description
var ProductImg = document.getElementById("ProductImg");
let productaddtocartbtn=document.getElementById('productaddtocartbtn');
var SmallImg = document.getElementsByClassName("small-img");
let addcart=[];

SmallImg[0].onclick = function()
{
   ProductImg.src = SmallImg[0].src;
}

SmallImg[1].onclick = function()
{   
   ProductImg.src = SmallImg[1].src;
}

SmallImg[2].onclick = function()
{
   ProductImg.src = SmallImg[2].src;
}
SmallImg[3].onclick = function()
{
   ProductImg.src = SmallImg[3].src;
}




// Extract product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Check if productId is not null and fetch product details
if (productId) {
    displayProductDetails(productId);
}

// Function to display product details
async function displayProductDetails(productId) {
    // Fetch product details using the productId
    let product = await fetch("allproduct-list.json").then((response) => response.json());
    const selectedProduct = product.find((product) => product.id === parseInt(productId));

    // Display product details on the page
    // Modify this part according to your HTML structure
    document.getElementById("shoe-heading").innerText = selectedProduct.category;
    document.getElementById("producttitle").innerText = selectedProduct.title;
    document.getElementById("productprice").innerText = selectedProduct.price*100+" Rs";
    document.getElementById("productdetails").innerText = selectedProduct.description;
  document.getElementById("ProductImg").src = selectedProduct.image;
  document.getElementById("si1").src = selectedProduct.smallimage1;
  document.getElementById("si2").src = selectedProduct.smallimage2;
  document.getElementById("si3").src = selectedProduct.smallimage3;
  document.getElementById("si4").src = selectedProduct.image;

  
    // Add other details as needed
    productaddtocartbtn.addEventListener('click', function() {
      // Call the addtocart function with the selected product ID
      addtocart(selectedProduct.id);
  });
}




// ... Other code ...

// Get the "Add to Cart" button element
// let productaddtocartbtn = document.getElementById('productaddtocartbtn');

// Add a click event listener to the "Add to Cart" button


// ... Other code ...

function addtocart(productId) {
    fetch("allproduct-list.json") // change
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
                addcart.push(selectedProduct);

                // Update the UI to display the cart items
                renderCart();
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// ... Other code ...
function renderCart() {
  const totalElement = document.getElementById("total");
  document.getElementById("count").innerHTML = addcart.length;
  
  
  let shoppingcart = document.getElementById("addingtotheproductcart");
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