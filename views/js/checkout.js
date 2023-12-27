// Function to get a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(name)) {
        return JSON.parse(cookie.split('=')[1]);
      }
    }
    return null;
  }
  
  // Retrieve cart data from the cookie when loading another page
  window.addEventListener('load', () => {
    const cartData = getCookie('addcart');
  
    // Check if cartData exists and use it accordingly
    if (cartData) {
      // Use cartData as needed, e.g., displaying items in the cart
      console.log(cartData);
      cartData.forEach(element => {
        let aayush = document.getElementById("Aayush");
    aayush.innerHTML += ` <li class="list-group-item d-flex justify-content-between lh-sm" >
    <div>
   
    <h6 class="my-0">${element.title}</h6>
    <small class="text-body-secondary brief-desc"
        >Lace-Up Smash Sprint Badminton Shoes</small
    >
    </div>
    <span class="text-body-secondary">$${element.price}</span>


    </li>
    `;
      });
    
      // ...
    }
  });
  



