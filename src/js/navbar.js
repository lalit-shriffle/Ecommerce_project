import { waitElement } from "../helper/waitElement.js";

waitElement("#nav-wrapper").then(()=>{
    const ul = document.querySelector("#ui");
    const links = ul.children;

    for(const link of links ){
        const a = link.children[0];
        console.log("evenets");
        a.addEventListener("click",(e)=>{
            e.preventDefault();
            for(let li of links){
                const ele = li.children[0];
                console.log(ele);
                ele.classList.remove("text-danger")
            }
            e.target.classList.add("text-danger")
        })
    }

    
})