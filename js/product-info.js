// constantes para cargar en product-info.html el producto almacenado en localStorage
const productID = localStorage.getItem("productID");
const DATA_URL = PRODUCT_INFO_URL + productID + ".json";
const PRODUCT_COMMENTS = PRODUCT_INFO_COMMENTS_URL + productID + ".json";
// Fin constantes de carga categoria en products

// define constantes contenedor, print NOMBRE PRODUCTO
const contProductInfo = document.getElementById("divProductInfo");
const contImages = document.getElementById("divImages");
const contComments = document.getElementById("divComments");
const contRelProducts = document.getElementById("relatedProductList");
let currentProduct = [];
let commentProduct = [];

// Solicitud datos del Json, se realiza a traves de GETJSONDATA (INIT.JS)
// Solicitud COMENTARIOS Json
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(DATA_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProduct = resultObj.data;
      showProduct(currentProduct);
      for (const productRel of currentProduct.relatedProducts) {
        listProductRel(productRel);
      }
    }
  });
  getJSONData(PRODUCT_COMMENTS).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentProduct = resultObj.data;
      for (const comment of commentProduct) {
        contComments.innerHTML +=
          `<div class="card p-3">
            <p><b>${comment.user}</b> - ${comment.dateTime} - ${addStarsComment(comment.score)}</p>
            <p>${comment.description}</p>
            </div> `;
      }
    }
  });
});

// FUNCION PARA AÑADIR ESTRELLAS EN LOS COMENTARIOS
function addStarsComment(stars) {
  let htmlStars = "";
  let result = stars;
  for (let i = 0; i < 5; i++) {
    if (result > i) {
      htmlStars += `<span class="fa fa-star checked"></span>`;
    } else {
      htmlStars += `<span class="fa fa-star"></span>`;
    }
  }
  return htmlStars;
}

// FUNCION PARA MOSTRAR PRODUCTOS
function showProduct(currentProduct) {
  contProductInfo.innerHTML += `
    <div class="p-4">
      <div class="row m-4">
        <div class="col-8">
          <h2>${currentProduct.name}</h2>
        </div>
        <div class="col-4">
        <button type="button" class="btn btn-success" onclick="pushToCart(currentProduct)">Comprar</button>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-8">
          <b>Precio</b>
          <p> ${currentProduct.currency} ${currentProduct.cost}</p>
        </div>
        <div class="col-4">
          <a class="" href="products.html"> 🠔 Volver al listado</a>
        </div>
      </div>
      <div>
        <b>Descripción</b>
        <p> ${currentProduct.description}</p>
        <b>Categoría</b>
        <p> ${currentProduct.category}</p>
        <b>Cantidad de vendidos</b>
        <p> ${currentProduct.soldCount}</p>
        <b>Imágenes ilustrativas</b>
      </div>
    </div>`;
  for (const image of currentProduct.images) {
    contImages.innerHTML += `
      <div class="carousel-item">
      <img src="${image}" class="d-block w-100" alt="...">
      </div>`;
  }
  document.getElementsByClassName("carousel-item")[0].className += " active";
}

// FUNCION AGREGAR COMENTARIOS (LOCAL)
const formNewComment = document.getElementById("commentForm");

formNewComment.addEventListener("submit", function (event) {
  event.preventDefault();

  let newComment = document.getElementById("commentText").value;
  let scoreValueComment = document.getElementById("scoreComment").value;

  var hoy = new Date();
  var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

  comment = {
    dateTime: fecha + " " + hora,
    description: newComment,
    score: parseInt(scoreValueComment),
    user: localStorage.getItem("userE"),
  };
  contComments.innerHTML +=
    `<div class="card p-3">
  <p><b>${comment.user}</b> - ${comment.dateTime} - ${addStarsComment(comment.score)}</p>
  <p>${comment.description}</p>
  </div> `;
});

// FUNCION PARA MOSTRAR PRODUCTOS RELACIONADOS
function listProductRel(productRel) {
  contRelProducts.innerHTML += `

    <div class="list-group-item list-group-item-action cursor-active m-3" style="width: 25%;" onclick="setProductID(${productRel.id})">
        <img src="${productRel.image}" class="img-thumbnail m-1" style="width: 300px;">
        <p>${productRel.name}</p>

    </div> `;
};

// FUNCION PRODUCTO A CARRITO
function pushToCart(currentProduct) {
  // ESTRUCTURA DE PRODUCTO A CARRITO TOMA VALORES DE CURRENTPRODUCT Y CREA UN OBJETO NUEVO
  let productToCart = {
    id: currentProduct.id,
    name: currentProduct.name,
    count: 1,
    unitCost: currentProduct.cost,
    currency: currentProduct.currency,
    image: currentProduct.images[0],
  };

  // COMPRUEBA SI EXISTE USERCART EN LOCAL STORAGE
  if (localStorage.getItem("userCart") == null) {
    // SINO CREA EL PRIMER OBJETO (EJEMPLO PEU 208)
    let currentCart = {
      user: 25801,
      articles: [
        {
          id: 50924,
          name: "Peugeot 208",
          count: 1,
          unitCost: 15200,
          currency: "USD",
          image: "img/prod50924_1.jpg",
        },
      ],
    };
    if (productToCart.id != 50924) { // ANALIZA SI EL PRODUCTO A AGREGAR ES DISTINTO AL 50924 (PRODUCTO DE PRUEBA OBLIGATORIO)
      currentCart.articles.push(productToCart); // SI ES DISTINTO, PUSHEA EL OBJETO productToCar A CURRENTCART
      localStorage.setItem("userCart", JSON.stringify(currentCart));
      alert("Agregado al carrito");
    } else {
      currentCart.articles.count += 1; // SI ES EL MISMO SOLO AUMENTA LA CANTIDAD DEL ART + 1
      localStorage.setItem("userCart", JSON.stringify(currentCart));
      alert("Agregamos otra unidad al carrito");
    }
  } else {
    // SI EXISTE AGREGA EL ARTICULO NUEVO AL ARRAY
    currentCart = JSON.parse(localStorage.getItem("userCart"));
    const product = currentCart.articles.map((prod) => prod.id).indexOf(productToCart.id);
    if (product == -1) {
      currentCart.articles.push(productToCart);
      alert("Agregado al carrito");
    } else {
      currentCart.articles[product].count += 1;
      alert("Agregamos otra unidad al carrito");
    }
    localStorage.setItem("userCart", JSON.stringify(currentCart));
  }
};

// SET PRODUCTID EN LOCAL STORAGE
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}