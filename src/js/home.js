import { isAdmin } from '../helper/auth.js';

document.addEventListener('DOMContentLoaded', async (event) => {
  const { products } = await import('../constants/data.js');
  const { listProducts } = await import('./product.js');
  const { favorites } = await import('../constants/data.js');
  
  waitElement().then(() => {
      listProducts(products, favorites);
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
