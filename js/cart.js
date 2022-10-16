CONTNAINERCART = document.getElementById("containerCart");
const DATA_URL = CART_INFO_URL + "25801" + ".json";

//ARRAY CARRITO VACIO
let currentCart = [];

// FETCH JSON
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(DATA_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      //EVALUA SI EL CARRITO NO EXISTE EN LOCALSTORAGE, EN ESE CASO TOMA LOS DATOS DEL JSON Y SETEA EL ITEM EN LS
      if (localStorage.getItem("userCart") == null) {
        currentCart = resultObj.data;
        localStorage.setItem("userCart", JSON.stringify(currentCart));
        showCart(currentCart);
      } else {
        // SI EXISTE CARRITO EN LOCAL STORAGE REALIZA GET DE DATOS
        currentCart = JSON.parse(localStorage.getItem("userCart"));
        showCart(currentCart);
      }
    }
  });
});

// FUNCION DE MUESTRA CARRITO EN PANTALLA
function showCart(currentCart) {
  const tableCart = document.getElementById("tableCart");
  for (const article of currentCart.articles) {
    const subTotal = article.unitCost * article.count;
    let tdId = "C" + article.id; // VARIABLE PARA NOMBRAR CELDA SUBTOTAL
    tableCart.innerHTML += 
          `<tr>
            <td scope="row"><img src="${article.image}" style="width: 50px; "></td>
            <td>${article.name}</td>
            <td>${article.currency} ${article.unitCost.toLocaleString()}</td>
            <td><input id="${article.id}" type="number" value="${article.count}" min="1" style="width: 100px" class="text-center" oninput="updateSubTotal(${article.id})"></input></td>
            <td id="${tdId}">${article.currency} ${subTotal.toLocaleString()}</td>
          </tr>`;
  }
}

function updateSubTotal(article_id) {
  const productIndex = currentCart.articles.map((prod) => prod.id).indexOf(article_id); // MAPEAMOS EL CARRITO Y LOCALIZAMOS EL PRODUCTO CON ID (ARTICLE_ID)
  const inputvalue = document.getElementById(article_id).value; // VALOR DE INPUT CANTIDAD DE PRODUCTO
  const productCost = currentCart.articles[productIndex].unitCost; // CONSTANTE PARA TOMAR EL COSTO DEL PRODUCTO (BUSCA EN EL ARRAY SEGUN INDEX)
  const subTotal = productCost * inputvalue;
  const tdprint = document.getElementById("C" + article_id); // REFERENCIA A CELDA SUBTOTAL 
  tdprint.innerHTML = `<td id="C${article_id}">${currentCart.articles[productIndex].currency} ${subTotal.toLocaleString()}</td>`;
  currentCart.articles[productIndex].count = inputvalue; //ASIGNA NUEVO VALOR DE CANTIDAD DE PRODUCTO EN EL CARRITO
  localStorage.setItem("userCart", JSON.stringify(currentCart));
}