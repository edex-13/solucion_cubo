const video = document.getElementById('webcam');
const cubo_container = document.getElementById('cubo_container')

const canvas = document.getElementById('canvas');
let videoStream = null;
cubo_container.classList.toggle('oculto')


// Inicializa la cámara web
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      videoStream = stream;

      video.addEventListener('loadedmetadata',actualizar_canva );

    })
    .catch(function (error) {
      console.error('Error al acceder a la cámara web:', error);
    });
}

// Actualiza el tamaño del canvas según la resolución de la cámara

rojo = '255,91,91'
verde = '118,253,91'
amarillo = '251,240,133'
naranja = '251,188,133'
azul = '138,159,254'
blanco = '214,214,214'

fotos = [
  [`rgba(${azul},0.9)` ,`rgba(${naranja},0.8)`,`rgba(${rojo},0.8)`,`rgba(${amarillo},0.8)`,`rgba(${blanco},0.8)` ],
  [`rgba(${naranja},0.9)` ,`rgba(${verde},0.8)`,`rgba(${azul},0.8)`,`rgba(${amarillo},0.8)`,`rgba(${blanco},0.8)` ],
  [`rgba(${verde},0.9)` ,`rgba(${rojo},0.8)`,`rgba(${naranja},0.8)`,`rgba(${amarillo},0.8)`,`rgba(${blanco},0.8)` ],
  [`rgba(${rojo},0.9)` ,`rgba(${azul},0.8)`,`rgba(${verde},0.8)`,`rgba(${amarillo},0.8)`,`rgba(${blanco},0.8)` ],
  [`rgba(${amarillo},0.9)` ,`rgba(${naranja},0.8)`,`rgba(${rojo},0.8)`,`rgba(${verde},0.8)`,`rgba(${azul},0.8)` ],
  [`rgba(${blanco},0.9)` ,`rgba(${rojo},0.8)`,`rgba(${naranja},0.8)`,`rgba(${verde},0.8)`,`rgba(${azul},0.8)` ],
]
contador_fotos = -1 
id_animacion = null
async function actualizar_canva () {
  console.log("suuuuuu")
  canvas.width = 300;
  canvas.height = 300;

  contador_fotos += 1;

  if (contador_fotos < 6){
    id_animacion = requestAnimationFrame(function () {
      drawSquare();
    });

  }else{
    await enviar_fotos()
    segundo_paso()
  }
  
}


function drawSquare() {

  color1 = fotos[contador_fotos][0]
  color2 = fotos[contador_fotos][1]
  color3 = fotos[contador_fotos][2]
  color4 = fotos[contador_fotos][3]
  color5 = fotos[contador_fotos][4]

  // console.log(fotos[contador_fotos])
  // console.log(color)
  const centerX = (video.videoWidth - 300) / 2;
  const centerY = (video.videoHeight - 300) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja la imagen de la cámara en el canvas en espejo
  ctx.save();
  ctx.scale(-1, 1);
  ctx.drawImage(video, centerX, centerY, 300, 300, -300, 0, 300, 300);
  ctx.restore();

  // Dibuja el cuadrados blancos de esquinas
  ctx.fillStyle = "rgba(256, 256, 256 , 1)";;
  ctx.fillRect(0, 0, 25, 25);
  ctx.fillRect(0, 275, 25, 25);
  ctx.fillRect(275, 0, 25, 25);
  ctx.fillRect(275, 275, 25, 25);

  
  ctx.fillStyle = color2;
  ctx.fillRect(0, 25, 25, 250);

  ctx.fillStyle = color3;
  ctx.fillRect(275, 25, 25, 250);
  
  ctx.fillStyle = color4;
  ctx.fillRect(25, 275, 250, 25);
  
  ctx.fillStyle = color5;
  ctx.fillRect(25, 0, 250, 25);
  // dd
  ctx.fillStyle = color1;
  
  ctx.strokeStyle = color1;
  ctx.lineWidth = 1;
  const x = (canvas.width - 84) / 2;
  const y = (canvas.height - 84) / 2;
  const borderRadius = 20; // Ajusta el valor para cambiar el radio de las esquinas
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.lineTo(x + 83 - borderRadius, y);
  ctx.quadraticCurveTo(x + 83, y, x + 83, y + borderRadius);
  ctx.lineTo(x + 83, y + 83 - borderRadius);
  ctx.quadraticCurveTo(x + 83, y + 83, x + 83 - borderRadius, y + 83);
  ctx.lineTo(x + borderRadius, y + 83);
  ctx.quadraticCurveTo(x, y + 83, x, y + 83 - borderRadius);
  ctx.lineTo(x, y + borderRadius);
  ctx.quadraticCurveTo(x, y, x + borderRadius, y);
  ctx.fill();

  
  ctx.moveTo(84+25, 25);
  ctx.lineTo(84+25, 275);
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.moveTo(168+25, 25);
  ctx.lineTo(168+25, 275);
  ctx.stroke();

  ctx.moveTo(25,168+25);
  ctx.lineTo(275,168+25);
  ctx.stroke();

  ctx.moveTo(25,84+25);
  ctx.lineTo(275,84+25);
  ctx.stroke();

  



  // Dibuja el cuadrado gris de 300x300
  // Dibuja el cuadrado gris con borde

  id_animacion = requestAnimationFrame(drawSquare);
}