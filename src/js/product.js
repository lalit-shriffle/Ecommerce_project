import { db } from "../firebase/config.js";
import { doc, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

export function listProducts (products,favorites){
  const imageUrl = "https://img.freepik.com/free-photo/still-life-care-products_23-2149371308.jpg"
   
    console.log("products",products);
    const productContainer = document.querySelector("#product-container");
    productContainer.innerHTML = "";
    products?.map((productData, idx)=>{
        console.log(productData)
        const product  = productData.doc.data.value.mapValue.fields;
        const id = productData.doc.key.path.segments[6]
        console.log(id)
        console.log("productttt",product)
        productContainer.innerHTML +=`
        <div class="card" style="width: 18rem;">
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

        button.addEventListener("click",(e,id,userId)=>{
            addFavoriteProject(1,2)
        })
    })
}


async function addFavoriteProject(userId, projectId) {
    const userRef = db.collection('users').doc(userId);
  
    try {
      await userRef.update({
        favoriteProjects: arrayUnion(projectId)
      });
      console.log('Project added to favorites');
    } catch (error) {
      console.error('Error adding project to favorites: ', error);
    }
  }
