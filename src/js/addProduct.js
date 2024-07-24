import { db } from "../firebase/config.js";
import { getUserId } from "../helper/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  waitElement().then(() => {
    addProduct();
  });
});

function addProduct() {
  const addButton = document.querySelector("#add-product-button");
  const formFeedback = document.querySelector("#add-form-feedback")
  formFeedback.innerHTML = "";
  addButton.addEventListener("click", () => {
    const title = document.querySelector("#title")
    const desc = document.querySelector("#desc")
    console.log("rannnn");

    if(!title.value || !desc.value){
      return formFeedback.innerHTML="Please fill all fields"
    }

    else{
      db.collection("product")
      .add({
        title: title.value,
        desc: desc.value,
        image: "",
      })
      .then((data) => {
        const modalCloseBtn = document.querySelector("#modal-close-btn");
        modalCloseBtn.click()
        console.log("added", data);
        title.value = "";
        desc.value = "";
        
      })
      .catch((error) => console.log(error));
    }
  });
}


// wait for element to inject
function waitElement() {
  return new Promise((resolve) => {
    const checkElements = () => {
      const container = document.querySelector("#add-product-container");
      if (container) {
        resolve();
      } else {
        setTimeout(checkElements, 100); // Check again after 100ms
      }
    };
    checkElements();
  });
}
