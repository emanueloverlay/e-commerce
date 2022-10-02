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
});

// Solicitud COMENTARIOS del Json, se realiza a traves de GETJSONDATA (INIT.JS)
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_COMMENTS).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentProduct = resultObj.data;
      for (const comment of commentProduct) {
        listCommentProduct(comment);
      }
    }
  });
});

// FUNCION PARA MOSTRAR PRODUCTOS
function showProduct(currentProduct) {
  contProductInfo.innerHTML += `

    <div class="p-4">
        <h2>${currentProduct.name}</h2>
        <hr>
        <b>Precio</b>
        <p> ${currentProduct.currency} ${currentProduct.cost}</p>
        <b>Descripción</b>
        <p> ${currentProduct.description}</p>
        <b>Categoría</b>
        <p> ${currentProduct.category}</p>
        <b>Cantidad de vendidos</b>
        <p> ${currentProduct.soldCount}</p>
        <b>Imágenes ilustrativas</b>
    </div>`

  for (const image of currentProduct.images) {
    contImages.innerHTML += `
    <div class="carousel-item">
    <img src="${image}" class="d-block w-100" alt="...">
    </div>`
  }
  document.getElementsByClassName("carousel-item")[0].className += " active";
};

// FUNCION PARA MOSTRAR COMENTARIOS
function listCommentProduct(comment) {
  if (comment.score === 5) {
    contComments.innerHTML += `
            <div class="card p-3">
            <p><b>${comment.user}</b> - ${comment.dateTime} -
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span></p>
            <p>${comment.description}</p>
            </div> `;
  }
  if (comment.score === 4) {
    contComments.innerHTML += `
            <div class="card p-3">
            <p><b>${comment.user}</b> - ${comment.dateTime} -
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span></p>
            <p>${comment.description}</p>
            </div> `;
  }
  if (comment.score === 3) {
    contComments.innerHTML += `
            <div class="card p-3">
            <p><b>${comment.user}</b> - ${comment.dateTime} -
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span></p>
            <p>${comment.description}</p>
            </div> `;
  }
  if (comment.score === 2) {
    contComments.innerHTML += `
            <div class="card p-3">
            <p><b>${comment.user}</b> - ${comment.dateTime} -
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span></p>
            <p>${comment.description}</p>
            </div> `;
  }
  if (comment.score === 1) {
    contComments.innerHTML += `
            <div class="card p-3">
            <p><b>${comment.user}</b> - ${comment.dateTime} -
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span></p>
            <p>${comment.description}</p>
            </div> `;
  }
}

// FUNCION AGREGAR COMENTARIOS (LOCAL)
const formNewComment = document.getElementById("commentForm");

formNewComment.addEventListener("submit", function (event) {
  event.preventDefault();

  let newComment = document.getElementById("commentText").value;
  let scoreValueComment = document.getElementById("scoreComment").value;

  var hoy = new Date();
  var fecha =
    hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

  comment = {
    dateTime: fecha + " " + hora,
    description: newComment,
    score: parseInt(scoreValueComment),
    user: localStorage.getItem("userE"),
  };
  listCommentProduct(comment);
});

// FUNCION PARA MOSTRAR PRODUCTOS RELACIONADOS
function listProductRel(productRel) {
  contRelProducts.innerHTML += `

    <div class="list-group-item list-group-item-action cursor-active m-3" style="width: 25%;" onclick="setProductID(${productRel.id})">
        <img src="${productRel.image}" class="img-thumbnail m-1" style="width: 300px;">
        <p>${productRel.name}</p>

    </div> `;
  };

  // LOCAL STORAGE PRODUCTO
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}