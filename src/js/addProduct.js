import { allFeildRequiredText } from "../constants/constants.js";
import { db } from "../firebase/config.js";
import { getUserId } from "../helper/auth.js";
import { waitElement } from "../helper/waitElement.js";

document.addEventListener("DOMContentLoaded", () => {
  waitElement("#add-product-container").then(() => {
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

    if(!title.value || !desc.value){
      return formFeedback.innerHTML=allFeildRequiredText
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


