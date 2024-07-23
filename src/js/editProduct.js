import { db } from "../firebase/config.js";

document.addEventListener("DOMContentLoaded",(e)=>{
   
    waitElement()
                .then(()=>{
                    const params = location.href.split("edit?")[1];
                    const productId = params.split("=")[1];

                    // get particular product
                    db.collection("product").doc(productId)
                    .get()
                    .then((data)=>{
                        const product = data._delegate._document.data.value.mapValue.fields;
                        let titleData = product.title.stringValue;
                        let descData  = product.desc.stringValue;

                        const submit = document.querySelector("#submit-button");

                        const title = document.querySelector("#title");
                        const desc = document.querySelector("#desc");

                         // set data to input
                        title.value = titleData,
                        desc.value = descData; 

                        submit.addEventListener("click",(e)=>{
                        updateData(productId,title.value,desc.value);
                          })
                    })
                    .catch(error=>console.log(error));
    })
})


// update product data
function updateData (productId,title,desc){
    db.collection("product").doc(productId)
        .update({title:title,
                desc:desc
                })
        .then((data)=>{
            window.location.hash = "#/dashboard"  // back to dashboard page
            window.location.reload();
        })
        .catch(error=>{
            console.log(error);
        })
}


function waitElement() {
    return new Promise((resolve) => {
      const checkElements = () => {
        const container = document.querySelector("#edit-product-container");
        if (container) {
          resolve();
        } else {
          setTimeout(checkElements, 100); 
        }
      };
      checkElements();
    });
  }