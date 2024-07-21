import { isAdmin } from "../helper/auth.js";

document.addEventListener("DOMContentLoaded", async (event) => {
  const { products } = await import("../constants/data.js");
  const { favorites } = await import("../constants/data.js");

  waitElement().then(() => {
    const addButton = document.querySelector("#add-button");
    addButton.addEventListener("click",(e)=>{
        window.location.hash = "#/add"
    })
    listProductss(products, favorites);

  });
});

function listProductss(products, favorites) {
  const productContainer = document.querySelector("#product-container-dash");
  console.log(productContainer);
  productContainer.innerHTML = "";
  products?.map((product, idx) => {
    productContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
    <img src="${product?.image}" class="card-img-top" alt="${product.title}">
    <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product?.description}</p>
        <div class="row">
            <div class="col-6 p-1">
                <button 
                  id="delete-button-${product.id}"
                  type="button" 
                  class="btn btn-danger w-100"
                  value="${product.id}"
                >
                  Delete
                </button>
            </div>
            <div class="col-6 p-1">
                <button 
                  id="edit-button-${product.id}"
                  type="button" 
                  class="btn btn-primary w-100"
                  value="${product.id}"
                >
                  Edit
                </button>
            </div>
        </div>
    </div>
</div>


        `;
  });
  // add event listeners
  attachEventListenets(products, favorites);
}

function attachEventListenets(products, favorites) {
  products.map((product) => {
    const delButton = document.querySelector("#delete-button-" + product.id);
    const editButton = document.querySelector("#edit-button-" + product.id)
    delButton.addEventListener("click", (e) => {
     console.log("deleting")
    });

    editButton.addEventListener("click",(e)=>{
        console.log("editing")
    })

    
  });
}










function waitElement() {
  return new Promise((resolve) => {
    const checkElements = () => {
      const container = document.querySelector("#product-container-dash");
      if (container) {
        resolve();
      } else {
        setTimeout(checkElements, 100); // Check again after 100ms
      }
    };
    checkElements();
  });
}
