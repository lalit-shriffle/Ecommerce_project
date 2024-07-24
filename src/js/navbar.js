import { reloadDomContent, reloadHashChange } from "../helper/contentReload.js";
import { waitElement } from "../helper/waitElement.js";

reloadDomContent(navbar);
reloadHashChange(navbar)
window.onbeforeunload=navbar


export function navbar(){
    waitElement("#nav-wrapper").then(()=>{
        const ul = document.querySelector("#ui");
        const links = ul.children;

        for(const link of links){
            const a = link.children[0];
            if(a.href.split("0/")[1]===window.location.hash){
            a.classList.add("text-danger")
            }
        }

        
    
        for(const link of links ){
            const a = link.children[0];
            a.addEventListener("click",(e)=>{
                e.preventDefault();
                for(let li of links){
                    const ele = li.children[0];
                    ele.classList.remove("text-danger")
                }
                e.target.classList.add("text-danger")
            })
        }
    
        
    });
}