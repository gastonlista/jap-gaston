let corriendoElArrayVacio = [];
let commentsxl = [];


document.addEventListener("DOMContentLoaded", () => {
    getJSONData(juguetitos).then(function (resultObj) {
        if (resultObj.status === "ok") {
            corriendoElArrayVacio = resultObj.data
            mostrandoProductos(corriendoElArrayVacio)
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    getJSONData(comentariardos).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsxl = resultObj.data
            comentarioscomiendo(commentsxl)
        }
    });
});


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
                <div onclick="juguetitosID(${relatedProduct.id})">
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

function juguetitosID(id){
    localStorage.setItem("juegardos", id);
    window.location = "product-info.html"
};


function comentarioscomiendo(commentsxl) {

    let htmlContentToAppend = "";
    for (let i = 0; i < commentsxl.length; i++) {

        let products = commentsxl[i]; {

            htmlContentToAppend += `
                <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                <div>
                    <br>
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.user} - ${products.dateTime} - <i id="estrellas"> ` + estrellardas(products.score) + `
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




function estrellardas(estre) {
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





function mementario() {
    let username = localStorage.getItem("username");
    let addcomentario = document.getElementById("comentario").value
    let estrellitadondevas = document.getElementById("estrellitas").value
    let calificacion = estrellardas()
    let now = new Date().toLocaleDateString('es', { day: "numeric", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })
    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
        <div class="d-flex w-100 justify-content-between">    
        <h4 class="mb-1">`+ username + " " + "-" + now + "-" + " " + estrellardas(estrellitadondevas) + `</h4>
        </div>
        </div>
        <p>`+ addcomentario + `</p>
        </div>
        
            `

    document.getElementById("calificaciones").innerHTML += htmlContentToAppend;
};














