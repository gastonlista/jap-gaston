let arrayCarrito = [];
let addArticulos = [];

//variable que usa por nombre el boton radio
let percentage = document.getElementsByName("send");

//variables que manejan los botones radio al seleccionar 
let erase = document.getElementsByClassName("erase");
let creditOpt = document.getElementsByClassName("creditOptions");


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
            //muestro la funcion con el array como parametro
            showingCartInfo(addArticulos);
            //carga la funcion con la pagina
            cartSubtotal()
        } else {
            addArticulos.push(arrayCarrito);
            showingCartInfo(addArticulos);
            cartSubtotal()
        };

        // toma la posición del radio button y ejecuta la función con un evento
        for (let i = 0; i < percentage.length; i++) {
            percentage[i].addEventListener("click", () => {
                cartSubtotal();
            });
        };

        document.getElementById("creditCard").addEventListener("click",()=>{
            disable()
        });
    
        document.getElementById("bankTransfer").addEventListener("click",()=>{
            disable()
        });
    });
});

//Funcion que chequea las validaciones y permite seguir o no con la compra
(function validacion () {
    "use strict"
  
    //busca todos los forms y revisa las validaciones de bootstrap
    var forms = document.querySelectorAll(".needs-validation")
  
    //revisa todos en loop y previene que se envie por error
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener("submit", function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            alert("Compra realizada!")
          }
          form.classList.add("was-validated")
        }, false)
      })
  })();


//funcion para mostrar la informacion del json
function showingCartInfo(arrayCarrito) {
    let htmlContentToAppend = "";

    for (let i = 0; i < arrayCarrito.length; i++) {
        let articles = arrayCarrito[i]
        //toma todos los precios que son UYU y los pasa a dolares
        if (articles.currency === "UYU") {
            articles.unitCost = Math.round(articles.unitCost / 40);
            articles.currency = "USD";
        }
        htmlContentToAppend += `
                    <br>
                    <div class="list-group-item">
                    <div>
                    <br>
                    <div class="row">
                        <div class="col"><img src="${articles.image}" width="100px"></div>
                        <div class="col"><h4>${articles.name}</4></div>
                        <div class="col"><h4>${articles.currency} ${articles.unitCost}</4></div>
                        <div class="col"><h4><input type="number" onchange="subtotalCalc(${articles.unitCost},${articles.id}), cartSubtotal()" min="1" value="1" id="multiply${articles.id}" ${articles.count} class="needs-validation" novalidate required></4></div>
                        <div class="col"><h4>${articles.currency}</h4> <h4 class="price" id="totalItems${articles.id}">${articles.unitCost}</h4></div>
                        <button type="button" class="btn btn-outline-danger btn-sm erase"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
                `
    };
    document.getElementById("Cart").innerHTML = htmlContentToAppend;


    //recorre los inputs y reemplaza 
    for (let i = 0; i < erase.length; i++) {
        erase[i].addEventListener("click", () => {
            deleteThis(i);
        })
    };
    for (let i = 0; i < creditOpt.length; i++) {
        creditOpt[i].addEventListener("click", () => {
            deleteThis(i);
        })
    };
};

//funcion para realizar el calculo del subtotal

function subtotalCalc(cost, id) {

    let cant = document.getElementById("multiply" + id).value;

    return document.getElementById("totalItems" + id).innerHTML = cost * cant;
};


//calculo del subtotal
function cartSubtotal() {

    let price = document.getElementsByClassName("price");

    let valor = 0;
    //suma dentro del carrito
    for (a = 0; a < price.length; a++) {
        valor += parseFloat(price[a].innerHTML);
    }

    document.getElementById("subtotalArticulos").innerHTML = valor;


    //calculo del porcentaje de las opciones de envio
    let costForDelivery = 0;

    for (b = 0; b < percentage.length; b++) {
        if (percentage[b].checked) {
            costForDelivery = parseFloat(percentage[b].value) * valor;
        }
    }

    document.getElementById("cEnvio").innerHTML = Math.round(costForDelivery);

    //calculo total de la compra
    let subTotal = parseFloat(document.getElementById("subtotalArticulos").innerHTML);

    let totalEnvio = parseFloat(document.getElementById("cEnvio").innerHTML);

    total = subTotal + totalEnvio;

    document.getElementById("totalToPay").innerHTML = total;

};

//funcion que elimina el producto seleccionado del carrito
function deleteThis(i) {
    addArticulos.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(addArticulos));
    showingCartInfo(JSON.parse(localStorage.getItem("cart")));
    cartSubtotal();
};


//funcion que desabilita los inputs dependiendo lo que se seleccione
function disable(){

    let card = document.getElementById("creditCard");
    let bank = document.getElementById("bankTransfer");

    if(bank.checked === true){
        document.getElementById("cardName").disabled = true;
        document.getElementById("cardNumber").disabled = true;
        document.getElementById("cardExpire").disabled = true;
        document.getElementById("cardSecurity").disabled = true;
        document.getElementById("bankAccount").disabled = false;
    }
    else if(card.checked === true){
        document.getElementById("bankAccount").disabled = true;
        document.getElementById("cardName").disabled = false;
        document.getElementById("cardNumber").disabled = false;
        document.getElementById("cardExpire").disabled = false;
        document.getElementById("cardSecurity").disabled = false;
    }

};


