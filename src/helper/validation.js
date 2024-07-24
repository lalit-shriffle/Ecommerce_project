import { confirmPassRequired, emailRegex, emailRequiredText, invalidEmailText, passwordLengthText, passwordNotMatched, passwordRequiredText } from "../constants/constants.js";


export function validateSignupData(email, password, confirmPassword) {
    const emailFeedback = document.querySelector("#email-feedback");
    const passwordFeedback = document.querySelector("#password-feedback");
    const confirmFeedback = document.querySelector("#confirm-feedback");

    // Clear previous feedback
    emailFeedback.innerHTML = "";
    passwordFeedback.innerHTML = "";
    confirmFeedback.innerHTML = "";

    // Email validation
    console.log("eamil",email)
    if (!email || email.length<=0) {
        emailFeedback.innerHTML = emailRequiredText;
    } else if (!validateEmailFormat(email)) {
        emailFeedback.innerHTML = invalidEmailText;
    }

    // Password validation
    if (!password) {
        passwordFeedback.innerHTML = passwordRequiredText;
    } else if (password.length < 4 || password.length >= 14) {
        passwordFeedback.innerHTML = passwordLengthText
    }

    // Confirm password validation
    if (!confirmPassword) {
        confirmFeedback.innerHTML = confirmPassRequired
    } else if (password !== confirmPassword) {
        confirmFeedback.innerHTML = passwordNotMatched
    }

    // Utility function to validate email format
    function validateEmailFormat(email) {
        return emailRegex.test(email);
    }

    // Return true if there are no errors
    return !(emailFeedback.innerHTML || passwordFeedback.innerHTML || confirmFeedback.innerHTML);
}


export function validateSignInData (email,password){
    const emailFeedback = document.querySelector("#email-feedback");
    const passwordFeedback = document.querySelector("#password-feedback");

    // Clear previous feedback
    emailFeedback.innerHTML = "";
    passwordFeedback.innerHTML = "";

    // Email validation
    console.log("email",email)
    if (!email || email.length<=0) {
        emailFeedback.innerHTML = emailRequiredText;
    } else if (!validateEmailFormat(email)) {
        emailFeedback.innerHTML = invalidEmailText;
    }
    // Password validation
    if (!password) {
        passwordFeedback.innerHTML = passwordRequiredText;
    } 

    

    // Utility function to validate email format
    function validateEmailFormat(email) {
        return emailRegex.test(email);
    }

    // Return true if there are no errors
    return !(emailFeedback.innerHTML || passwordFeedback.innerHTML );
}