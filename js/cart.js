let arrayCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(carritox).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carritox = resultObj.data
            carlitos(carritox)
            console.log(carritox)
        }
    });
});


function carlitos(carritox) {

    let htmlContentToAppend = "";
    let { } = carritox

    htmlContentToAppend += `
                <br>
                <br>
                <h1 class="d-flex w-100 justify-content-center">Carrito de compras</h1>
                <br>
                <br>
                
                <h3>Articulos a comprar</h3>
                <div class="list-group-item justify-content-between">
                <div class="row">
                        <div class="col"><h4>Imagen</4></div>
                        <div class="col"><h4>Nombre</4></div>
                        <div class="col"><h4>Costo</4></div>
                        <div class="col"><h4>Cantidad</4></div>
                        <div class="col"><h4>Subtotal</4></div>
                        </div>
                    </div>
                    <br>
                    <div class="list-group-item">
                    <div class="row">
                    <div>
                    <br>
                    <div class="row">
                        <div class="col"><img src="${carritox.articles[0].image}" width="100px"></div>
                        <div class="col"><h4>${carritox.articles[0].name}</4></div>
                        <div class="col"><h4>${carritox.articles[0].currency} ${carritox.articles[0].unitCost}</4></div>
                        <div class="col"><h4><input type="number" onchange="setItemValues()" placeholder="1"${carritox.articles[0].count}></4></div>
                        <div class="col"><h4>${carritox.articles[0].currency}</h4> <h4 id="itemTotales">${carritox.articles[0].unitCost}</h4></div>
                        </div>
                    </div>
                </div>
            `

    document.getElementById("carlitosCarrito").innerHTML = htmlContentToAppend;
};

/*setItemValues(arrayCarrito) ;{
    let tempTotal = 0;
    let itemTotal = 0;
    carrito.map(item => {
        tempTotal += item.unitCost * item.count;
        itemTotal += item.count;
    });
    carritoTotal.innerText = parseFloat(tempTotal.toFixed(2));
    document.querySelector("itemTotales") = itemTotal
};*/