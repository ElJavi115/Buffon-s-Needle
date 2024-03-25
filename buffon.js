
let longitud = 30;
let distancia = longitud;

let intersecciones = 0;
let total = 0;

let agujas = 0;
let agujasInput;


var valoresPI = [];
let maximo = 1000;
; 
let ejecucionesRealizadas = 0;
let ejecucionesInput;
let ejecucionesBoton;

let ejecuciones = 0;
let chart;
var ctx;


//Espacio de dibujo
function setup() {
  let canvas = createCanvas((windowWidth-50)*0.4, windowHeight*0.4);
  let x = (windowWidth - width) / 2; // Calcula la coordenada x para centrar
  let y = ((windowHeight - height) / 2)+200; // Calcula la coordenada y para centrar
  canvas.position(x, y);
  
  //Solicitud de cantidad de agujas
    agujasInput = createInput('');
    agujasInput.position(20, 45);
    agujasInput.elt.placeholder = "Needles (max 1000)";
    agujasInput.input(validateNumericInput);

    ejecucionesInput = createInput('');
    ejecucionesInput.position(20, 100);
    ejecucionesInput.elt.placeholder = "Executions (max 100)";
    ejecucionesInput.input(validateNumericInput);

    ejecucionesBoton = createButton("Start");
    ejecucionesBoton.position(20, 150);
    ejecucionesBoton.mousePressed(start);
    

    ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
    
    type: 'line',

    data: {
      datasets: [{
        label: 'Estimación de π',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: valoresPI,
        maintainAspectRatio: true
      }]
    },
  });

  ejecucionesRealizadas = 0;
  noLoop(); 
}


function validateNumericInput(){
  if(!Number.isInteger(Number(agujasInput.value())) || !Number.isInteger(Number(ejecucionesInput.value())) || 
    Number(agujasInput.value()) > maximo || Number(ejecucionesInput.value()) > 100){
    console.log(Number(agujasInput.value()));

    if(Number(agujasInput.value())  <= 0 || Number(ejecucionesInput.value()) <= 0){
      alert("Type a valid number");
      this.value('');
    }
    alert("Type a valid number");
    this.value('');
  }

}

function start() {
  if(agujasInput.value() == '' || ejecucionesInput.value() == '' || Number(agujasInput.value()) <= 0 || Number(ejecucionesInput.value())<= 0){
    alert("Type a valid number");
  }
  else{
    agujas = Number(agujasInput.value());
    ejecuciones = Number(ejecucionesInput.value());
    resetValues();
    loop();
  
  }
}


function resetValues() {
  //resets values 
  agujas = agujasInput.value();
  ejecucionesRealizadas = 0;
  valoresPI = [];
  chart.data.labels = []; 
  chart.data.datasets[0].data = []; 
  chart.update(); 
}

function draw() {
  background(240);

  //Dibuja las separaciones de la tabla
  for(let i = 0; i < width; i++) {
  stroke(0);
  strokeWeight(2);
  line(distancia*i, 0,distancia*i, height);
  }
  //Colocación al  azar de las agujas
  for (let i = 0; i < agujas; i++) {
    let rotacion = random(0, 180);
    let x1 = random(0, width);
    let y1 = random(0, height);
    let x2 = x1 + longitud * cos(rotacion);
    let y2 = y1 + longitud * sin(rotacion);
    stroke(random(0, 255), random(0, 255), random(0, 255));
    line(x1, y1, x2, y2);

    if (floor(y1 / distancia) != floor(y2 / distancia)) {
      intersecciones++;
    }
    total++;
  }

  // calcular la estimación de π y mostrarla en la pantalla
  let pi = (2 * longitud * total) / (distancia * intersecciones);
  
  textSize(25);
  strokeWeight(1)
  text("π Approximation: " + pi.toFixed(5), 10, windowHeight*0.4 - 10);
  valoresPI.push(pi);

  chart.data.labels = Array.from(Array(valoresPI.length).keys());
  chart.data.datasets[0].data = valoresPI;
  chart.update();
  
  
  ejecucionesRealizadas++;
  if (ejecucionesRealizadas == ejecuciones) {
    noLoop();
  }
  
  
  frameRate(5);
}
