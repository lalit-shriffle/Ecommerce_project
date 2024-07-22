import { db } from "../firebase/config.js";
import { validateSignupData } from "../helper/validation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Ensure elements are present before calling registerUser
  waitForSignupElements().then(() => {
    const signUpButton = document.querySelector("#signup-button");

    signUpButton.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const confirmPassword = document.querySelector("#confirm-password").value;

      // Validating user inputs
      const isValidate = validateSignupData(email, password, confirmPassword);

      if (isValidate) {
        db.collection("users")
          .where("email", "==", email)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              // Email does not exist, add it
              db.collection("users")
                .add({
                  email: email,
                  password: password,
                  favorites:JSON.stringify({'fav':[]})
                })
                .then(() => {
                  window.location.hash = "#/signin"; // Redirect to the login page
                  alert("User registered successfully");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });

            } else {
              const errorFeedback = document.querySelector("#error-feedback");
              errorFeedback.innerHTML = "Email already exists!";
            }
          })
          .catch((error) => {
            const errorFeedback = document.querySelector("#error-feedback");
            errorFeedback.innerHTML = "something went wrong";
            console.error("Error getting documents: ", error);
          });
      }
    });
  });
});

function waitForSignupElements() {
  return new Promise((resolve) => {
    const checkElements = () => {
      const signUpButton = document.querySelector("#signup-button");

      if (signUpButton) {
        resolve(); // Resolve the promise if all elements are found
      } else {
        setTimeout(checkElements,100) // Check again after a short delay
      }
    };
    checkElements(); // Start checking for elements
  });
}
