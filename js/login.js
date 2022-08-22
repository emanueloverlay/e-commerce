(function () {
    'use strict'
    const formulario = document.getElementById("loginform")

    formulario.addEventListener('submit', function (event) {
          if (!formulario.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            event.preventDefault()
            window.location.href = "index.html";
          }
          formulario.classList.add('was-validated')
        },)
      })
  ();