export function saveUserInfo(data){
    console.log(data)
    localStorage.setItem("user",JSON.stringify(data));
}

export function isUser (){
    return new Promise((resolve,reject)=>{
        const user =  localStorage.getItem("user");
        if(!user) reject(false)
        resolve(JSON.parse(user))
    })
}

export async function isAdmin() {
    try {
        const data = await isUser();
        return data.role && data.role === "admin"
    } catch (error) {
        return false;
    }
}

export function logoutUser (){
    localStorage.removeItem("user");
    window.location.hash = "#/signin"
    console.log("usre logout")
}