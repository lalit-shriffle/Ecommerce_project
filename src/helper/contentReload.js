export function reloadDomContent(fn){
    document.addEventListener("DOMContentLoaded", async (event) => {
        fn()
      });
}

export function reloadHashChange(fn){
    window.addEventListener("hashchange", async (event) => {
        fn()
      });
}
  