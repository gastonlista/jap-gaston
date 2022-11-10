document.addEventListener("DOMContentLoaded", () => {
  showOfData();
  let email = localStorage.getItem("username");
  document.getElementById("validationCustom05").value = email;


  document.getElementById("validationCustom07").addEventListener("change", () => {
    let newImage = document.getElementById("profilePicture");
    let imagenes = document.getElementById("validationCustom07").files[0];
    let fileReader = new FileReader();

    if (imagenes) {
      fileReader.readAsDataURL(imagenes);
    }
    else {
      newImage.src = "img/user.png";
    }

    fileReader.addEventListener("load", () => {
      newImage.src = fileReader.result;
    })
  });

});

let dataUser = {};

function dataSaving() {

  dataUser.name = document.getElementById("validationCustom01").value;
  dataUser.name2 = document.getElementById("validationCustom02").value;
  dataUser.lastName = document.getElementById("validationCustom03").value;
  dataUser.lastName2 = document.getElementById("validationCustom04").value;
  dataUser.mail = document.getElementById("validationCustom05").value;
  dataUser.celPhone = document.getElementById("validationCustom06").value;
  dataUser.profilePic = document.getElementById("profilePicture").src;

  localStorage.setItem("userData", JSON.stringify(dataUser));
};


function showOfData() {
  let infoUser = JSON.parse(localStorage.getItem("userData"))
  if (infoUser != null) {
    document.getElementById("validationCustom01").value = infoUser.name;
    document.getElementById("validationCustom02").value = infoUser.name2;
    document.getElementById("validationCustom03").value = infoUser.lastName;
    document.getElementById("validationCustom04").value = infoUser.lastName2;
    document.getElementById("validationCustom05").value = infoUser.mail;
    document.getElementById("validationCustom06").value = infoUser.celPhone;
    document.getElementById("profilePicture").src = infoUser.profilePic;
  } else {
    document.getElementById("profilePicture").src = "img/profilePicExample.jpg";
  } console.log(profilePicture)
};




document.getElementById("formVal").addEventListener("submit", event => {

  if (!formVal.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  else {
    event.preventDefault();
    event.stopPropagation();
    dataSaving();
  };

  document.body.classList.add("was-validated");

});


/*(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})();*/



