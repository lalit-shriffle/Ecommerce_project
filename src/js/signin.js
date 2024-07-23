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

    const isValidate = validateSignInData(email, password); // validate data
    if (isValidate) {
      try {
        // save user
        const querySnapshot = await db.collection("users")
          .where("email", "==", email)
          .where("password", "==", password)
          .get();

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const userId =  querySnapshot.docs[0].id

          saveUserInfo({ role: userData.role, email: userData.email ,id:userId}); // save user to local storage

          const isUserAdmin = await isAdmin(); // get role
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
        }
      } catch (error) {
        const errorFeedback = document.querySelector("#error-feedback");
        errorFeedback.innerHTML = "Something went wrong";
      }
    }
  });
}

function waitForSigninElements() {
  return new Promise((resolve) => {
    const checkElements = () => {
      const signInButton = document.querySelector("#signin-button");
      if (signInButton) {
        resolve(); 
      } else {
        setTimeout(checkElements, 100); 
      }
    };
    checkElements();
  });
}
