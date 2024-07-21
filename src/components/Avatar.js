class Avatar extends HTMLElement{
      constructor(){
        super();
        const shadow = this.attachShadow({mode:"open"})
        shadow.innerHTML = `<h1>${this.innerText}</h1>`
      }
}

window.customElements.define("custom-avatar",Avatar);