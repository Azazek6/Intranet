const popupDiagnostic = document.getElementById("createDiagnost");
const closePopup = document.getElementById("close-popup");
const btnDiagnostic = document.getElementById("createDiagnostic");
const viewDiagnostic = document.getElementById("viewDiagnostic");

const messageSuccess = () => {
  let success_msg = document.getElementById("msg_success");
  success_msg.innerHTML = `
          <div class="msg animate__animated animate__fadeInDown " id="messague">
            <div class="m1">
              <p class="message">Diagnostico completo, redireccionando...</p>
            </div>
            <div class="m2">
              <p class="icon"><i class="fa-regular fa-circle-check"></i></p>
            </div>
          </div>
          `;
  const close = document.getElementById("popup");
  close.classList.remove("popup--show");
  const message = document.getElementById("messague");
  setTimeout(() => {
    message.classList.remove("animate__fadeInDown");
    message.classList.add("animate__fadeOut");
    message.style.visibility = "hidden";
    window.location.href = "/doctor/cites";
  }, 2500);
};
const messageError = (text) => {
  let error_msg = document.getElementById("msg_error");
  error_msg.innerHTML = `
  <div class="msg msg_err animate__animated animate__fadeInDown" id="messague">
    <div class="m1">
      <p class="message">${text}</p>
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
};

const createDiagnostic = (e) => {
  e.preventDefault();
  const diagnostic = document.getElementById("diagnostic").value;
  const doctor = document.getElementById("doctor").value;
  const patient = document.getElementById("patient").value;
  const cite = document.getElementById("cite").value;
  let error_msg = document.getElementById("msg_error");
  $.ajax({
    url: "/doctor/createDiagnostic",
    method: "POST",
    data: {
      diagnostic: diagnostic,
      doctor: doctor,
      patient: patient,
      cite: cite,
    },
    success: (res) => {
      if (res != null) {
        error_msg.innerHTML = "";
        if (res == 1) {
          messageSuccess();
        }
      } else {
        messageError("Faltan campos por ingresar");
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
};

const closeDiagnostic = (e) => {
  e.preventDefault();
  const close = document.getElementById("popup");
  const textDiagnostic = document.getElementById("diagnostic");
  close.classList.remove("popup--show");
  if (textDiagnostic != null) {
    textDiagnostic.value = "";
  }
};
const showDiagnostic = (e) => {
  e.preventDefault();
  const show = document.getElementById("popup");
  show.classList.add("popup--show");
  if (btnDiagnostic != null) {
    btnDiagnostic.addEventListener("submit", createDiagnostic);
  }
};

if (popupDiagnostic != null) {
  popupDiagnostic.addEventListener("click", showDiagnostic);
}
if (closePopup != null) {
  closePopup.addEventListener("click", closeDiagnostic);
}
if(viewDiagnostic !=null){
  viewDiagnostic.addEventListener('click',(e)=>{
    e.preventDefault();
    alert('Proximamente..!');
  });
}
