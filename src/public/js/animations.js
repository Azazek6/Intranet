const message = document.getElementById('messague');

if(message !=null){
  setTimeout(()=>{
    message.classList.remove('animate__fadeInDown');
    message.classList.add('animate__fadeOut');
    message.style.visibility = 'hidden';
  },3000);
}