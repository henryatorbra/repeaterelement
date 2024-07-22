class HelloWorld extends HTMLElement {
    constructor(){
        super();
        console.log("hello world")
    }
  connectedCallback() {
    this.innerHTML = '<script src="flutter_bootstrap.js" async></script>';
  }
}
customElements.define('hello-world', HelloWorld);