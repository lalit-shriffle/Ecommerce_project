import { db } from "../firebase/config.js";
import { getUserId } from "../helper/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  waitElement().then(() => {
    addProduct();
  });
});

function addProduct() {
  const addButton = document.querySelector("#add-button");

  addButton.addEventListener("click", () => {
    const file = document.querySelector("#image").files[0];
    const title = document.querySelector("#title")
    const desc = document.querySelector("#desc")
    console.log(file);


    // storage.ref("/images" + file.name);

    db.collection("product")
      .add({
        title: title.value,
        desc: desc.value,
        image: "",
      })
      .then((data) => {
        console.log("added", data);
        title.value = "";
        desc.value = ""
      })
      .catch((error) => console.log(error));
  });
}

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
