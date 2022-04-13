var cronometro;
var seg = 0;
var min = 0;
var TAM = 4;  // Tamaño predeterminado o inicial
var EClick;
var casillas = [];
var tablero;
var tamUsuario;
var bDiv;
var casillasAleatorias = [];
var contadorIntentos = 0;



function setup() {
  var nombre;
  contadorIntentos = 0;
  nombre = prompt("Ingrese su nombre: ");
  nom = document.getElementById("nombre");
  nom.innerHTML = "Nombre: " + nombre;
    guardaInfoInicial();



	EClick.onclick = function () {
    carga();
		if (bDiv.firstElementChild != null) {
			while (bDiv.firstChild) {
				bDiv.removeChild(bDiv.firstChild);
			}
		}

		creaCasillas();
		casillasAleatorias = generaNumeroCasillas(1,TAM * TAM);
		casillasAleatorias.sort(() => Math.random() > 0.5 ? 1 : -1);

		visualizaGrid();
		bDiv.appendChild(tablero);
		ganaste();
	}
}


function detener()
{
	clearInterval(cronometro);
}

function carga()
{
	seg = 0;
	min = 0;
	s = document.getElementById("segundos");
	m = document.getElementById("minutos");
  t  = document.getElementById("tiempoTotal");

	cronometro = setInterval(

							 function(){

								 if(seg == 60)
								 {
									 seg = 0;
									 min++;
									 m.innerHTML = min;
									 if(min == 0)
									 {
										 min = 0;
									 }
								 }
								 s.innerHTML = seg;
								 seg++;
							 }

								 ,1000);

}


//Funcion que guarda guarda el tamaño del tablero que se escogio mediante un input
function guardaInfoInicial()
{
	bDiv = document.getElementById("tab");
	tamUsuario = document.getElementsByName("tamanio");
	EClick = document.getElementById("button");
}


//Funcion que me permite visualizar el grid en pantalla, vamos añadiendo de forma dinamica los datos necesarios para que
// se pueda observar de forma correcta
function visualizaGrid()
{
	for (var j = 0; j < TAM; j++) {
		casillas[j] = tablero.insertRow(j);
		for (var z = 0; z < TAM; z++) {
			casillas[j][z] = casillas[j].insertCell(z);
			var temp = document.createElement("span");
			if ((j == TAM - 1) && (z == TAM - 1)) {
				var temp = document.createElement("span");
				temp.className = "space";
				casillas[j][z].appendChild(temp);
				break;
			}
			temp.className = "tile";
			temp.textContent = casillasAleatorias.pop();
			temp.onclick = function () {
				movimientosCasillas(this);
        contMov = document.getElementById("numeroM");
        contMov.innerHTML = "Movimientos: " + contadorIntentos;
				ganaste();
			}
			casillas[j][z].appendChild(temp);
		}
	}
}

//Con esta funcion se crean las casillas del juego de acuerdo al nivel que se escogio
function creaCasillas(){
	tablero = document.createElement("table");

	//Crea las casillas de acuerdo al nivel elegido
	for (var i = 0; i < tamUsuario.length; i++) {
		if (tamUsuario[i].checked) {
			TAM = tamUsuario[i].value;
			break;
		}
	}


}



	//con esta funcion generamos un arreglo auxiliar ordenado que va a contener los numeros ordenados desde 1 hasta n
	// y retornamos ese arreglo para despues desordenarlo e imprimirlo ya en el tablero
	function generaNumeroCasillas(inicial,final)
	{
		var arregloAuxNum = [];
		for(var i = 0; i < final-1; i++)
		{
			arregloAuxNum[i] = i+1;
		}
		return arregloAuxNum;
	}



	//con esta funcion intercambiamos las posiciones de las casillas que vamos a mover en cada movimiento

	function intercambioCasillas(cas1, cas2) {
		// insertamos el elemento que se creo nuevo en la posicion del elemento 1
		var casTemp = document.createElement("div");
		cas1.parentNode.insertBefore(casTemp, cas1);
		cas2.parentNode.insertBefore(cas1, cas2);  // se mueve el elemento 1 despues del elemento 2
		casTemp.parentNode.insertBefore(cas2, casTemp);  // se mueve el elemento 2 a donde se encontraba el elemento 1
		casTemp.parentNode.removeChild(casTemp);  // se elimina el nodo temporal que habiamos creado al inicio
    contadorIntentos++;
	}


	//mediante este metodo verificamos si la casilla en la que se dio click esta a un lado de la casilla vacia, si es asi
	// mandamos llamar a la funcion intercambioCasillas para que se genere el intercambio
	function movimientosCasillas(clickCas) {
		var fila = clickCas.parentNode.parentNode;
		var tabla = clickCas.parentNode.parentNode.parentNode.parentNode;
		var indiceClick = clickCas.parentNode.cellIndex;
		var indiceFila = fila.rowIndex;

		var der = fila.cells[indiceClick + 1];
		var izq = fila.cells[indiceClick - 1];



		if (tabla.rows[indiceFila - 1] != undefined) {
			var up = tabla.rows[indiceFila - 1].cells[indiceClick];
		}

		if (tabla.rows[indiceFila + 1] != undefined) {
			var down = tabla.rows[indiceFila + 1].cells[indiceClick];
		}




		if (der != undefined) {
			if (der.children[0].className == "space") {
				intercambioCasillas(clickCas, der.children[0]);
			}
		}

		if (izq != undefined) {
			if (izq.children[0].className == "space") {
				intercambioCasillas(clickCas, izq.children[0]);
			}
		}

		if (up != undefined) {
			if (up.children[0].className == "space") {
				intercambioCasillas(clickCas, up.children[0]);
			}
		}

		if (down != undefined) {
			if (down.children[0].className == "space") {
				intercambioCasillas(clickCas, down.children[0]);
			}
		}
    contMov = document.getElementById("numeroM");
    contMov.innerHTML = contadorIntentos;
	}

	function ganaste() {
		var cont = 1;
		var bandera = true;
		for (var i = 0; i < TAM; i++) {
			for (var j = 0; j < TAM; j++) {

				if ((i == TAM - 1) && (j == TAM - 1)) {

					if (tablero.rows[i].cells[j].childNodes[0].className == "space") {

						break;
					}
				}

				if (tablero.rows[i].cells[j].childNodes[0].className == "space") {

					bandera = false;
					break;
				}

				if (parseInt(tablero.rows[i].cells[j].childNodes[0].textContent) != cont) {

					bandera = false;
					break;
				}

				cont++;
			}
		}


		if (bandera) {
			for (var i = 0; i < TAM; i++) {
				for (var j = 0; j < TAM; j++) {
					if ((i == TAM - 1) && (j == TAM - 1)) {
						console.log(casillas);
						break;

					}
				}
			}
			alert("Haz Ganado!!" + "\nTiempo: " + min + ":" + seg + " \nMovimientos: " + contadorIntentos);
      detener();
		}
	}

	window.onload = setup;
