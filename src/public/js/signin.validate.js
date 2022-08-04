const btnSignIn = document.getElementById("signIn");
let error_msg = document.getElementById("msg_error");

const validateAuth = (e) => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password");
  if (!username || !password) {
    error_msg.innerHTML = `
        <div class="msg msg_err animate__animated animate__fadeInDown" id="messague">
          <div class="m1">
            <p class="message">Campos Incompletos</p>
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
    e.preventDefault();
  }
};

if (btnSignIn != null) {
  btnSignIn.addEventListener("click", validateAuth);
}
