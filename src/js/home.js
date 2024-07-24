import { db } from "../firebase/config.js";
import { getUserId } from "../helper/auth.js";
import { reloadDomContent, reloadHashChange } from "../helper/contentReload.js";
import { waitElement } from "../helper/waitElement.js";
import { calculatePagination } from "./pagination.js";
import { listProducts } from "./product.js";

reloadDomContent(home);
reloadHashChange(home);
let page = 1;

async function home() {
  
  const { listProducts } = await import("./product.js");
  const { favorites } = await import("../constants/data.js");
  waitElement("#product-container").then(async () => {
  
    let parsedFavorites = [];
    const userId = await getUserId();

    db.collection("users")
      .doc(userId)
      .get()
      .then((user) => {
        const favorites =
          user._delegate._document.data.value.mapValue.fields.favorites
            .stringValue;
        parsedFavorites = JSON.parse(favorites).fav;
      })
      .catch((error) => {
        console.log(error);
      });

    // getting all products
    db.collection("product")
      .get()
      .then((data) => {
        let page = 1;
        const products = data._delegate._snapshot.docChanges;
        showPages(products,parsedFavorites,page);

        // pagination buttons
        const previousButton = document.querySelector("#pagination-previous-btn");
        const nextButton = document.querySelector("#pagination-next-btn");

        previousButton.addEventListener("click",()=>{
          console.log("pagee",page);
          previosPageButton(products,parsedFavorites)
        })

        nextButton.addEventListener("click",()=>{
          nextPageButton(products,parsedFavorites)
        })


        localStorage.setItem("products", JSON.stringify(products)); // storing to local-storage
      })
      .catch((error) => console.log(error));
  });
}

function showPages(products,parsedFavorites) {
  console.log("page in show ",page);
  const { start, end } = calculatePagination(page);
  console.log(start, end);
  const productsToShow = products.slice(start,end)
  listProducts(productsToShow, parsedFavorites);
}

function previosPageButton(products,parsedFavorites){
  console.log("in previos",page);
 
  if(page>1){
     page-=1;
     console.log("in previos after",page);
    showPages(products,parsedFavorites)
  }
}

function nextPageButton(products,parsedFavorites){
  console.log("in next",page);
  const isLastPage = products.length/6
  console.log("lastpage",isLastPage);
  if(page<=isLastPage){
     page+=1;
     console.log("in next after",page);
    showPages(products,parsedFavorites)
  }
}