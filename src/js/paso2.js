const cam_container = document.getElementById('cam_container')
const title = document.getElementById('title')
function segundo_paso(){
  cubo_container.classList.toggle('oculto')

  cam_container.classList.add('oculto')
  title.innerText = "VERIFICAR CUBO VIRTUAL"
}