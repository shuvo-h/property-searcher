// load API product data from server
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  // clean the product container 
  document.getElementById("all-products").innerHTML = "";
  // create card for each product and add information
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
        <img class="product-image" src=${image}></img>
      </div>
      <div class="product-details">
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <div>
          <div class="stars-outer">
            <div id="${product.id}" class="stars-inner"></div>
          </div>
          <div id="rating-${product.id}" class="rating"></div>
        </div>
        <h2 class="product-price">Price: $ ${product.price}</h2>
      </div>
      <div class="buttons">
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
        <button id="details-btn" class="btn btn-primary">Details</button>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
    displayRating(product)
  }
};

// add single product to cart 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  // update tax, charge  and total cost for adding each card to cart 
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// get value by refering id 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted.toFixed(2);
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = (+convertedOldPrice) + convertPrice;  //conver both to number and sum them
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    parseFloat(getInputValue("price")) + parseFloat(getInputValue("delivery-charge")) +
    parseFloat(getInputValue("total-tax"));
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// rating star calculation 
const displayRating = singleItem => {
  const totalRate = 5;
  const averageRate = singleItem.rating.rate;
  const percentRate = (averageRate/totalRate)*100;
  percentRateRound = `${Math.round(percentRate/10)*10}%`;
  document.getElementById(`${singleItem.id}`).style.width = percentRateRound;
  document.getElementById(`rating-${singleItem.id}`).innerText = `${averageRate} (${singleItem.rating.count} reviews)`;
}
 