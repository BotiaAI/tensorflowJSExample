let net;
const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');

async function predict() {
	// COMPLETAR EL CÓDIGO ACÁ

	// No modificar esta línea al final de la función
	await tf.nextFrame();
}

async function app() {
	console.log('Cargando mobilenet...');
	net = await mobilenet.load();
	console.log('Modelo cargado');
  
	await setupWebcam();
  
	// Lee una imagen y la asocia con una clase determinada
	const addExample = classId => {
	  // Obtiene el resultado de la capa intermedia de MobileNet 'conv_preds'
	  const activation = net.infer(webcamElement, 'conv_preds');
	  // Pasa la inferencia al clasificador
	  classifier.addExample(activation, classId);
	  console.log("Ejemplo añadido "+classId+ " "+activation);
	};
  
	// Agregar acciones
	document.getElementById('class-a').addEventListener('click', () => addExample(0));
	document.getElementById('class-b').addEventListener('click', () => addExample(1));
	document.getElementById('predict').addEventListener('click', () => predict());
	
  }

async function setupWebcam() {
	return new Promise((resolve, reject) => {
	  const navigatorAny = navigator;
	  navigator.getUserMedia = navigator.getUserMedia ||
		  navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
		  navigatorAny.msGetUserMedia;
	  if (navigator.getUserMedia) {
		navigator.getUserMedia({video: true},
		  stream => {
			webcamElement.srcObject = stream;
			webcamElement.addEventListener('loadeddata',  () => resolve(), false);
		  },
		  error => reject());
	  } else {
		reject();
	  }
	});
  }

app();
