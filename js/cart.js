let arrayCarrito = [];


document.addEventListener("DOMContentLoaded", () => {
    getJSONData(cartData).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartData = resultObj.data
            showingCartInfo(cartData)
            console.log(cartData)
        }
    });
});


function showingCartInfo(arrayCarrito) {
    let htmlContentToAppend = "";

    const infoCart = arrayCarrito.articles;
    for (let i = 0; i < infoCart.length; i++) {

        function calcSubtotal() {

            subtotal = articles.unitCost * parseInt(document.getElementById("multiply").value);
            console.log(document.getElementById("multiply").value) -
                console.log(subtotal);
            document.getElementById("itemTotales").innerHTML = subtotal;
        };

        let articles = infoCart[i]
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
                        <div class="col"><img src="${articles.image}" width="100px"></div>
                        <div class="col"><h4>${articles.name}</4></div>
                        <div class="col"><h4>${articles.currency} ${articles.unitCost}</4></div>
                        <div class="col"><h4><input type="number" min="1" id="multiply" ${articles.count}></4></div>
                        <div class="col"><h4>${articles.currency}</h4> <h4 id="itemTotales">${articles.unitCost}</h4></div>
                        </div>
                    </div>
                </div>
                `

    };
    document.getElementById("Cart").innerHTML = htmlContentToAppend;
    document.getElementById("Cart").innerHTML = htmlContentToAppend;
    document.getElementById("multiply").addEventListener("input", calcSubtotal);

};


