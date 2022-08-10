const username = document.getElementById("username")
const password = document.getElementById("password")
const button = document.getElementById("button")
const label = document.getElementsByTagName("label")

button.addEventListener("click", (e) => {
    e.preventDefault()
    if (username.value == "" || password.value == "") {
        let myElm = document.createElement("p");
        myElm.innerText = 'Ingresa tu e-mail';
        myElm.style.color = 'red';
        username.style.border="1px solid red"
        let Elm = document.createElement("p");
        Elm.innerText = 'Ingresa tu contraseña';
        Elm.style.color = 'red';
        password.style.border="1px solid red"
        if (label[0].getElementsByTagName("p").length == 0) {
            label[0].appendChild(myElm);
        }
        if (label[1].getElementsByTagName("p").length == 0) {
            label[1].appendChild(Elm);
        }
       console.log(label[0].getElementsByTagName("p"))
    }
    else {
        window.location.href = "index.html";
        return false;
    }
})


