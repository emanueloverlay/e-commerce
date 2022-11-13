import { auth } from "./firebase.js"
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

let userDataObj = {
  firstName: "",
  secondName: "",
  lastName: "",
  secondLastName: "",
  email: "",
  telephone: "",
  image: ""
};

(function () {
  'use strict'
  const formulario = document.getElementById("loginform")

  formulario.addEventListener('submit', function (event) {
    if (!formulario.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      userStorageLogin();
      window.location.href = "index.html";
    }
    formulario.classList.add('was-validated')
  },)
})
  ();

// FUNCION PARA COMPROBAR USUARIO LOGUEADO
function loguedUser() {
  if (JSON.parse(localStorage.getItem("userData")) == null) {
  } else {
    window.location.href = "index.html";
  }
};

loguedUser();

// Funcion para guardar los datos del email de usuario y setearlos en localStorage
function userStorageLogin() {
  userDataObj.email = document.getElementById("email").value;
  localStorage.setItem("userData", JSON.stringify(userDataObj));
};

const googleButtonAuth = document.getElementById("googleButtonAuth");

googleButtonAuth.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const credentials = await signInWithPopup(auth, provider);
    let splitCompleteName = credentials.user.displayName.split(" ");

    userDataObj.firstName = splitCompleteName[0];
    userDataObj.lastName = splitCompleteName[1];
    userDataObj.email = credentials.user.email;
    userDataObj.telephone = credentials.user.phoneNumber;
    userDataObj.image = credentials.user.photoURL.replace(/['"]+/g, '');

    localStorage.setItem("userData", JSON.stringify(userDataObj));
    window.location.href = "index.html";

  } catch (error) {
    alert("Error, por favor contacte al área técnica.")
  }
})