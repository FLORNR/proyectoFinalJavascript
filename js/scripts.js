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

$("#botonBorrar").on("click", borrarDatos);

function borrarDatos(){
   $(".formulario").reset();
}

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
    console.log(reservaFinal)

    //DETERMINAMOS SI LA RESERVA PROVIENE DE UN HOTEL O NO-------------------------------

    if (reservaFinal[0] == "si") {
         
        // EN CASO QUE VENGA DE UN HOTEL, VERIFICAMOS QUE NO SEAN MAS DE 10 CICLISTAS, SI SON MAS, BRINDA MENSAJE DE ERROR.
        if (reservaFinal[2] >= 10){

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
                    
                    const servicioAutoguiado = new Servicio ("Autoguiado", 1200, "El sercicio AUTOGUIADO incluye Bicicleta, Casco, Mapa, Asesoramiento de Bodegas a Visitar, y en caso de hacerlo con tiempo reservas en las mismas");
                    const servicioGuiado = new Servicio ("Guiado All Inclusive", 7000, "El sercicio GUIADO incluye Bicicleta, Casco, Mapa, Guia, Visita y Degustación en dos bodegas, Almuerzo tipo Picnic en una Bodega, y Degustación en almacén de Productos Regionales.");
                    const servicioEBike = new Servicio ("E-bike", 2500, "El sercicio E-BIKE incluye Bicicleta Eléctrica, Casco, Mapa, Asesoramiento de Bodegas a Visitar, y reservas en las mismas"); 

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

























