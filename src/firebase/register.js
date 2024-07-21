import { auth } from "./config.js"

function registerUser (email,password){
    auth.createUserWithEmailAndPassword(email,password)
    .then((data)=>{
        console.log(data.user)
    })
    .catch(error=>{
        console.log(error)
    })
}