const ordenPorPrecioAlto = "AZ";
const ordenPorPrecioBajo = "ZA";
const ordenPorCantProd = "Cant.";
let corriendoelarray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

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

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function mostrandoProductos() {

    let htmlContentToAppend = "";
    for (let i = 0; i < corriendoelarray.length; i++) {

        let products = corriendoelarray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(products.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.soldCount) <= maxCount))) {

            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
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
        document.getElementById("productoslista").innerHTML = htmlContentToAppend;
        document.getElementById("lista").innerHTML
    }
}



function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        corriendoelarray = categoriesArray;
    }

    corriendoelarray = sortCategories(currentSortCriteria, corriendoelarray);

    mostrandoProductos();
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(productosdata).then(function (resultObj) {
        if (resultObj.status === "ok") {
            corriendoelarray = resultObj.data.products
            mostrandoProductos()
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ordenPorPrecioAlto);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ordenPorPrecioBajo);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ordenPorCantProd);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        mostrandoProductos();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        mostrandoProductos();
    });
});