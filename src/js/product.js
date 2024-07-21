

export function listProducts (products,favorites){
    
    const productContainer = document.querySelector("#product-container");
    console.log(productContainer);
    productContainer.innerHTML = "";
    products?.map((product, idx)=>{
        productContainer.innerHTML +=`
        <div class="card" style="width: 18rem;">
            <img src=${product?.image}>
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product?.description}</p>
                <button 
                    id="button-${product.id}"
                    type="button" 
                    class="add-button btn  btn-primary ${favorites.includes(product.id) && "bg-secondary"}" 
                    value=${product.id}
                    >
                 Add to Favorite
                </button>
            </div>
        </div>
        `
    })


    // add event listeners
    attachEventListenets(products,favorites)
}



function attachEventListenets (products,favorites){
    products.map((product)=>{
        const button = document.querySelector("#button-"+product.id);
        button.addEventListener("click",()=>{
            if(!favorites.includes(product.id)) favorites.push(product.id);
            console.log(favorites);
        })
    })
}


