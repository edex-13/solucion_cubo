const resultDiv = document.getElementById('resultDiv')
function enviar_fotos() {
  const formData = new FormData();

  imagenes.forEach((image, index) => {
    formData.append(`images${index + 1}`, image);
  })
  // Realizar la solicitud POST a la API
  fetch('https://apicamrubik-1356ec7d5382.herokuapp.com/subir-imagenes', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error('Error al enviar las imágenes');
      }
    })
    .then(data => {
      console.log(data); // Imprimir la respuesta del servidor en la consola
    })
    .catch(error => {
      console.error(error);
    });
}

function convertir(capturedImageData) {
  const base64Data = capturedImageData.replace(/^data:image\/(png|jpeg);base64,/, '');
  console.log(base64Data)
  const binaryData = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Crear un Blob a partir del ArrayBuffer
  const blob = new Blob([arrayBuffer], { type: 'image/png' });
  return blob
}