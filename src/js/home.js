import { db } from '../firebase/config.js';
import { waitElement } from '../helper/waitElement.js';

document.addEventListener('DOMContentLoaded', async (event) => {
  const { listProducts } = await import('./product.js');
  const { favorites } = await import('../constants/data.js');

  waitElement("#product-container").then(() => {
    // getting all products
    db.collection("product")
      .get()
      .then((data)=>{
         const products = data._delegate._snapshot.docChanges
         listProducts(products, favorites);
         localStorage.setItem("products",JSON.stringify(products)); // storing to local-storage
      })
      .catch((error)=>console.log(error));
  });
});



