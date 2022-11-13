const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const secondName = document.getElementById("secondName");
const secondLastName = document.getElementById("secondLastName");
const telephone = document.getElementById("telephone");
const formProfile = document.getElementById("formProfile")
const userImageInput = document.getElementById("userImageInput");
const userImage = document.getElementById("userImage");
const confirmAlertChange = document.getElementById("confirmAlertChange");

// Funcion de descarga datos usuario LOCALHOST
function chargeUserData() {
  userDataObj = JSON.parse(localStorage.getItem("userData"));
  firstName.value = userDataObj.firstName;
  lastName.value = userDataObj.lastName;
  email.value = userDataObj.email;
  secondName.value = userDataObj.secondName;
  secondLastName.value = userDataObj.secondLastName;
  telephone.value = userDataObj.telephone;
  if (userDataObj.image) {
    userImage.setAttribute('src', userDataObj.image);
  }
};

chargeUserData();

// FORMULARIO DE PERFIL USUARIO -> MODIFICA Y CARGA LOS DATOS INGRESADOS EN MI PERFIL
formProfile.addEventListener('submit', event => {
  if (!formProfile.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  } else {
    userDataObj.firstName = firstName.value
    userDataObj.lastName = lastName.value
    userDataObj.email = email.value
    userDataObj.secondName = secondName.value
    userDataObj.secondLastName = secondLastName.value
    userDataObj.telephone = telephone.value
    localStorage.setItem("userData", JSON.stringify(userDataObj));
    confirmAlertChange.innerHTML =
    `<div class="alert alert-success alert-dismissible" role="alert">
         <div><p>¡Se han guardado los cambios!</p></div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> `
      event.preventDefault()
  }
  formProfile.classList.add('was-validated')
}, false);

// FUNCION QUE CODIFICA UNA IMAGEN A BASE 64
async function encodeFileAsBase64URL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(file);
  });
};

// FUNCION PARA CONVERTIR IMAGEN SELECCIONADA POR USUARIO Y GUARDAR EN LS
userImageInput.addEventListener('input', async (event) => {
  // Convierto la primera imagen del input en una ruta Base64
  const base64URL = await encodeFileAsBase64URL(userImageInput.files[0]);
  userDataObj.image = base64URL;
  localStorage.setItem("userData", JSON.stringify(userDataObj));
  location.reload();
});