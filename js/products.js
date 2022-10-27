const ordenPorPrecioAlto = "AZ";
const ordenPorPrecioBajo = "ZA";
const ordenPorCantProd = "Cant.";
let corriendoElArray = [];
let currentSortCriteria = undefined;
let costoMinimo = undefined;
let costoMaximo = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ordenPorPrecioAlto) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ordenPorPrecioBajo) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ordenPorCantProd) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

//local storage id info productos
function productID(id) {
    localStorage.setItem("gInfo", id);
    window.location = "product-info.html"
}


//funcion para mostrar productos en el apartado products
function mostrandoProductos(corriendoElArray) {

    let htmlContentToAppend = "";

    for (let i = 0; i < corriendoElArray.length; i++) {

        let products = corriendoElArray[i];
        if (((costoMinimo == undefined) || (costoMinimo != undefined && parseInt(products.cost) >= costoMinimo)) &&
            ((costoMaximo == undefined) || (costoMaximo != undefined && parseInt(products.cost) <= costoMaximo))) {

            htmlContentToAppend += `
            <div onclick="productID(${products.id})" class="list-group-item list-group-item-action cursor-active">    
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("productosLista").innerHTML = htmlContentToAppend;
    }
}


//funcion para ordenar y mostrar 
function ordenarYMostrar(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        corriendoElArray = categoriesArray;
    }

    corriendoElArray = sortCategories(currentSortCriteria, corriendoElArray);

    mostrandoProductos(corriendoElArray);
}


document.addEventListener("DOMContentLoaded", () => {
    getJSONData(productosdata).then(function (resultObj) {
        if (resultObj.status === "ok") {
            corriendoElArray = resultObj.data.products
            mostrandoProductos(corriendoElArray)
        }
    });

    document.getElementById("sortAsc").addEventListener("click", () => {
        ordenarYMostrar(ordenPorPrecioAlto);
    });

    document.getElementById("sortDesc").addEventListener("click", () => {
        ordenarYMostrar(ordenPorPrecioBajo);
    });

    document.getElementById("sortByCount").addEventListener("click", () => {
        ordenarYMostrar(ordenPorCantProd);
    });

    document.getElementById("rangoDePrecios").addEventListener("click", () => {
        costoMinimo = document.getElementById("filtroCostoMinimo").value;
        costoMaximo = document.getElementById("filtroCostoMaximo").value;

        if ((costoMinimo != undefined) && (costoMinimo != "") && (parseInt(costoMinimo)) >= 0) {
            costoMinimo = parseInt(costoMinimo);
        }
        else {
            costoMinimo = undefined;
        }

        if ((costoMaximo != undefined) && (costoMaximo != "") && (parseInt(costoMaximo)) >= 0) {
            costoMaximo = parseInt(costoMaximo);
        }
        else {
            costoMaximo = undefined;
        }

        mostrandoProductos(corriendoElArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", () => {
        document.getElementById("filtroCostoMinimo").value = "";
        document.getElementById("filtroCostoMaximo").value = "";

        costoMinimo = undefined;
        costoMaximo = undefined;

        mostrandoProductos(corriendoElArray);
    });

    document.getElementById("busqueda").addEventListener("keyup", () => {
        buscarProductos(corriendoElArray);
    });

});

//funcion para buscar productos en tiempo real
function buscarProductos(corriendoElArray) {

    let buscandoo = document.getElementById("busqueda").value;

    let filtrito = corriendoElArray.filter(products => {
        return (products.name.toLowerCase().indexOf(buscandoo.toLowerCase()) > -1) || (products.description.toLowerCase().indexOf(buscandoo.toLowerCase()) > -1)

    });

    mostrandoProductos(filtrito);
    console.log(filtrito);
};

