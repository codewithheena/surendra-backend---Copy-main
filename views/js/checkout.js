let checkoutorderbtn = document.getElementById("checkoutorderbtn");
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
  
// checkoutorderbtn.addEventListener("click", () => {
//   alert("your order has been placed succesfully, Thank You ")
// });
  
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
  

document.getElementById("checkoutorderbtn").addEventListener("click", function () {
    // Check if the required form fields are filled out
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var username = document.getElementById("username").value;
    var address = document.getElementById("address").value;
    var country = document.getElementById("country").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var ccName = document.getElementById("cc-name").value;
    var ccNumber = document.getElementById("cc-number").value;
    var ccExpiration = document.getElementById("cc-expiration").value;
    var ccCvv = document.getElementById("cc-cvv").value;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !address ||
      !country ||
      !state ||
      !zip ||
      !ccName ||
      !ccNumber ||
      !ccExpiration ||
      !ccCvv
    ) {
      // Display an error message if any required field is empty
      alert("Please fill out all required fields.");
    } else {
      // Proceed with the checkout process
      alert("Checkout successful!");
      // You can submit the form or redirect the user to the next step here
      // document.getElementById('checkoutForm').submit();
    }
  });

