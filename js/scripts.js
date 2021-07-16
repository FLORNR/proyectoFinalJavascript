//ZONA PARA RESERVAS A TRAVES DE HOTEL------------------------------------------------------------------------------------------------------------------------

var hotel;
var nombreHotel;
var cantCiclistas;
var fechaTour;
var nombreCiclista;
var documento;
var email;
var telefono;
var tipoTour;


reservaFinal = [];

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

//ANIMACIONES ------------------------------------------------
$("#infoExtra").hide();

$("#mostrarInfo").click(() => {
    $("#infoExtra").fadeToggle(2000, function (){
        if ($("#mostrarInfo").html() == "LEER MENOS") {
            $("#mostrarInfo").html("LEER MÁS");
        } else {
            $("#mostrarInfo").html("LEER MENOS");
        }
    });
});

$("#h4").slideUp(2000)
        .delay(500)
        .slideDown(2000);


// BOTON PARA BORRAR DATOS ------------------------------------------------------------------------------------

$("#botonBorrar").on("click", borrarDatos);

function borrarDatos(){

    $(".formulario")[0].reset();

    sessionStorage.clear();

    $("#detalleReserva").html("");
    $("#reserva").html("");
}

// VALIDACIÓN DE FORMULARIO ---------------------------------------------------------------------------------------

//NOMBRE HOTEL
$("#nombreHotel").on('change', validarNombreHotel);

 function validarNombreHotel() {
    valor = document.getElementById("nombreHotel").value;
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) || !(/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valor))) {
        //document.getElementById("nombreHotel").classList.add("errorInput");
        document.getElementById("mensajeError").innerHTML = '<p style="color:red; font-size:14px">Ingresá un nombre válido</p>';
     }
     else {
        document.getElementById("mensajeError").innerHTML = "";
     }
}
//CANT CICLISTAS
$("#cantCiclistas").on('change', validarCantCiclistas);

 function validarCantCiclistas() {
    valor2 = document.getElementById("cantCiclistas").value;
    console.log(valor2)
    if( (valor2 == isNaN) || (valor2 < 1) || (valor2 >10) ) {
        // document.getElementById("cantCiclistas").classList.add("errorInput");
        document.getElementById("mensajeError2").innerHTML = '<p style="color:red; font-size:14px">Ingresá un número válido de ciclistas</p>';
     }
     else {
        // document.getElementById("cantCiclistas").classList.remove("errorInput");
        document.getElementById("mensajeError2").innerHTML = "";
     }
}

// NOMBRE CICLISTA

$("#nombreCiclista").on('change', validarNombreCiclista);

 function validarNombreCiclista() {
    valor3 = document.getElementById("nombreCiclista").value;
    if( valor3 == null || valor3.length == 0 || /^\s+$/.test(valor3) || !(/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valor3)) ) {
        //document.getElementById("nombreHotel").classList.add("errorInput");
        document.getElementById("mensajeError3").innerHTML = '<p style="color:red; font-size:14px">Ingresá un nombre válido</p>';
     }
     else {
        document.getElementById("mensajeError3").innerHTML = "";
     }
}

//NUMERO DE DOCUMENTO
$("#documento").on('change', validarDocumento);

 function validarDocumento() {
    valor4 = document.getElementById("documento").value;
    console.log(valor4)
    if( (valor4 == isNaN) || (valor4.length < 7) || (valor4.length > 9) || valor4 <= 0 ) {
        // document.getElementById("cantCiclistas").classList.add("errorInput");
        document.getElementById("mensajeError4").innerHTML = '<p style="color:red; font-size:14px">Ingresá un número válido de Documento</p>';
     }
     else {
        // document.getElementById("cantCiclistas").classList.remove("errorInput");
        document.getElementById("mensajeError4").innerHTML = "";
     }
}

// EMAIL

$("#email").on('change', validareMail);

 function validareMail() {
    valor5 = document.getElementById("email").value;
    console.log(valor5)
    if(!(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valor5))) {
        // document.getElementById("cantCiclistas").classList.add("errorInput");
        document.getElementById("mensajeError5").innerHTML = '<p style="color:red; font-size:14px">Ingresá un e-mail válido</p>';
     }
     else {
        // document.getElementById("cantCiclistas").classList.remove("errorInput");
        document.getElementById("mensajeError5").innerHTML = "";
     }
}

//TELEFONO

$("#telefono").on('change', validarTel);

 function validarTel() {
    valorTel = document.getElementById("telefono").value;
    console.log(valorTel)

    if( !(/^\d{10}$/.test(valorTel))) {
        // document.getElementById("cantCiclistas").classList.add("errorInput");
        document.getElementById("mensajeError6").innerHTML = '<p style="color:red; font-size:14px">Ingresá un teléfono válido</p>';
     }
     else {
        // document.getElementById("cantCiclistas").classList.remove("errorInput");
        document.getElementById("mensajeError6").innerHTML = "";
     }
}



// FUNCION PARA ARRANCAR CODIGO ---------------------------------------------------------------------------------------
$("#botonReserva").on("click", comenzar);


function comenzar(){

    function comisionPorServicio(comisionServicio, cantCiclistas){
        let comision = parseFloat(comisionServicio*cantCiclistas);
        return comision;
    }

    //TOMAR LOS DATOS QUE INGRESA EL USUARIO A TRAVES DE LOS INPUTS-----------------------------
    var hotel = (document.querySelector('input[name = "hotel"]:checked').value).toLowerCase();
    var nombreHotel = $("#nombreHotel").val().toUpperCase();
    var cantCiclistas = parseInt($("#cantCiclistas").val());
    var fechaTour = $("#fechaTour").val();
    var nombreCiclista = $("#nombreCiclista").val().toUpperCase();
    var documento = $("#documento").val();
    var email = $("#email").val();
    var telefono = $("#telefono").val();
    var tipoTour = (document.querySelector('input[name = "customRadio"]:checked').value).toUpperCase();
   

    //INCORPORAR LOS DATOS QUE INGRESO EL USUARIO A UN ARRAY DE RESERVA FINAL----------------------------------------
    reservaFinal.push(hotel);
    reservaFinal.push(nombreHotel);
    reservaFinal.push(cantCiclistas);
    reservaFinal.push(fechaTour);
    reservaFinal.push(nombreCiclista);
    reservaFinal.push(documento);
    reservaFinal.push(email);
    reservaFinal.push(telefono);
    reservaFinal.push(tipoTour);
    console.log(reservaFinal);

    //DETERMINAMOS SI LA RESERVA PROVIENE DE UN HOTEL O NO-------------------------------

    if (reservaFinal[0] == "si") {
         
        // EN CASO QUE VENGA DE UN HOTEL, VERIFICAMOS QUE NO SEAN MAS DE 10 CICLISTAS, SI SON MAS, BRINDA MENSAJE DE ERROR.
        if (reservaFinal[2] > 10){

            $("#detalleReserva").prepend("<h3>DETALLE DE LA RESERVA</h3>");
            $("#detalleReserva").append("<li>El numero de ciclistas no puede superar las 10 personas, realice una nueva reserva</li>");
           
        
        //CASO CONTRARIO CREAMOS EL DETALLE DE LA RESERVA, CON LOS MISMOS DATOS QUE CREO EL USUARIO-----------------------------------
           
         }else {

            // DETALLE DE LA TABLA CON ALGUNOS DATOS-------------------------------------------
            $("#reserva").append("<h3>DATOS DE LA RESERVA</h3>");
            $("#reserva").append(`<table class="table table-dark">
            
            <tbody class ="agregar">
              <tr>
                <td>NOMBRE HOTEL</td>
                <td>${reservaFinal[1]}</td>
              </tr>
              <tr>
                <td>CANTIDAD DE CICLISTAS</td>
                <td>${reservaFinal[2]}</td>
              </tr>
              <tr>
                <td>DIA DEL TOUR</td>
                <td>${reservaFinal[3]}</td>
              </tr>
            </tbody>
          </table>`);
        

            
            // DETALLE DE LA RESERVA -----------------------------------------------------

            $("#detalleReserva").prepend("<h3>DETALLE DE LA RESERVA</h3>");
          
            // TIPO DE SERVICIO------------------------------------------------------------------
            class Servicio {
                constructor (nombre, precio, descripcion){
                    this.nombre=nombre;
                    this.precio=precio;
                    this.descripcion=descripcion;
                        }
                    }
                    
                    const servicioAutoguiado = new Servicio ("Autoguiado", 1200, "El servicio AUTOGUIADO incluye Bicicleta, Casco, Mapa, Asesoramiento de Bodegas a Visitar, y en caso de hacerlo con tiempo reservas en las mismas");
                    const servicioGuiado = new Servicio ("Guiado All Inclusive", 7000, "El servicio GUIADO incluye Bicicleta, Casco, Mapa, Guia, Visita y Degustación en dos bodegas, Almuerzo tipo Picnic en una Bodega, y Degustación en almacén de Productos Regionales.");
                    const servicioEBike = new Servicio ("E-bike", 2500, "El servicio E-BIKE incluye Bicicleta Eléctrica, Casco, Mapa, Asesoramiento de Bodegas a Visitar, y reservas en las mismas"); 

                    // SEGUN EL SERVICIO ELEGIDO ME TIRA DETALLE DE CADA UNO--------------------------------------------    
                     if (reservaFinal[8] == "AUTOGUIADO") {
                                let comisionPorPersona = parseFloat(servicioAutoguiado.precio * 0.10);
                                let comisionPorServicioTotal = comisionPorServicio(comisionPorPersona, cantCiclistas);
                                $("#detalleReserva").append(`<li>Tu reserva está a nombre de:  ${reservaFinal[4]} y la fecha del Tour es: ${reservaFinal[3]}. Recuerda que el tour que elegiste para tus huespedes es: ${reservaFinal[8]} y el costo del mismo es: $${servicioAutoguiado.precio} por persona. Esperamos a tu reserva y deseamos seguir trabajando con vos!</li>`);
                                
                                $("#detalleReserva").append(`<li>${servicioAutoguiado.descripcion}. Es para un total de: ${reservaFinal[2]} ciclista/s, y tu comisión por esta reserva es: $${comisionPorServicioTotal}.</li>`);
                                
                                $(".agregar").append(`<tr>
                                <td>MONTO COMISIÓN</td>
                                <td>$ ${comisionPorServicioTotal}</td>
                              </tr>`);
                                  
                            }else if (reservaFinal[8] == "GUIADO"){
                                let comisionPorPersona = parseFloat(servicioGuiado.precio * 0.10);
                                let comisionPorServicioTotal =comisionPorServicio(comisionPorPersona, cantCiclistas);
                                $("#detalleReserva").append(`<li>Tu reserva está a nombre de: ${reservaFinal[4]} y la fecha del Tour es: ${reservaFinal[3]}. Recuerda que el tour que elegiste para tus huespedes es: ${reservaFinal[8]} y el costo del mismo es: $${servicioGuiado.precio} por persona. Esperamos a tu reserva y deseamos seguir trabajando con vos!</li>`);
                                
                                $("#detalleReserva").append(`<li>${servicioGuiado.descripcion}. Es para un total de: ${reservaFinal[2]} ciclista/s, y tu comisión por esta reserva es: $${comisionPorServicioTotal}.</li>`);
                               
                                $(".agregar").append(`<tr>
                                <td>MONTO COMISIÓN</td>
                                <td>$ ${comisionPorServicioTotal}</td>
                              </tr>`);
                                 
                            }else if (reservaFinal[8] == "E-BIKE"){
                                let comisionPorPersona = parseFloat(servicioEBike.precio * 0.10);
                                let comisionPorServicioTotal = parseFloat(comisionPorServicio(comisionPorPersona, cantCiclistas));
                                $("#detalleReserva").append(`<li>Tu reserva está a nombre de: ${reservaFinal[4]} y la fecha del Tour es: ${reservaFinal[3]}. Recuerda que el tour que elegiste para tus huespedes es: ${reservaFinal[8]} y el costo del mismo es: $${servicioEBike.precio} por persona. Esperamos a tu reserva y deseamos seguir trabajando con vos!</li>`);
                                
                                $("#detalleReserva").append(`<li>${servicioEBike.descripcion}. Es para un total de: ${reservaFinal[2]} ciclista/s, y tu comisión por esta reserva es: $${comisionPorServicioTotal}.</li>`);
                                
                                $(".agregar").append(`<tr>
                                <td>MONTO COMISIÓN</td>
                                <td>$ ${comisionPorServicioTotal}</td>
                              </tr>`);
                                
                            } else {
                                $("#detalleReserva").append("<h3>DETALLE DE LA RESERVA</h3>");    
                               
                                $("#detalleReserva").append("<li>El servicio ingresado no es correcto</li>");
                               
                            }
                        

            }
    }
    //EN CASO QUE NO SE INGRESE LA RESERVA DESDE UN HOTEL ME TIRA ERROR-----------------------------------------
    else {
        $("#detalleReserva").append("<h3>DETALLE DE LA RESERVA</h3>");
       
        $("#detalleReserva").append("<li>Ésta opción es solo para reservas realizadas por Hoteles o Alojamientos.</li>");
        
    }

}

























