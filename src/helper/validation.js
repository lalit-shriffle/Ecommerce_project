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
        emailFeedback.innerHTML = "Email is required";
    } else if (!validateEmailFormat(email)) {
        emailFeedback.innerHTML = "Invalid email format";
    }

    // Password validation
    if (!password) {
        passwordFeedback.innerHTML = "Password is required";
    } else if (password.length < 4 || password.length >= 14) {
        passwordFeedback.innerHTML = "Password should be 4 to 14 characters long";
    }

    // Confirm password validation
    if (!confirmPassword) {
        confirmFeedback.innerHTML = "Confirm password is required";
    } else if (password !== confirmPassword) {
        confirmFeedback.innerHTML = "Passwords do not match";
    }

    // Utility function to validate email format
    function validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
        emailFeedback.innerHTML = "Email is required";
    } else if (!validateEmailFormat(email)) {
        emailFeedback.innerHTML = "Invalid email format";
    }

    // Password validation
    if (!password) {
        passwordFeedback.innerHTML = "Password is required";
    } 

    

    // Utility function to validate email format
    function validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Return true if there are no errors
    return !(emailFeedback.innerHTML || passwordFeedback.innerHTML );
}