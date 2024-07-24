import { db } from '../firebase/config.js';
import { getUserId } from '../helper/auth.js';
import { waitElement } from '../helper/waitElement.js';

document.addEventListener('DOMContentLoaded', async (event) => {
  const { listProducts } = await import('./product.js');
  const { favorites } = await import('../constants/data.js');

  waitElement("#product-container").then(async() => {
    let parsedFavorites = []
    const userId = await getUserId()
    db.collection("users").doc(userId).get()
      .then((user)=>{
        const favorites =user._delegate._document.data.value.mapValue.fields.favorites.stringValue;
        parsedFavorites = JSON.parse(favorites).fav;
      }).catch((error)=>{
        console.log(error);
      })

    // getting all products
    db.collection("product")
      .get()
      .then((data)=>{
         const products = data._delegate._snapshot.docChanges
         listProducts(products, parsedFavorites);
         localStorage.setItem("products",JSON.stringify(products)); // storing to local-storage
      })
      .catch((error)=>console.log(error));
  });
});



