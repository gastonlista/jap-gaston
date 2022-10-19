let corriendoElArrayVacio = [];
let commentsxl = [];
let addingCartProd = [];

//fetch para agregar cosas al carrito
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(infoProducts).then(function (resultObj) {
        if (resultObj.status === "ok") {
            corriendoElArrayVacio = resultObj.data
            mostrandoProductos(corriendoElArrayVacio)
        }
        let cart = localStorage.getItem("cart");
        //agregando el nuevo objeto del cart a la lista
        if (cart != null) {
            //muestra lo que está guardado
            addingCartProd = JSON.parse(localStorage.getItem("cart")); 
        }
    });
});

//fetch
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(settedComments).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsxl = resultObj.data
            addingComments(commentsxl)
        }
    });
});

//funcion para mostrar los productos en pantalla
function mostrandoProductos(corriendoElArrayVacio) {
    let productosxl = ""
    let htmlContentToAppend = "";
    {
        {
            htmlContentToAppend += `
            <br>
            <br>
            <h2 class="mb"><strong>${corriendoElArrayVacio.name}</strong></h2>
            <br>
                <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                <div class=" justify-content-between">

                 <h4 class="mb-1">
                 <div class="justify-content-between"><strong>Precio</strong></div>
                 <p class="mb-1 text-muted">${corriendoElArrayVacio.currency} $ ${corriendoElArrayVacio.cost}</p> 
                 <br>
                 <div><strong>Descripcion</strong></div>
                 <p class="mb-1 text-muted">${corriendoElArrayVacio.description}</p>
                 <br>
                 <div><strong>Categoria</strong></div>
                 <p class="mb-1 text-muted">${corriendoElArrayVacio.category} </p>
                  <br>
                  <div><strong>Cantidad vendidos</strong></div>
                 <p class="mb-1 text-muted">${corriendoElArrayVacio.soldCount} </p>
                 <br>
                 <div><strong>Imagenes del producto</strong></div>
                  </h4>
                  </div>
                  
                  <div>
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-Dark">
            </div>
        <div class="carousel-inner">
              <div class="carousel-item active" style="color: black">
              <div class="d-flex justify-content-center">
                <img src="${corriendoElArrayVacio.images[0]}" class="d-block w-400">
                </div>
              </div>
              <div class="carousel-item">
              <div class="d-flex justify-content-center">
                <img src="${corriendoElArrayVacio.images[1]}" class="d-block w-400">
                </div>
              </div>
              <div class="carousel-item">
              <div class="d-flex justify-content-center">
                <img src="${corriendoElArrayVacio.images[2]}" class="d-block w-400">
                </div>
              </div>
              <div class="carousel-item">
              <div class="d-flex justify-content-center">
              <img src="${corriendoElArrayVacio.images[3]}" class="d-block w-400">
              </div>
            </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" style="color: black">
              <span class="carousel-control-prev-icon" aria-hidden="true" style="color: black"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next" style="color: black">
              <span class="carousel-control-next-icon" aria-hidden="true" style="color: black"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          </div>
          <br>
             `

            for (let i = 0; i < corriendoElArrayVacio.relatedProducts.length; i++) {
                let relatedProduct = corriendoElArrayVacio.relatedProducts[i]
                productosxl += `
                <div onclick="productID(${relatedProduct.id})">
                    <h5 class="text-center">${relatedProduct.name}</h5>
                    
                <img src="${relatedProduct.image}" width ="200px">
                </div>
                `
            };

        };
        document.getElementById("productosLista3").innerHTML = productosxl;
        document.getElementById("productosLista").innerHTML = htmlContentToAppend;
    };
};
//local storage para la id de los productos
function productID(id) {
    localStorage.setItem("productsDetails", id);
    window.location = "product-info.html"
};

//funcion para ver los comentarios que ya estaban en el json
function addingComments(commentsxl) {

    let htmlContentToAppend = "";
    for (let i = 0; i < commentsxl.length; i++) {

        let products = commentsxl[i]; {

            htmlContentToAppend += `
                <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                <div>
                    <br>
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.user} - ${products.dateTime} - <i id="estrellas"> ` + stars(products.score) + `
                            </div></h4>
                            <p class="mb-1">${products.description}</p>
                        </div>
                        <p class="mb-1"></p>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("productosLista2").innerHTML = htmlContentToAppend;
    };
};


//funcion para aplicar una cantidad de estrellas
function stars(estre) {
    let calificacion = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= estre) {
            calificacion += `<i class="fa fa-star checked" style="color: #f3da35"></i>`;
        } else {
            calificacion += `<i class="fa fa-star"></i>`;
        }
    }
    return calificacion;
};




//funcion para agregar comentarios propios del usuario logueado
function addComms() {
    let username = localStorage.getItem("username");
    let addcomentario = document.getElementById("comentario").value
    let getStars = document.getElementById("estrellitas").value
    let calificacion = stars()
    let now = new Date().toLocaleDateString('es', { day: "numeric", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })
    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
        <div class="d-flex w-100 justify-content-between">    
        <h4 class="mb-1">`+ username + " " + "-" + now + "-" + " " + stars(getStars) + `</h4>
        </div>
        </div>
        <p>`+ addcomentario + `</p>
        </div>
        
            `

    document.getElementById("calificaciones").innerHTML += htmlContentToAppend;
};


//funcion que agrega productos al cart

function addToCart(corriendoElArrayVacio) {

    let newArt = {};

    newArt.id = corriendoElArrayVacio.id;
    newArt.image = corriendoElArrayVacio.images[0];
    newArt.name = corriendoElArrayVacio.name;
    newArt.currency = corriendoElArrayVacio.currency;
    newArt.unitCost = corriendoElArrayVacio.cost;
    newArt.count = "1";

    addingCartProd.push(newArt); //se agrega al array nuevo
    localStorage.setItem("cart", JSON.stringify(addingCartProd)); //se guarda en local storage como string

    location.href = "cart.html";
};












