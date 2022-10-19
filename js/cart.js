let arrayCarrito = [];
let addArticulos = [];

//fetch
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(cartData).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayCarrito = resultObj.data.articles[0];

            console.log(cartData)
        };
        
        //tomamos el item "cart"
        let cart = localStorage.getItem("cart");

        if (cart != null) {
            //array toma el objeto dentro del carrito
            addArticulos = JSON.parse(localStorage.getItem("cart"));
            //se agrega el "objeto" del json al array
            addArticulos.push(arrayCarrito);
            //se muestra la función con el array como parametro
            showingCartInfo(addArticulos);
        } else {
            addArticulos.push(arrayCarrito);
            showingCartInfo(addArticulos);
        };
    });
});

//funcion para mostrar la informacion del json
function showingCartInfo(arrayCarrito) {
    let htmlContentToAppend = "";

    for (let i = 0; i < arrayCarrito.length; i++) {
        let articles = arrayCarrito[i]
        htmlContentToAppend += `
                    <br>
                    <div class="list-group-item">
                    <div>
                    <br>
                    <div class="row">
                        <div class="col"><img src="${articles.image}" width="100px"></div>
                        <div class="col"><h4>${articles.name}</4></div>
                        <div class="col"><h4>${articles.currency} ${articles.unitCost}</4></div>
                        <div class="col"><h4><input type="number" onchange="calcSubtotal(${articles.unitCost},${articles.id})" min="1" id="multiply${articles.id}" ${articles.count}></4></div>
                        <div class="col"><h4>${articles.currency}</h4> <h4 id="itemTotales${articles.id}">${articles.unitCost}</h4></div>
                        </div>
                    </div>
                </div>
                `
    };
    document.getElementById("Cart").innerHTML = htmlContentToAppend;
};

//funcion para realizar el calculo del subtotal

function calcSubtotal(cost, id) {

    let cant = document.getElementById("multiply" + id).value;

    return document.getElementById("itemTotales" + id).innerHTML = cost * cant;
};

