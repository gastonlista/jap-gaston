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
                    <div class="row justify-content-between">
                    <img src="${corriendoElArrayVacio.images[0]}" class="img-thumbnail class="mx-auto" style="width: 1000px;"> 
                    <img src="${corriendoElArrayVacio.images[1]}" class="img-thumbnail class="mx-auto" style="width: 300px;">
                    <img src="${corriendoElArrayVacio.images[2]}" class="img-thumbnail class="mx-auto" style="width: 300px;">
                    <img src="${corriendoElArrayVacio.images[3]}" class="img-thumbnail class="mx-auto" style="width: 300px;">
                    </div>
                    <br>
            </div>
            <h4 class="mb-1">
            <div><strong>Comentarios</strong></div>
            </h4>
             `
        };
        document.getElementById("productosLista").innerHTML = htmlContentToAppend;
    };
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
    let now = new Date();
    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
        <div class="d-flex w-100 justify-content-between">    
        <h4 class="mb-1">`+ username + " " + "-" + now + "-" + " "+ estrellardas(estrellitadondevas)+`</h4>
        </div>
        </div>
        <p>`+addcomentario+`</p>
        </div>
        
            `

    document.getElementById("calificaciones").innerHTML += htmlContentToAppend;
};














