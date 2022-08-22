const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const container = document.getElementById("container");

// Función para mostrar productos cargados de JSON
function showProducts(listProducts) {

    for (const products of listProducts) {
        container.innerHTML += `
        <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${products.image}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${products.name} - USD ${products.cost}</h4>
                    <small class="text-muted">${products.soldCount} Vendidos</small>
                </div>
                <p class="mb-1">${products.description}</p>
            </div>
        </div>
    </div>
    `

    }
}

// Solicitud datos del Json, se realiza a traves de GETJSONDATA (INIT.JS)
getJSONData(DATA_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        showProducts(resultObj.data.products)
    }
});