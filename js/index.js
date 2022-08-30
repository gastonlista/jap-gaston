document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    let username = localStorage.getItem("username")
    if (username == null) {
        location.href = "login.html";
    }
    else {
        document.getElementById("cerrar").style.display = "block";
        document.getElementById("usuario").innerHTML = username;
    }

    document.getElementById("cerrar").addEventListener("click", () => {
        location.href = "index.html";
        localStorage.removeItem("username");
    });
});