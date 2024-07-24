import { db } from "../firebase/config.js";
import { waitElement } from "../helper/waitElement.js";

export function editProductData(productId) {
  // get particular product
  db.collection("product")
    .doc(productId)
    .get()
    .then((data) => {
      const product = data._delegate._document.data.value.mapValue.fields;
      let titleData = product.title.stringValue;
      let descData = product.desc.stringValue;

      const submit = document.querySelector("#submit-button");

      const title = document.querySelector("#edit-title");
      const desc = document.querySelector("#edit-desc");


      // set data to input
      console.log("setting data");
      title.value = titleData;
      desc.value = descData;

      submit.addEventListener("click", (e) => {
        updateData(productId, title.value, desc.value);
      });
    })
    .catch((error) => console.log(error));
}

// update product data
function updateData(productId, title, desc) {
  db.collection("product")
    .doc(productId)
    .update({ title: title, desc: desc })
    .then((data) => {
      window.location.hash = "#/dashboard"; // back to dashboard page
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
