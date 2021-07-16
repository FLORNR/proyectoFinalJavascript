//ZONA PARA RESERVA DE MANERA PARTICULAR----------------------------------------------------------------------------------------------------------------------------------

//VARIABLES QUE SE INGRESAN POR INPUT----------------------------------------------------------
var hotelParticular;
var nombreHotelParticular;
var cantCiclistasParticular;
var fechaTourParticular;
var nombreCiclistaParticular;
var fechaNacimientoParticular;
var documentoParticular;
var emailParticular;
var telefonoParticular;
var tipoTourParticular;

//ANIMACIONES--------------------------------------------------------------------------


$("#infoExtraParticular").hide();

$("#mostrarInfoParticular").click(() => {
    $("#infoExtraParticular").fadeToggle(2000, function (){
        if ($("#mostrarInfoParticular").html() == "LEER MENOS") {
            $("#mostrarInfoParticular").html("LEER MÁS");
        } else {
            $("#mostrarInfoParticular").html("LEER MENOS");
        }
    });
});

$("#h4particular").slideUp(2000)
        .delay(500)
        .slideDown(2000);

//API CLIMA -----------------------------------------------------------------------------

$(document).ready(function() {
    obtenerClima();
});

function obtenerClima(){
    $.get("https://api.weatherbit.io/v2.0/current?lat=-33.02700743462685&lon=-68.90710060438418&lang=es&key=aec8c1ab5f9c4b2d947444f7c29f5c27").done(function (resultado, estado){
        // console.log("El estado que retorna get es" + estado);
         console.log(resultado);
            if (estado == "success") {
                let datos = resultado; 
                
                $("#temperatura").append(`La temperatura actual es:  ${resultado.data[0].app_temp}ºC.`);
                $("#precipitacion").append(`La probabilidad de precipitaciones es:  ${resultado.data[0].precip} %.`);
                $("#descripcion").append(`Actualmente, se encuentra ${resultado.data[0].weather.description}.`)
        }
    });
}

// BOTON PARA BORRAR DATOS ------------------------------------------------------------------------------------
 
$("#botonBorrar").on("click", borrarDatos); 

function borrarDatos(){

     $(".formulario")[0].reset();
            
    sessionStorage.clear();
            
    $("#detalleReservaParticular").html("");
    $("#reservaParticular").html("");
            }

// VALIDACIÓN DE FORMULARIO ---------------------------------------------------------------------------------------

//NOMBRE HOTEL
$("#nombreHotelParticular").on('change', validarNombreHotel);

 function validarNombreHotel() {
    valor = document.getElementById("nombreHotelParticular").value;
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) || !(/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valor))) {
        //document.getElementById("nombreHotel").classList.add("errorInput");
        document.getElementById("error").innerHTML = '<p style="color:red; font-size:14px">Ingresá un nombre válido</p>';
     }
     else {
        document.getElementById("error").innerHTML = "";
     }
}
//CANT CICLISTAS
$("#cantCiclistasParticular").on('change', validarCantCiclistas);

 function validarCantCiclistas() {
    valor2 = document.getElementById("cantCiclistasParticular").value;
    console.log(valor2)
    if( (valor2 == isNaN) || (valor2 < 1) || (valor2 >10) ) {
        // document.getElementById("cantCiclistas").classList.add("errorInput");
        document.getElementById("error2").innerHTML = '<p style="color:red; font-size:14px">Ingresá un número válido de ciclistas</p>';
     }
     else {
        // document.getElementById("cantCiclistas").classList.remove("errorInput");
        document.getElementById("error2").innerHTML = "";
     }
}

// NOMBRE CICLISTA

$("#nombreCiclistaParticular").on('change', validarNombreCiclista);

 function validarNombreCiclista() {
    valor3 = document.getElementById("nombreCiclistaParticular").value;
    if( valor3 == null || valor3.length == 0 || /^\s+$/.test(valor3) || !(/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valor3)) ) {
        //document.getElementById("nombreHotel").classList.add("errorInput");
        document.getElementById("error3").innerHTML = '<p style="color:red; font-size:14px">Ingresá un nombre válido</p>';
     }
     else {
        document.getElementById("error3").innerHTML = "";
     }
}

//NUMERO DE DOCUMENTO
$("#documentoParticular").on('change', validarDocumento);

 function validarDocumento() {
    valor4 = document.getElementById("documentoParticular").value;
    console.log(valor4)
    if( (valor4 == isNaN) || (valor4.length < 6) || (valor4.length > 9) || valor4 <= 0 ) {
        // document.getElementById("cantCiclistas").classList.add("errorInput");
        document.getElementById("error4").innerHTML = '<p style="color:red; font-size:14px">Ingresá un número válido de Documento</p>';
     }
     else {
        // document.getElementById("cantCiclistas").classList.remove("errorInput");
        document.getElementById("error4").innerHTML = "";
     }
}

// EMAIL

$("#emailParticular").on('change', validareMail);

 function validareMail() {
    valor5 = document.getElementById("emailParticular").value;
    console.log(valor5)
    if(!(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valor5))) {
        // document.getElementById("cantCiclistas").classList.add("errorInput");
        document.getElementById("error5").innerHTML = '<p style="color:red; font-size:14px">Ingresá un e-mail válido</p>';
     }
     else {
        // document.getElementById("cantCiclistas").classList.remove("errorInput");
        document.getElementById("error5").innerHTML = "";
     }
}

//TELEFONO

$("#telefonoParticular").on('change', validarTel);

 function validarTel() {
    valorTel = document.getElementById("telefonoParticular").value;
    console.log(valorTel)

    if( !(/^\d{10}$/.test(valorTel))) {
        // document.getElementById("cantCiclistas").classList.add("errorInput");
        document.getElementById("error6").innerHTML = '<p style="color:red; font-size:14px">Ingresá un teléfono válido</p>';
     }
     else {
        // document.getElementById("cantCiclistas").classList.remove("errorInput");
        document.getElementById("error6").innerHTML = "";
     }
}


            
// ARRAY DE OBJETOS PARA PODER CREAR LAS DEGUSTACIONES DE LAS DISTINTAS BODEGAS---------------------------------------------
let bodegas = [
    { id: 1, 
      nombre: "DEGUSTACIÓN CLÁSICA VISTALBA", 
      descripcion: "El servicio incluye recorrido por la bodega y los viñedos. Además de la degustación de 4 vinos.", 
      precio: 700},

    { id: 2,
      nombre: "DEGUSTACIÓN RESERVA VISTALBA", 
      descripcion: "El servicio incluye recorrido por la bodega y los viñedos. Además de la degustación de 4 vinos reserva.", 
      precio: 950},

    { id: 3,
      nombre: "ONE OF EACH KAIKEN", 
      descripcion: "El servicio incluye, visita por la bodega, viñedos y cava de añejamiento. Además de la degustación de 5 vinos.", 
      precio: 860},

    { id: 4,
      nombre: "PREMIUM KAIKEN", 
      descripcion: "El servicio incluye, visita por la bodega y los viñedos y cava de añejamiento. Además de la degustación de 5 vinos premium.", 
      precio: 1560 },

    { id: 5,
      nombre: "HOY VENGO TRANQUI GIECO",  
      descripcion: "El servicio incluye recorrido por la bodega y los viñedos. Además de la degustación de 3 vinos.", 
      precio: 750},

    { id: 6,
      nombre: "LO QUIERO TODO GIECO", 
      descripcion: "El servicio incluye recorrido por la bodega y los viñedos. Además de la degustación de 4 vinos.", 
      precio: 950},

    { id: 7, 
     nombre: "NUESTRA ESENCIA ALTAVISTA", 
     descripcion: "El servicio incluye, visita por la bodega, y los viñedos. Además de la degustación de 4 vinos.", 
     precio: 900},

    { id: 8, 
      nombre: "HERENCIA FRANCESA ALTAVISTA", 
      descripcion:"El servicio incluye, visita por la bodega, y los viñedos. Además de la degustación de 5 vinos premium.", 
      precio: 1300},

    { id: 9,
      nombre: "DEGUSTACIÓN CLÁSICA CANEPA MARTIN" , 
      descripcion: "El servicio incluye recorrido por la bodega. Además de la degustación de 4 vinos.", 
      precio: 700},

    { id: 10, 
      nombre: "DEGUSTACIÓN CLÁSICA PULMARY" , 
      descripcion: "El servicio incluye recorrido por la bodega. Además de la degustación de 3 vinos.", 
      precio: 500},

    { id: 11, 
      nombre: "DEGUSTACÓN PREMIUM CLOS DE CHACRAS", 
      descripcion: "El servicio incluye visita por la bodega y los viñedos. Además de la degustación de 5 vinos con maridaje.", 
      precio: 1200},

    { id: 12, 
      nombre: "EXPERIENCIA CAPTURA HACIENDA DEL PLATA", 
      descripcion: "El servicio incluye, visita por la bodega y los viñedos. Además de la degustación de 3 vinos.", 
      precio: 600}, 

    { id: 13, 
      nombre: "EXPERIENCIA HACIENDA HACIENDA DEL PLATA", 
      descripcion: "El servicio incluye recorrido por la bodega y los viñedos. Además de la degustación de 3 vinos.", 
      precio: 750}, 

    { id: 14, 
      nombre: "3 FERMENTOS HACIENDA DEL PLATA", 
      descripcion: "El servicio incluye recorrido por la bodega y los viñedos. Además de la degustación de 3 vinos premium maridado con quesos y panes para dos personas.", 
      precio: 2100},

    { id: 15,
      nombre: "DEGUSTACIÓN CLÁSICA CARMELO PATTI" , 
      descripcion: "El servicio incluye, visita por la bodega. Además de la degustación de 3 vinos premium.", 
      precio: 0}, 

    { id: 16,
      nombre: "DEGUSTACIÓN AUTOGUIADA LAGARDE", 
      descripcion: "El servicio incluye degustación de 3 vinos premium.", 
      precio: 1400},
];
// ARRAY DE OBJETOS SELECCIONADOS--------------------------------------------------------------------------------------------------------------------------------
bodegasSeleccionadas=[];

// CREACIONES DE TITULO Y LAS CARD CON FOR EACH--------------------------------------------------------------------------------------------------------------------------------
const listaBodegas = document.getElementById("bodegas");

let titulo = document.getElementById("titulo");
let tituloBodegas = document.createElement("h4");
tituloBodegas.innerText = "SELECCIONA LAS BODEGAS Y DEGUSTACIONES ACÁ"
titulo.appendChild(tituloBodegas);
sessionStorage.removeItem('listaBodegasSeleccionadas');

bodegas.forEach(bodega => {
    let card = document.createElement("div")
    card.classList.add ("col");

    card.innerHTML = `<div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${bodega.nombre}</h5>
        <p class="card-text">${bodega.descripcion}</p>
        <p class="card-text"><b>PRECIO:$${bodega.precio}</b></p>
        <a id="bodega-${bodega.id}" class="btn btn-warning">Seleccionar</a>
  </div>
</div>`
    

listaBodegas.appendChild(card);
let seleccionar= document.getElementById(`bodega-${bodega.id}`); 
seleccionar.addEventListener ("click", mostrarDatos);

function mostrarDatos (){
    
    bodegasSeleccionadas.push(bodega);
    console.log(bodegasSeleccionadas);

    const guardarBodegasSeleccionadas = (clave, valor) =>{sessionStorage.setItem(clave, valor)};
    guardarBodegasSeleccionadas("listaBodegasSeleccionadas", JSON.stringify(bodegasSeleccionadas));
   }
});



reservaFinalParticular = [];
// COMIENZO DE LA FUNCION PARA TOMAR LOS DATOS Y GENERAR DETALLES-------------------------------------------------------------------------------------------------------------------------------- 


let botonParticular = document.getElementById("botonReservaParticular");
botonParticular.addEventListener("click", comenzarParticular);
function comenzarParticular(){


    //TOMAR LOS DATOS QUE INGRESA EL USUARIO A TRAVES DE LOS INPUTS--------------------------------------------------------------------------------------------------------------------------------
    var hotelParticular = (document.querySelector('input[name = "hotelParticular"]:checked').value).toLowerCase();
    var nombreHotelParticular = $("#nombreHotelParticular").val().toUpperCase();
    var cantCiclistasParticular = parseInt($("#cantCiclistasParticular").val());
    var fechaTourParticular = $("#fechaTourParticular").val();
    var nombreCiclistaParticular = $("#nombreCiclistaParticular").val().toUpperCase();
    var fechaNacimientoParticular = $("#fechaNacimientoParticular").val();
    var documentoParticular = $("#documentoParticular").val();
    var emailParticular = $("#emailParticular").val();
    var telefonoParticular = $("#telefonoParticular").val();
    var tipoTourParticular = (document.querySelector('input[name = "customRadioParticular"]:checked').value).toUpperCase();

    //INCORPORAR LOS DATOS QUE INGRESO EL USUARIO A UN ARRAY DE RESERVA FINAL--------------------------------------------------------------------------------------------------------------------------------
    reservaFinalParticular.push(hotelParticular);
    reservaFinalParticular.push(nombreHotelParticular);
    reservaFinalParticular.push(cantCiclistasParticular);
    reservaFinalParticular.push(fechaTourParticular);
    reservaFinalParticular.push(nombreCiclistaParticular);
    reservaFinalParticular.push(fechaNacimientoParticular);
    reservaFinalParticular.push(documentoParticular);
    reservaFinalParticular.push(emailParticular);
    reservaFinalParticular.push(telefonoParticular);
    reservaFinalParticular.push(tipoTourParticular);
    console.log(reservaFinalParticular)

    //DETERMINAMOS SI LA RESERVA PROVIENE DE UN HOTEL O NO--------------------------------------------------------------------------------------------------------------------------------

    if (reservaFinalParticular[0] == "no") {
         
        // EN CASO QUE VENGA DE UN HOTEL, VERIFICAMOS QUE NO SEAN MAS DE 10 CICLISTAS, SI SON MAS, BRINDA MENSAJE DE ERROR.--------------------------------------------------------------------------------------------------------------------------------
        if (reservaFinalParticular[2] >= 10){

            $("#detalleReservaParticular").prepend("<h3>DETALLE DE LA RESERVA</h3>");
            $("#detalleReservaParticular").append("<li>El numero de ciclistas no puede superar las 10 personas, realice una nueva reserva.</li>");
           
        
        //CASO CONTRARIO CREAMOS EL DETALLE DE LA RESERVA, CON LOS MISMOS DATOS QUE CREO EL USUARIO--------------------------------------------------------------------------------------------------------------------------------
           
         }else {

            // DETALLE DE LA TABLA CON ALGUNOS DATOS
            $("#reservaParticular").prepend("<h3>DATOS DE LA RESERVA</h3>");

            $("#reservaParticular").append(`<table class="table table-dark">
            
            <tbody class ="agregarParticular">
              <tr>
                <td>NOMBRE DE LA RESERVA</td>
                <td>${reservaFinalParticular[4]}</td>
              </tr>
              <tr>
                <td>CANTIDAD DE CICLISTAS</td>
                <td>${reservaFinalParticular[2]}</td>
              </tr>
              <tr>
                <td>DIA DEL TOUR</td>
                <td>${reservaFinalParticular[3]}</td>
              </tr>
            </tbody>
          </table>`);


            // DETALLE DE LA RESERVA --------------------------------------------------------------------------------------------------------------------------------

            $("#detalleReservaParticular").prepend("<h3>DETALLE DE LA RESERVA</h3>");

            
            // DATOS ALMACENADOS EN LOCAL STORAGE LOS OBTENGO PARA DETALLAR Y CREO UN NUEVO ARRAY--------------------------------------------------------------------------------------------------------------------------------

            class degusSeleccionadas {
                constructor(obj) {
                    this.id = obj.id;
                    this.nombre = obj.nombre.toUpperCase();
                    this.descripcion = obj.descripcion;
                    this.precio = obj.precio
                }
            }
            var contadorTotal= 0;
            const datosGuardados = JSON.parse(sessionStorage.getItem("listaBodegasSeleccionadas"));
            const seleccionDegustaciones =[];

            for (const obj of datosGuardados) {
                seleccionDegustaciones.push(new degusSeleccionadas(obj));
            }
            console.log(seleccionDegustaciones);

            //CREA UN DETALLE DE LAS BODEGAS SELECCIONADAS Y DEMAS DATOS DE CONTACTO--------------------------------------------------------------------------------------------------------------------------------
            
            for (const obj of datosGuardados){
            $("#detalleReservaParticular").append(`<li>Seleccionaste para visitar la siguiente Degustación y Bodega ${obj.nombre}, el costo de la misma es $${obj.precio} y te incluye lo siguiente: ${obj.descripcion}</li>`);
            contadorTotal = contadorTotal + obj.precio;
            
             }
            console.log(contadorTotal)

            // TIPO DE SERVICIO
            class ServicioParticular {
                constructor (nombre, precio, descripcion){
                    this.nombre=nombre;
                    this.precio=precio;
                    this.descripcion=descripcion;
                        }
                    }
                    
                    const servicioAutoguiado = new ServicioParticular ("Autoguiado", 1200, "El sercicio AUTOGUIADO incluye Bicicleta, Casco, Mapa, Asesoramiento de Bodegas a Visitar, y en caso de hacerlo con tiempo reservas en las mismas");
                    const servicioGuiado = new ServicioParticular ("Guiado All Inclusive", 7000, "El sercicio GUIADO incluye Bicicleta, Casco, Mapa, Guia, Visita y Degustación en dos bodegas, Almuerzo tipo Picnic en una Bodega, y Degustación en almacén de Productos Regionales.");
                    const servicioEBike = new ServicioParticular ("E-bike", 2500, "El sercicio E-BIKE incluye Bicicleta Eléctrica, Casco, Mapa, Asesoramiento de Bodegas a Visitar, y reservas en las mismas"); 

                    // SEGUN EL SERVICIO ELEGIDO ME TIRA DETALLE DE CADA UNO    
                     if (reservaFinalParticular[9] == "AUTOGUIADO") {
                
                            $("#detalleReservaParticular").append(`<li>Tu reserva está a nombre de: ${reservaFinalParticular[4]} y la fecha del Tour es: ${reservaFinalParticular[3]}. Recuerda que el tour que elegiste es: ${reservaFinalParticular[9]} y el costo del mismo es: $${servicioAutoguiado.precio} por persona. Los esperamos para que disfruten de una hermosa experiencia!</li>`);
                                
                            $("#detalleReservaParticular").append(`<li>${servicioAutoguiado.descripcion}. Es para un total de: ${reservaFinalParticular[2]} ciclista/s, te llegará la confirmación de la reserva a la siguiente direccion de e-mail: ${reservaFinalParticular[7]}.</li>`);
                               
                            contadorTotal = contadorTotal + servicioAutoguiado.precio;

                            $("#detalleReservaParticular").append(`<li>El costo total a pagar que incluye el servicio y las degustaciones elegidas es: $${contadorTotal}</li>`)
                    
                                  
                    }else if (reservaFinalParticular[9] == "GUIADO"){
                               
                            $("#detalleReservaParticular").append(`<li>Tu reserva está a nombre de: ${reservaFinalParticular[4]} y la fecha del Tour es: ${reservaFinalParticular[3]}. Recuerda que el tour que elegiste es: ${reservaFinalParticular[9]} y el costo del mismo es: $${servicioGuiado.precio} por persona. Los esperamos para que disfruten de una hermosa experiencia!</li>`);    
                                
                            $("#detalleReservaParticular").append(`<li>${servicioGuiado.descripcion}. Es para un total de: ${reservaFinalParticular[2]} ciclista/s, te llegará la confirmación de la reserva a la siguiente direccion de e-mail: ${reservaFinalParticular[7]}.</li>`);
                                
                                contadorTotal = contadorTotal + servicioGuiado.precio;

                            $("#detalleReservaParticular").append(`<li>El costo total a pagar que incluye el servicio y las degustaciones elegidas es: $${contadorTotal}</li>`);
                            }
                                
                    else if (reservaFinalParticular[9] == "E-BIKE"){
                               
                            $("#detalleReservaParticular").append(`<li>Tu reserva está a nombre de: ${reservaFinalParticular[4]} y la fecha del Tour es: ${reservaFinalParticular[3]}. Recuerda que el tour que elegiste es: ${reservaFinalParticular[9]} y el costo del mismo es: $${servicioEBike.precio} por persona. Los esperamos para que disfruten de una hermosa experiencia!</li>`);
                               
                            $("#detalleReservaParticular").append(`<li>${servicioEBike.descripcion}. Es para un total de: ${reservaFinalParticular[2]} ciclista/s, te llegará la confirmación de la reserva a la siguiente direccion de e-mail: ${reservaFinalParticular[7]}.</li>`);
                                
                            contadorTotal = contadorTotal + servicioEBike.precio;

                            $("#detalleReservaParticular").append(`<li>El <b>costo total</b> a pagar que incluye el servicio y las degustaciones elegidas es: <b>$${contadorTotal}</b></li>`);

                            } 
                    else {

                        $("#detalleReservaParticular").prepend("<h3>DETALLE DE LA RESERVA</h3>");
                               

                        $("#detalleReservaParticular").prepend("<li>El servicio ingresado no es correcto</li>");
                                
                    }
            }  

    }
    
    //EN CASO QUE NO SE INGRESE LA RESERVA DESDE UN HOTEL ME TIRA ERROR--------------------------------------------------------------------------------------------------------------------------------
    else {

        $("#detalleReservaParticular").prepend("<h3>DETALLE DE LA RESERVA</h3>");
        
        $("#detalleReservaParticular").prepend("<li>Ésta opción es solo para reservas realizadas por personas particulares.</li>");
        
    }

}
