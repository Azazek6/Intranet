const btnShowPatient = document.getElementById("getPatient");
const btnGetPatient = document.getElementById("patientInfo");
const btnNewCite = document.getElementById("newCite");
const getAllDoctor = document.getElementById("especialitys");

const controls = (action) => {
  let date = document.getElementById("date");
  let especiality = document.getElementById("especialitys");
  let doctor = document.getElementById("doctors");
  if (action === 2) {
    date.disabled = false;
    especiality.disabled = false;
    doctor.disabled = false;
  }
  if (action === 1) {
    date.disabled = true;
    especiality.disabled = true;
    doctor.disabled = true;
  }
  if (action === 0) {
    date.disabled = false;
    especiality.disabled = false;
    doctor.disabled = true;
  }
};

const showPopupPatient = (e) => {
  e.preventDefault();
  const popupPatient = document.getElementById("popup");
  popupPatient.classList.add("popup--show");
};
const getPatient = (e) => {
  e.preventDefault();
  let dni = document.getElementById("dni").value;
  let getDni = document.getElementById("dnipat");
  const patient = document.getElementById("patient");
  $.ajax({
    url: "/receptionist/getPatient",
    method: "POST",
    data: { dni: dni },
    success: (res) => {
      let error_msg = document.getElementById("msg_error");
      if (res != 0) {
        patient.value = res.name + " " + res.lastname;
        getDni.value = res.dni;
        const popupPatient = document.getElementById("popup");
        popupPatient.classList.remove("popup--show");
        controls(0);
      } else {
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
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
};

const getDoctor = (e) => {
  e.preventDefault();
  let especiality = getAllDoctor.value;
  let doctors = document.getElementsByName("doctors")[0];
  $.ajax({
    url: "/receptionist/getAllDoctor",
    method: "POST",
    data: { especiality: especiality },
    success: (res) => {
      if (res != 0) {
        for (let i = 0; i < res.length; i++) {
          doctors.options[i] = new Option(`${res[i].name}`, `${res[i]._id}`);
        }
        controls(2);
      } else {
        for (let i = 0; i < doctors.length; i++) {
          doctors.remove(i);
          doctors.options[i] = new Option("-- No datos --", "");
        }
        controls(0);
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
};
if (btnShowPatient != null) {
  btnShowPatient.addEventListener("click", showPopupPatient);
}
if (btnGetPatient != null) {
  btnGetPatient.addEventListener("click", getPatient);
}
if (getAllDoctor != null) {
  getAllDoctor.addEventListener("click", getDoctor);
}
if (btnNewCite != null) {
  controls(1);
}
