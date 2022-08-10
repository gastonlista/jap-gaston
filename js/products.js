let datos = "https://japceibal.github.io/emercado-api/cats_products/101.json"

fetch(datos).then
    (respuesta => respuesta.json()).then(respuestadatos => {
        for (let dato of respuestadatos.products) {
            let creartabla = `
     <div onclick="setCatID(101)" class="list-group-item list-group-item-action cursor-active">
     <div class="row">
         <div class="col-3">
             <img src="`+dato.image+`" alt="Los mejores precios en autos 0 kilómetro, de alta y media gama." class="img-thumbnail">
         </div>
         <div class="col">
             <div class="d-flex w-100 justify-content-between">
                 <h4 class="mb-1">`+dato.name+`  -  `+dato.currency+` `+dato.cost+`</h4>
                 <small class="text-muted">`+dato.soldCount+` articulos</small>
             </div>
             <p class="mb-1">`+dato.description+`</p>
         </div>
     </div>
 </div>
 `;
 document.getElementById(productosautos.innerHTML += creartabla)
        }
    })








