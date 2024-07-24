import { isAdmin } from "./helper/auth.js";
import { injectNavbar } from "./js/index.js";

document.addEventListener("click", (e) => {
    const { target } = e;
    // Check if an anchor link is clicked
    if (target.tagName !== 'A' || !target.getAttribute("href")) return;
    e.preventDefault();

    // prevent unneccessary reload
    console.log("result",e.target.getAttribute("href"),window.location.hash)
    
    urlRoute(e);

});

const routes = {
    "404": {
        page: "/src/pages/404.html"
    },
    "/": {
        page: "/src/pages/home.html"
    },
    "/dashboard": {
        page: "/src/pages/dashboard.html"
    },
    "/favorite": {
        page: "/src/pages/favorite.html"
    },
    "/signin": {
        page: "/src/pages/signin.html"
    },
    "/signup": {
        page: "/src/pages/signup.html"
    },
    "/add": {
        page: "/src/pages/addProduct.html"
    },
    "/edit": {
        page: "/src/pages/editProduct.html"
    },
    "/analytics": {
        page: "/src/pages/analytics.html"
    }
};

function urlRoute(event) {
    event = event 
    event.preventDefault();
   
    // Use hash-based routing
    window.location.hash = event.target.getAttribute("href");
    
    const result = isPathNotChanged(event)
    if(result) return;
    window.location.reload();

    urlLocationHandler();
}

export async function urlLocationHandler() {
   
    // Use hash to get the location
    let location = window.location.hash.replace("#", "") || "/";

    // only accessible to admin
    if(location==="/dashboard"){
        const isUserAdmin = await isAdmin();
        if(!isUserAdmin) location=window.location.hash='#/'
    }
    if(location.startsWith("/edit")){
        location = "/edit"
    }
    const route = routes[location] || routes["404"];

    try {
        // fetching and injecting html pages
        const pageToInject = await fetch(route.page).then((response) => response.text());
        document.querySelector("#root").innerHTML = pageToInject;

        // removing nav from auth pages
        if (location === "/signin" || location === "/signup") {
            document.querySelector("#navbar").style.display = "none";
        } 
        
    } catch (err) {
        console.log("page inject error", err);
    }
}

function isPathNotChanged(e){
    let location =  e.target.getAttribute("href");
    let newLocation = window.location.hash.substring(1)
    if(location.startsWith("#")){
        location = location.substring(1)
    }
    if(newLocation.startsWith("#")){
        newLocation = newLocation.substring(1)
    }
    console.log(location===newLocation);
    return location===newLocation
}


// Run the handler for the initial load
urlLocationHandler();

// Handle back/forward navigation
window.addEventListener("hashchange", urlLocationHandler);
window.addEventListener('popstate',urlLocationHandler);