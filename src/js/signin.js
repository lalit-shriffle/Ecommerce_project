import { db } from "../firebase/config.js";
import { isAdmin, saveUserInfo } from "../helper/auth.js";
import { validateSignInData } from "../helper/validation.js";

document.addEventListener("DOMContentLoaded", () => {
  waitForSigninElements().then(() => {
    loginUser();
  });
});

function loginUser() {
  const signinButton = document.querySelector("#signin-button");

  signinButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const isValidate = validateSignInData(email, password);
    if (isValidate) {
      console.log("calling");
      try {
        const querySnapshot = await db.collection("users")
          .where("email", "==", email)
          .where("password", "==", password)
          .get();

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log("data", userData);
          saveUserInfo({ role: userData.role, email: userData.email });

          const isUserAdmin = await isAdmin();
          if (isUserAdmin) {
            window.location.hash = "#/dashboard";
            window.location.reload();
          } else {
            window.location.hash = "#/";
            window.location.reload();
          }
        } else {
          // No matching document found
          const errorFeedback = document.querySelector("#error-feedback");
          errorFeedback.innerHTML = "Incorrect email or password!";
          console.log("un auth");
        }
      } catch (error) {
        const errorFeedback = document.querySelector("#error-feedback");
        errorFeedback.innerHTML = "Something went wrong";
        console.error("Error getting documents: ", error);
      }
    }
  });
}

function waitForSigninElements() {
  return new Promise((resolve) => {
    const checkElements = () => {
      const signInButton = document.querySelector("#signin-button");

      if (signInButton) {
        resolve(); // Resolve the promise if the element is found
      } else {
        setTimeout(checkElements, 100); // Check again after a short delay
      }
    };
    checkElements(); // Start checking for elements
  });
}
