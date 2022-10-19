const username = document.getElementById("username")
const password = document.getElementById("password")
const button = document.getElementById("button")
const label = document.getElementsByTagName("label")


//funcion del login
button.addEventListener("click", (e) => {
    e.preventDefault()
    if (username.value == "" || password.value == "") {
        let myElm = document.createElement("p");
        myElm.innerText = 'Ingresa tu e-mail';
        myElm.style.color = 'red';
        username.style.border = "1px solid red"
        let Elm = document.createElement("p");
        Elm.innerText = 'Ingresa tu contraseña';
        Elm.style.color = 'red';
        password.style.border = "1px solid red"
        if (label[0].getElementsByTagName("p").length == 0) {
            label[0].appendChild(myElm);
        }
        if (label[1].getElementsByTagName("p").length == 0) {
            label[1].appendChild(Elm);
        }
        console.log(label[0].getElementsByTagName("p"))
    }
    else {
        window.location.href = "login.html";
        localStorage.setItem("username", username.value);
        location.href = "login.html";
    }
});

//google signin
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    window.location.href="login.html";
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); 
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}
//google signin

