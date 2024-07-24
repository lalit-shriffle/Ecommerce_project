import { db } from "../firebase/config.js";
import { doc, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getUserId, isUser } from "../helper/auth.js";

export function listProducts (products,favorites){
  const imageUrl = "https://img.freepik.com/free-photo/still-life-care-products_23-2149371308.jpg"
   
    const productContainer = document.querySelector("#product-container");
    productContainer.innerHTML = "";
    products?.map((productData, idx)=>{
        const product  = productData.doc.data.value.mapValue.fields;
        const id = productData.doc.key.path.segments[6]
        const isFavorite = favorites.includes(id); // is element favorite
  
        productContainer.innerHTML +=`
        <div class="card shadow-lg " style="width: 18rem;">
            <img src=${imageUrl}>
            <div class="card-body">
                <h5 class="card-title">${product.title.stringValue}</h5>
                <p class="card-text">${product?.desc.stringValue}</p>
                <button 
                    id="button-${id}"
                    type="button" 
                    class="add-button btn   ${isFavorite ? "bg-secondary text-light " : "btn-primary"}" 
                    value=${id}
                    >
                ${isFavorite?"Already added":"Add to favorite"}
                </button>
            </div>
        </div>
        `
    })

    // add event listeners
    attachEventListenets(products,favorites)
}



function attachEventListenets (products,favorites){
    products.map((product)=>{
        const id = product.doc.key.path.segments[6]
        const button = document.querySelector("#button-"+id);
        button.addEventListener("click",(e)=>{
            addFavoriteProduct(id)
        })
    })
}


// add product to favorite
async function addFavoriteProduct(productId) {
    const userId = await getUserId();

    if(!userId) {
      window.location.hash = "#/signin"
    }

   try{
    const response = await db.collection("users").doc(userId).get(); // get user details
    const favorites = response._delegate._document.data.value.mapValue.fields.favorites.stringValue;
    const parsedFavorites = JSON.parse(favorites);

    if(!parsedFavorites.fav.includes(productId)){
      parsedFavorites.fav.push(productId);

      db.collection("users").doc(userId)
        .update({
          favorites:JSON.stringify(parsedFavorites)
        })
        .then((data)=>{
          console.log("pushed",data);

        })
        .catch(error=>console.log(error))

    }else{
      console.log("already in array");
    }
   }catch(error){
    console.log(error);
   }
  }

  
