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

       
        productContainer.innerHTML +=`
        <div class="card shadow-lg " style="width: 18rem;">
            <img src=${imageUrl}>
            <div class="card-body">
                <h5 class="card-title">${product.title.stringValue}</h5>
                <p class="card-text">${product?.desc.stringValue}</p>
                <button 
                    id="button-${id}"
                    type="button" 
                    class="add-button btn  btn-primary ${favorites.includes(id) && "bg-secondary"}" 
                    value=${id}
                    >
                 Add to Favorite
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
            addFavoriteProject(id)
        })
    })
}


async function addFavoriteProject(productId) {
    const userId = await getUserId();
    if(!userId) {
      window.location.hash = "#/signin"
    }
   try{
    const response = await db.collection("users").doc(userId).get();
    const favorites = response._delegate._document.data.value.mapValue.fields.favorites.stringValue;
    const parsedFavorites = JSON.parse(favorites);

    if(!parsedFavorites.fav.includes(productId)){
      parsedFavorites.fav.push(productId);
      console.log("favsss",parsedFavorites);
      console.log("stringy fi",parsedFavorites);
      console.log("iddd",userId);
      db.collection("users").doc(userId)
        .update({
          favorites:JSON.stringify(parsedFavorites)
        })
        .then((data)=>{
          console.log("pushed",data);
        })
        .catch(error=>console.log(error))


    }else{
      console.log("favsss",  JSON.stringify(parsedFavorites));
      console.log("already in array");
    }
    


    // const parsedFavorites = JSON.parse(favorites);
    // console.log(parsedFavorites);

   }catch(error){
    console.log(error);
   }
  }

  function updateData (productId,title,desc){
    db.collection("product").doc(productId)
        .update({title:title,
                desc:desc
                })
        .then((data)=>{
            console.log(data);
            window.location.hash = "#/dashboard"
            window.location.reload();
        })
        .catch(error=>{
            console.log(error);
        })
}