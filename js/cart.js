CONTNAINERCART = document.getElementById("containerCart");
const DATA_URL = CART_INFO_URL + "25801" + ".json";
const formCartPayment = document.getElementById("formCartPayment")

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
        showTotalsCart();
      } else {
        // SI EXISTE CARRITO EN LOCAL STORAGE REALIZA GET DE DATOS
        currentCart = JSON.parse(localStorage.getItem("userCart"));
        showCart(currentCart);
        showTotalsCart();
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
            <td><input id="${article.id}" type="number" value="${article.count}" min="1" style="width: 80px" class="text-center" oninput="updateSubTotal(${article.id})"></input></td>
            <td id="${tdId}">${article.currency} ${subTotal.toLocaleString()}</td>
            <td>
            
            <button type="button" class="btn btn-outline-secondary" onclick="deleteProduct(${article.id})" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>
            <span class="visually-hidden">Button</span>
            </button>
            
            
            </td>
          </tr>`;
  }
};

function updateSubTotal(article_id) {
  const productIndex = currentCart.articles.map((prod) => prod.id).indexOf(article_id); // MAPEAMOS EL CARRITO Y LOCALIZAMOS EL PRODUCTO CON ID (ARTICLE_ID)
  const inputValue = document.getElementById(article_id); // VALOR DE INPUT CANTIDAD DE PRODUCTO

  // COMPROBAMOS QUE EL VALOR DEL INPUT CON LA CANTIDAD DE ART, NO ESTE VACIO O SEA IGUAL A 0.
  if (inputValue.value.length == 0 || inputValue.value == 0) {
    inputValue.value = 1;
  }

  const productCost = currentCart.articles[productIndex].unitCost; // CONSTANTE PARA TOMAR EL COSTO DEL PRODUCTO (BUSCA EN EL ARRAY SEGUN INDEX)
  const subTotal = productCost * inputValue.value;
  const tdprint = document.getElementById("C" + article_id); // REFERENCIA A CELDA SUBTOTAL 
  tdprint.innerHTML = `<td id="C${article_id}">${currentCart.articles[productIndex].currency} ${subTotal.toLocaleString()}</td>`;
  currentCart.articles[productIndex].count = inputValue.value; //ASIGNA NUEVO VALOR DE CANTIDAD DE PRODUCTO EN EL CARRITO
  localStorage.setItem("userCart", JSON.stringify(currentCart));
  showTotalsCart();
};

// FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO
function deleteProduct(article_id) {
  const productIndex = currentCart.articles.map((prod) => prod.id).indexOf(article_id); // MAPEAMOS EL CARRITO Y LOCALIZAMOS EL PRODUCTO CON ID (ARTICLE_ID)
  currentCart.articles.splice(productIndex, 1);
  localStorage.setItem("userCart", JSON.stringify(currentCart));
  const tableCart = document.getElementById("tableCart");
  tableCart.innerHTML = "";
  showCart(currentCart);
  showTotalsCart();
};

//FUNCION PARA IMPRIMIR TOTALES DEBAJO DEL CARRITO
function showTotalsCart() {
  // SUBTOTAL
  const printSubTotalCart = document.getElementById("printSubTotalCart");
  let subTotalCart = 0;
  for (const article of currentCart.articles) {
    if (article.currency == "UYU") {
      subTotalCart += Math.round((article.unitCost * article.count) / 41);
    } else {
      subTotalCart += Math.round(article.unitCost * article.count);
    }
  }
  printSubTotalCart.innerHTML = `<p>USD ${subTotalCart.toLocaleString()}</p>`;

  // COSTO ENVIO
  const printShipCart = document.getElementById("printShipCart");
  const shippingOpt = document.querySelector('input[name="shippingOpt"]:checked');

  if (shippingOpt != null) {
    let totalShippCost = ((subTotalCart * shippingOpt.value) / 100);
    printShipCart.innerHTML = `<p>USD ${Math.round(totalShippCost).toLocaleString()}</p>`;

    // TOTAL
    let totalCart = 0;
    const printTotalCart = document.getElementById("printTotalCart");
    totalCart = subTotalCart + totalShippCost;
    printTotalCart.innerHTML = `<p>USD ${Math.round(totalCart).toLocaleString()}</p>`;
  }
};


// PAYMENT METHOD FUNCTION (CREDITCARD OR TRANSFERBANK)
function paymentMethodFunction() {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  const typePaymentPrint = document.getElementById("typePaymentPrint");
  const bankNumber = document.getElementById("bankNumber");
  const creditCardNumber = document.getElementById("creditCardNumber");
  const creditCardSecurity = document.getElementById("creditCardSecurity");
  const creditCardExpiration = document.getElementById("creditCardExpiration");

  if (paymentMethod.id == "transferBank") {
    creditCardNumber.disabled = true;
    creditCardSecurity.disabled = true;
    creditCardExpiration.disabled = true;
    bankNumber.disabled = false;
  }

  if (paymentMethod.id == "creditCard") {
    creditCardNumber.disabled = false;
    creditCardSecurity.disabled = false;
    creditCardExpiration.disabled = false;
    bankNumber.disabled = true;
  }
  // PRINT PAYMENT METHOD
  if (paymentMethod != null) {
    typePaymentPrint.innerHTML = `${paymentMethod.value} &nbsp; `;
  }
};

// EVENTO LISTENER FORMULARIO
formCartPayment.addEventListener('submit', event => {
  checkPayment();
  if (!(formCartPayment.checkValidity() && checkPayment())) {
    formCartPayment.classList.add('was-validated')
    event.preventDefault()
    event.stopPropagation()
  } else {
    paymentProcessSuccessful();
    event.preventDefault()
  }
});

// FUNCION PARA VALIDAR PAGO
function checkPayment() {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  const typePaymentPrint = document.getElementById("typePaymentPrint");
  const bankNumber = document.getElementById("bankNumber");
  const creditCardNumber = document.getElementById("creditCardNumber");
  const creditCardSecurity = document.getElementById("creditCardSecurity");
  const creditCardExpiration = document.getElementById("creditCardExpiration");

  if (paymentMethod == null) {
    typePaymentPrint.classList.add("is-invalid");
    typePaymentPrint.classList.remove("is-valid");
  } else {
    if (paymentMethod.id == "transferBank" && bankNumber.value.length >= 1) {
      typePaymentPrint.classList.remove("is-invalid");
      typePaymentPrint.classList.add("is-valid");
      return true;
    }
    if (paymentMethod.id == "creditCard" && creditCardNumber.value.length >= 12 && creditCardSecurity.value.length >= 3 && creditCardExpiration.value.length >= 4) {
      typePaymentPrint.classList.remove("is-invalid");
      typePaymentPrint.classList.add("is-valid");
      return true;
    } else {
      typePaymentPrint.classList.add("is-invalid");
      typePaymentPrint.classList.remove("is-valid");
      return false;
    }
  }
};

// IMPRIME EN PANTALLA QUE EL PAGO SE REALIZÓ CON EXITO
function paymentProcessSuccessful() {
  const confirmAlertBuy = document.getElementById("confirmAlertBuy")
  confirmAlertBuy.innerHTML =
    `<div class="alert alert-success alert-dismissible" role="alert">
         <div><p>¡Has comprado con éxito!</p></div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> `
};