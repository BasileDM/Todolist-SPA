let buttons = document.querySelectorAll("button");
let modal = document.getElementById("myModal");
const button = document.getElementById("myButton");

button.addEventListener("shown.bs.modal", () => {
    modal.focus();
    console.log("object");
})
