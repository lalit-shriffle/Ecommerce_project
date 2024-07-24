import { isAdmin, isUser, logoutUser } from "../helper/auth.js";

export async function injectNavbar(){
    // injecting navbar
    // const nav = await fetch("/src/components/navbar.html").then((data)=>data.text()).catch(error=>console.log("error in nav fetching",error));
    // document.querySelector("#navbar").innerHTML=nav;

    // removing login link if user is logged in
    const isUserSigned  =  await isUser();
    if(isUserSigned) {
        document.querySelector("#login-link").classList.add("visually-hidden");
        const logoutButton = document.querySelector("#logout-link")
        logoutButton.classList.remove("visually-hidden");
        logoutButton.addEventListener("click",()=>{
            logoutUser();
        })
    }else{
        document.querySelector("#login-link").classList.remove("visually-hidden");
        document.querySelector("#logout-link").classList.add("visually-hidden");
    }

    // removing dashboard link if role is not admin
    const isUserAdmin = await isAdmin();
    if(isUserAdmin){
        document.querySelector("#dashboard").classList.remove("visually-hidden")
    }else{
        document.querySelector("#dashboard").classList.add("visually-hidden")
    }
}

injectNavbar();




