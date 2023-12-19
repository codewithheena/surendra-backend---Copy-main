let productdiv = document.querySelector(".product-items-container");

let categorylist = document.querySelector(".category");
let allCat = [];
let displayproduct = async (allcheckcat=[]) => {
  // categorylist.innerHTML = '';
  productdiv.innerHTML = "";
  let product = await fetch("https://fakestoreapi.com/products");
  let finalproduct = await product.json();
  finalproduct.forEach((element) => {

    if(!allCat.includes(element.category)) {
      
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
                                        <i class="ri-heart-line"></i>
                                        <i class="ri-shopping-cart-2-fill"></i>
                                        </div>
                                    
                                </div>`;
      
      
    }
  });
};


let categoryfilter = () => {
  
  let checkinput = document.querySelectorAll("#checkicon")
  let checkdata = [];
  checkinput.forEach((e)=> {
    if (e.checked) {
      checkdata.push(e.value);
  }
  })
 
  displayproduct(checkdata);
}

displayproduct();



// let rawproduct = async () => {
//   let product = await fetch("https://fakestoreapi.com/products");
//   let finalproduct = await product.json();
//   console.log(finalproduct);
//   productdiv.innerHTML = "";
//   finalproduct.forEach((element) => {
//     productdiv.innerHTML += `
//             <div class="product-div">
//                 <img src=${element.image} alt="">
//                 <span>${element.title}</span>
//                 <div class="rating-price">
//                     <div class="rating">
//                         <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i>
//                     </div>

//                     <div class="product-div-price">
//                         ${element.price + " Rs"}
//                     </div>
//                 </div>
//               </div>`;
//   });
// };

// rawproduct();
