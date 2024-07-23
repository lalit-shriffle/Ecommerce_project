import { db } from "../firebase/config.js";
import { isAdmin } from "../helper/auth.js";

document.addEventListener("DOMContentLoaded", async (event) => {
  const { favorites } = await import("../constants/data.js");

  waitElement().then(async() => {
    const addButton = document.querySelector("#add-button");
  
    addButton.addEventListener("click",(e)=>{
        window.location.hash = "#/add"  // redirect to add product page
    });

   try{
    // getting all products
    const response = await db.collection("product").get();
    const products = response._delegate._snapshot.docChanges;
    listProductss(products, favorites);
   }catch(error){
    console.log(error);
   }
  });
});

function listProductss(products, favorites) {
   const imageUrl = "https://img.freepik.com/free-photo/still-life-care-products_23-2149371308.jpg"

  const productContainer = document.querySelector("#product-container-dash");
  productContainer.innerHTML = "";

  // listing all products
  products?.map((productData, idx) => {
    const product  = productData.doc.data.value.mapValue.fields;
    const id = productData.doc.key.path.segments[6]
    productContainer.innerHTML += `
    <div class="card shadow-lg" style="width: 18rem;">
    <img src="${imageUrl}" class="card-img-top" alt="${product.title}">
    <div class="card-body">
        <h5 class="card-title">${product.title.stringValue}</h5>
        <p class="card-text">${product?.desc.stringValue}</p>
        <div class="row">
            <div class="col-6 p-1">
                <button 
                  id="delete-button-${id}"
                  type="button" 
                  class="btn btn-danger w-100"
                  value="${id} shadow"
                >
                  Delete
                </button>
            </div>
            <div class="col-6 p-1">
                <button 
                  id="edit-button-${id}"
                  type="button" 
                  class="btn btn-primary w-100"
                  value="${id} shadow"
                >
                  Edit
                </button>
            </div>
        </div>
    </div>
    </div>`;
  });
  // add event listeners
  attachEventListenets(products, favorites);
}

// attach events to buttons
function attachEventListenets(products, favorites) {
  products.map((productData) => {
    const id = productData.doc.key.path.segments[6]
    const delButton = document.querySelector("#delete-button-" + id);
    const editButton = document.querySelector("#edit-button-" + id);

    delButton.addEventListener("click", (e) => {
      deleteProduct(id);
    });

    editButton.addEventListener("click",(e)=>{
      editProduct(id);
    })

  });
}


// delete product
async function deleteProduct(id){
  try{
    const response = await db.collection('product').doc(id).delete();
    alert("product deleted");
  }catch(error){
    console.log(error);
    alert("somethingh went wrong")
  }

}

// redirect to edit page
function editProduct (id){
  if(id){
    window.location.hash = `#/edit?id=${id}`
  }
}

// wait for injection
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
