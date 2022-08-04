const formSearch = document.getElementById("form-search");

//Template search
const templateSearch = (res, action) => {
  let temp = ``;
  const date = new Date(res.date_of_birth);
  const newDate = date.toDateString();

  if (action === 0) {
    temp = `
    <div class="item-search">
      <p class="p-t">Historial:</p>
      <p style="font-size: 12px;">${res.record}</p>
    </div>
    <div class="item-search">
      <p class="p-t">DNI:</p>
      <p style="font-size: 12px;">${res.dni}</p>
    </div>
    <div class="item-search">
      <p class="p-t">Apellidos:</p>
      <p style="font-size: 12px;">${res.lastname}</p>
    </div>
    <div class="item-search">
      <p class="p-t">Nombres:</p>
      <p style="font-size: 12px;">${res.name}</p>
    </div>
    <div class="item-search">
      <p class="p-t">Edad:</p>
      <p style="font-size: 12px;">${res.age}</p>
    </div>
    <div class="item-search">
      <p class="p-t">Fecha de Nacimiento:</p>
      <p style="font-size: 12px;">${newDate}</p>
    </div>
    <div class="item-search">
      <p class="p-t">Direcci&oacute;n:</p>
      <p style="font-size: 12px;">${res.address}</p>
    </div>
    <div class="item-search">
      <p class="p-t">Estado Civil:</p>
      <p style="font-size: 12px;">${res.status}</p>
    </div>
    `;
  } else if (1) {
    temp = `
    <div class="item-search">
      <p class="p-t">Historial:</p>
      <p style="font-size: 12px;"></p>
    </div>
    <div class="item-search">
      <p class="p-t">DNI:</p>
      <p style="font-size: 12px;"></p>
    </div>
    <div class="item-search">
      <p class="p-t">Apellidos:</p>
      <p style="font-size: 12px;"></p>
    </div>
    <div class="item-search">
      <p class="p-t">Nombres:</p>
      <p style="font-size: 12px;"></p>
    </div>
    <div class="item-search">
      <p class="p-t">Edad:</p>
      <p style="font-size: 12px;"></p>
    </div>
    <div class="item-search">
      <p class="p-t">Fecha de Nacimiento:</p>
      <p style="font-size: 12px;"></p>
    </div>
    <div class="item-search">
      <p class="p-t">Direcci&oacute;n:</p>
      <p style="font-size: 12px;"></p>
    </div>
    <div class="item-search">
      <p class="p-t">Estado Civil:</p>
      <p style="font-size: 12px;"></p>
    </div>
    `;
  }

  return temp;
};

const search = (e) => {
  e.preventDefault();
  let dni = $("#dni").val();
  let data = $("#item-search");
  $.ajax({
    url: "/receptionist/search",
    method: "POST",
    data: { dni: dni },
    success: (res) => {
      let error_msg = document.getElementById("msg_error");
      data.html("");
      if (res === 0 || res === 1) {
        error_msg.innerHTML = `
        <div class="msg msg_err animate__animated animate__fadeInDown" id="messague">
          <div class="m1">
            <p class="message">Paciente no encontrado</p>
          </div>
          <div class="m2">
            <p class="icon-error"><i class="fa-solid fa-skull-crossbones"></i></p>
          </div>
        </div>
        `;
        const message = document.getElementById("messague");
        setTimeout(() => {
          message.classList.remove("animate__fadeInDown");
          message.classList.add("animate__fadeOut");
          message.style.visibility = "hidden";
        }, 2000);
        data.append(templateSearch(res, 1));
      } else {
        error_msg.innerHTML = "";
        data.append(templateSearch(res, 0));
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
};

if (formSearch != null) {
  formSearch.addEventListener("submit", search);
}
