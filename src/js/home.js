import { db } from '../firebase/config.js';
import { isAdmin } from '../helper/auth.js';

document.addEventListener('DOMContentLoaded', async (event) => {
  const { listProducts } = await import('./product.js');
  const { favorites } = await import('../constants/data.js');

  waitElement().then(() => {
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


function waitElement() {
  return new Promise((resolve) => {
      const checkElements = () => {
          const container = document.querySelector("#product-container");
          if (container) {
              resolve();
          } else {
              setTimeout(checkElements, 100); // Check again after 100ms
          }
      };
      checkElements();
  });
}
