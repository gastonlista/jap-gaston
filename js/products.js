let productsArray = [];
function showProductsList(array){
    
    let htmlContentToAppend = "";
    
    for(let i = 0; i < array.products.length; i++){ 
        
        let products = array.products[i];
        
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
    document.getElementById("lista").innerHTML = array.catName;
}

document.addEventListener("DOMContentLoaded", ()=>{
    
    getJSONData(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}