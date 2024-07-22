import { db } from "../firebase/config.js";
import { getUserId } from "../helper/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  waitElement().then(async () => {
    const userId = await getUserId();
    console.log(userId);

    try {
      const user = await db.collection("users").doc(userId).get();
      const favorites =user._delegate._document.data.value.mapValue.fields.favorites.stringValue;
      const parsedFavorites = JSON.parse(favorites);
      console.log("parased",parsedFavorites);

      const allProducts = await getAllProducts(parsedFavorites);
      const products = [];
      for (const product of allProducts) {
        console.log("productys",await product);
        products.push(await product)
      }
      listFavProducts(products)
    } catch (error) {
      console.log(error);
    }
  });
});

async function getAllProducts(parsedFavorites) {
  return await parsedFavorites?.fav?.map(async (id) => {
    const product = await db.collection("product").doc(id).get();
    console.log(product);
    const prodId = product._delegate._key.path.segments[1]
    const productData = product._delegate._document.data.value.mapValue.fields;
    return {...productData,id:prodId}
  });
}

export function listFavProducts(products, favorites = []) {
  console.log("pro", products);
  const imageUrl =
    "https://img.freepik.com/free-photo/still-life-care-products_23-2149371308.jpg";

  const productContainer = document.querySelector("#fav-product-container");
  productContainer.innerHTML = "";

  products.map((product) => {
    
    productContainer.innerHTML += `
          <div class="card" style="width: 18rem;">
              <img src=${imageUrl}>
              <div class="card-body">
                  <h5 class="card-title">${product.title.stringValue}</h5>
                  <p class="card-text">${product?.desc.stringValue}</p>
                  <button 
                      id="button-${product.id}"
                      type="button" 
                      class="add-button btn  btn-danger ${
                        favorites.includes(product.id) && "bg-secondary"
                      }" 
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



async function removeFromFav(id){
    try{
        const userId = await getUserId();
        const userData = await db.collection("users").doc(userId).get();
        const favorite = userData._delegate._document.data.value.mapValue.fields.favorites.stringValue;
        console.log("favs",JSON.parse(favorite));
        const parsedFavorites = JSON.parse(favorite);
        const newFav = parsedFavorites?.fav?.filter((item)=>{
            return item !== id
        })

        db.collection("users").doc(userId).update({
            favorites:JSON.stringify({fav:newFav})
        })
        .then((data)=>console.log("removed successfully"))
        .catch(error=>console.log(error))
    }catch(error){
        console.log(error);
    }
}

function waitElement() {
  return new Promise((resolve) => {
    const checkElements = () => {
      const container = document.querySelector("#fav-product-container");
      if (container) {
        resolve();
      } else {
        setTimeout(checkElements, 100); // Check again after 100ms
      }
    };
    checkElements();
  });
}
