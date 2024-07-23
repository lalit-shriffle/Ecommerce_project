document.addEventListener("DOMContentLoaded",()=>{
    waitElement()
        .then(()=>{
            const ul = document.querySelector("#ui");
            addEventLit(ul.children)

        })
});

function addEventLit(childrens){
    for(const ele of childrens){
        ele.addEventListener("click",(e)=>{
            for(const link of childrens){
                console.log("liii",link.children[0]);
                link.children[0].classList.remove("bg-primary")
            }
            e.target.classList.add("bg-primary")
        })
    }
}

function waitElement() {
    return new Promise((resolve) => {
      const checkElements = () => {
        const container = document.querySelector("#nav-wrapper");
        if (container) {
          resolve();
        } else {
          setTimeout(checkElements, 100); // Check again after 100ms
        }
      };
      checkElements();
    });
  }
  