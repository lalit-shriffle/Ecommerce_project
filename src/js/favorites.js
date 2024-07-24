import { db } from "../firebase/config.js";
import { getUserId } from "../helper/auth.js";
import { waitElement } from "../helper/waitElement.js";

document.addEventListener("DOMContentLoaded", () => {
  waitElement("#fav-product-container").then(async () => {
    const userId = await getUserId();

    try {
      const user = await db.collection("users").doc(userId).get(); // get user data 
      const favorites =user._delegate._document.data.value.mapValue.fields.favorites.stringValue;
      const parsedFavorites = JSON.parse(favorites);
      const allProducts =  getAllProducts(parsedFavorites);

      // no products
      if(!allProducts || allProducts.length<=0) {
        const productContainer = document.querySelector("#fav-product-container");
        productContainer.innerHTML = "<h1>No favorites</h1>";
      }

      listFavProducts(allProducts)
    } catch (error) {
      console.log(error);
    }
  });
});


// getting all products from local storage
 function getAllProducts(parsedFavorites) {
    const productData = JSON.parse(localStorage.getItem("products"));  // get data from local-storage

    const dataToSend = [];
    productData.forEach(element => {
            const data = element.doc.data.value.mapValue.fields
            const idOfElement  = element.doc.key.path.segments[6]
            const dataPrepared = {
              title:data.title.stringValue,
              desc:data.desc.stringValue,
              id:idOfElement,
            }

            // if product in favorite push in array
            if(parsedFavorites.fav.includes(dataPrepared.id)){
              dataToSend.push(dataPrepared);
            }
             
    });

    return dataToSend
}

// list favorite products
export function listFavProducts(products, favorites = []) {
  console.log("pro", products);
  const imageUrl ="https://img.freepik.com/free-photo/still-life-care-products_23-2149371308.jpg";

  const productContainer = document.querySelector("#fav-product-container");
  productContainer.innerHTML = "";

  products.map((product) => {
    productContainer.innerHTML += `
          <div id=${`element${product.id}`} class="card shadow-lg" style="width: 18rem;">
              <img src=${imageUrl}>
              <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product?.desc}</p>
                  <button 
                      id="button-${product.id}"
                      type="button" 
                      class="add-button btn  btn-danger " 
                      value=${product.id}
                      >
                   Remove
                  </button>
              </div>
        </div>
          `;
  });

//   add event listeners
  attachEventListenets(products, favorites);
}

function attachEventListenets(products, favorites) {
  products.map((product) => {
    const id = product.id
    const button = document.querySelector("#button-" + id);
    button.addEventListener("click", (e) => {
        removeFromFav(id)
    });
  });
}



// remove item from favorite
async function removeFromFav(id){
    try{
        const userId = await getUserId();
        const userData = await db.collection("users").doc(userId).get();
        const favorite = userData._delegate._document.data.value.mapValue.fields.favorites.stringValue;
        const parsedFavorites = JSON.parse(favorite);
        const newFav = parsedFavorites?.fav?.filter((item)=>{
            return item !== id
        })

        db.collection("users").doc(userId).update({
            favorites:JSON.stringify({fav:newFav})
        })
        .then((data)=>{
          const element = document.querySelector(`#element${id}`);
          element.remove();
        })
        .catch(error=>console.log(error))
    }catch(error){
        console.log(error);
    }
}


