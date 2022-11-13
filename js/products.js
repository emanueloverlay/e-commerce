// constantes para cargar en products.html solo la categoria almacenada en localStorage
const categoryID = localStorage.getItem("catID");
const DATA_URL = PRODUCTS_URL + categoryID + ".json";
// Fin constantes de carga categoria en products

// define constantes contenedor y print CATEGORYID
const container = document.getElementById("container");
const categoryIDprint = document.getElementById("catProducts");

// constantes para filtrado
const ORDER_ASC_BY_PRICE = "up";
const ORDER_DESC_BY_PRICE = "down";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let minCount = undefined;
let maxCount = undefined;

// // Función para mostrar productos cargados de JSON
function showProducts(listProducts) {
    container.innerHTML = "";
    for (const products of listProducts) {

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {

            container.innerHTML += `
        <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${products.image}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                    <small class="text-muted">${products.soldCount} Vendidos</small>
                </div>
                <p class="mb-1">${products.description}</p>
            </div>
        </div>
    </div>
    `
        }
    }
};


// Solicitud datos del Json, se realiza a traves de GETJSONDATA (INIT.JS)
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(DATA_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            categoryIDprint.innerHTML = resultObj.data.catName; // imprime nombre de categoria.
            showProducts(currentProductsArray);
        }
    });
});

// Función para filtrar resultados
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });

    } else if (criteria === ORDER_BY_PROD_COUNT) {
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

function sortAndShowProducts(sortCriteria, productsArray) {
    sortProducts(sortCriteria, currentProductsArray);
    showProducts(currentProductsArray);
}

//BOTONES FILTRO

document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
});

document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
});

document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_COUNT);
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

    showProducts(currentProductsArray);
});

document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;
    showProducts(currentProductsArray);
});

// Buscador en tiempo real de los resultados
function searchFunction() {

    let searchInput = document.getElementById("inputBuscar").value;
    const searchProduct = currentProductsArray.filter((element) => {
        return (
            element.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            element.description.toLowerCase().includes(searchInput.toLowerCase())
        );
    });

    showProducts(searchProduct);
};

// LOCAL STORAGE PRODUCTO
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
};