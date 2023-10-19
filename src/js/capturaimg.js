const captureButton = document.getElementById('captureButton');
const capturedImage = document.getElementById('capturedImage');
const ctx = canvas.getContext('2d');

const imagenes = []
captureButton.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const nombre = `image/png"`
    let capturedImageData = canvas.toDataURL(nombre);
    imagenes.push(capturedImageData)
    // console.log(imagenes)
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }

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
});
function detenerAnimacion() {
  cancelAnimationFrame(id_animacion);
}