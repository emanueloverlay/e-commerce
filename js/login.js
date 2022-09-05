(function () {
    'use strict'
    const formulario = document.getElementById("loginform")

    formulario.addEventListener('submit', function (event) {
          if (!formulario.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            event.preventDefault()
            userStorage();
            window.location.href = "index.html";
          }
          formulario.classList.add('was-validated')
        },)
      })
  ();

  // Funcion para guardar los datos del email de usuario y setearlos en localStorage
  function userStorage () {
    const userEmail = document.getElementById("email");
    localStorage.setItem("userE", userEmail.value);
  }
