import { db } from "../firebase/config.js";
import { isAdmin } from "../helper/auth.js";
import { reloadDomContent, reloadHashChange } from "../helper/contentReload.js";
import { waitElement } from "../helper/waitElement.js";


reloadDomContent(dashboard)
reloadHashChange(dashboard)

async function dashboard(){
  const { favorites } = await import("../constants/data.js");
  console.log("content loaded");

  waitElement("#product-container-dash").then(async () => {
    let products = [];
    const addButton = document.querySelector("#add-button");

    // addButton.addEventListener("click",(e)=>{
    //     window.location.hash = "#/add"  // redirect to add product page
    // });

    try {
      // getting all products
      const response = await db.collection("product").get();
      products = response._delegate._snapshot.docChanges;
      listProductss(products, favorites);
    } catch (error) {
      console.log(error);
    }

    function listProductss(products, favorites) {
      const imageUrl =
        "https://img.freepik.com/free-photo/still-life-care-products_23-2149371308.jpg";

      const productContainer = document.querySelector(
        "#product-container-dash"
      );
      productContainer.innerHTML = "";

      // listing all products
      products?.map((productData, idx) => {
        const product = productData.doc.data.value.mapValue.fields;
        const id = productData.doc.key.path.segments[6];
        productContainer.innerHTML += `
     <div id=${`element${id}`} class="card shadow-lg" style="width: 18rem;">
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
        const id = productData.doc.key.path.segments[6];
        const delButton = document.querySelector("#delete-button-" + id);
        const editButton = document.querySelector("#edit-button-" + id);

        delButton.addEventListener("click", (e) => {
          deleteProduct(id, products);
        });

        editButton.addEventListener("click", (e) => {
          editProduct(id);
        });
      });
    }

    // delete product
    async function deleteProduct(id) {
      try {
        const response = await db.collection("product").doc(id).delete();
        removeProductFromArray(id);
      } catch (error) {
        console.log(error);
      }
    }

    function removeProductFromArray(idToDelete) {
      console.log(idToDelete);
      const element = document.querySelector(`#element${idToDelete}`);
      element.remove();
    }

    // redirect to edit page
    function editProduct(id) {
      if (id) {
        window.location.hash = `#/edit?id=${id}`;
      }
    }
  });

}