import { db } from "../firebase/config.js";
import { reloadDomContent, reloadHashChange } from "../helper/contentReload.js";
import { waitElement } from "../helper/waitElement.js";

reloadDomContent(analytics);
reloadHashChange(analytics);

function analytics(){
    waitElement("#table-body")
        .then(()=>{
       
            db.collection("users").get()
                .then((data)=>{
                   const userData = data._delegate._snapshot.docChanges;
                    listAllRows(userData)
                })
                .catch(error=>console.log(error));

            
            
        })
}


function listAllRows(userData){
    const tableBody = document.querySelector("#table-body");
    tableBody.innerHTML="";
    userData.map((user,index)=>{
        const userName = user.doc.data.value.mapValue.fields.email.stringValue
        const favorites = user.doc.data.value.mapValue.fields?.favorites.stringValue
        const parsedFavorites = JSON.parse(favorites).fav;
        console.log(parsedFavorites);
        
        tableBody.innerHTML += `
          <tr>
            <td>${index+1}</td>
             <td>${userName}</td>
             <td>${parsedFavorites.length}</td>
          </tr>
        `
       
    })

}
