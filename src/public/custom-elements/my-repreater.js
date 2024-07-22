class HelloWorld extends HTMLElement {
    constructor(){
        super();
        console.log("hello world")
    }
  connectedCallback() {
    this.innerHTML = '<br/><br/><br/>Hello World!';
  }
}
customElements.define('hello-world', HelloWorld);