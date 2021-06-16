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

let boton = document.getElementById("botonReserva");
boton.addEventListener("click", comenzar);
function comenzar(){

    function comisionPorServicio(comisionServicio, cantCiclistas){
        let comision = parseFloat(comisionServicio*cantCiclistas);
        return comision;
    }

    //TOMAR LOS DATOS QUE INGRESA EL USUARIO A TRAVES DE LOS INPUTS
    var hotel = (document.querySelector('input[name = "hotel"]:checked').value).toLowerCase();
    var nombreHotel = (document.getElementById("nombreHotel").value).toUpperCase();
    var cantCiclistas = parseInt(document.getElementById("cantCiclistas").value);
    var fechaTour = document.getElementById("fechaTour").value;
    var nombreCiclista = (document.getElementById("nombreCiclista").value).toUpperCase();
    var documento = parseInt(document.getElementById("documento").value);
    var email = document.getElementById("email").value;
    var telefono = parseInt(document.getElementById("telefono").value);
    var tipoTour = (document.querySelector('input[name = "customRadio"]:checked').value).toUpperCase();

    //INCORPORAR LOS DATOS QUE INGRESO EL USUARIO A UN ARRAY DE RESERVA FINAL
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

    //DETERMINAMOS SI LA RESERVA PROVIENE DE UN HOTEL O NO

    if (reservaFinal[0] == "si") {
         
        // EN CASO QUE VENGA DE UN HOTEL, VERIFICAMOS QUE NO SEAN MAS DE 10 CICLISTAS, SI SON MAS, BRINDA MENSAJE DE ERROR.
        if (reservaFinal[2] >= 10){
            let detalle = document.createElement("h3");
            detalle.innerText = "DETALLE DE LA RESERVA";
            let lista = document.getElementById("detalleReserva");
            lista.appendChild(detalle);
            let elemento = document.createElement("li");
            elemento.innerText = "El numero de ciclistas no puede superar las 10 personas, realice una nueva reserva";
            lista.appendChild(elemento);
                     
           
        
        //CASO CONTRARIO CREAMOS EL DETALLE DE LA RESERVA, CON LOS MISMOS DATOS QUE CREO EL USUARIO
           
         }else {

            // DETALLE DE LA TABLA CON ALGUNOS DATOS

            let titulo = document.createElement("h3");
            titulo.innerText = "DATOS DE LA RESERVA";
            let miReserva = document.createElement("table");
            miReserva.setAttribute("class", "table table-dark");
            let miFila = document.createElement("tr");
            let miCelda = document.createElement("td");
            miCelda.innerText = "NOMBRE HOTEL";
            miFila.appendChild(miCelda);
            let miCelda2 = document.createElement("td");
            miCelda2.innerText = reservaFinal[1];
            miFila.appendChild(miCelda2);
            let miFila2 = document.createElement("tr");
            let miCelda2_1 = document.createElement("td");
            miCelda2_1.innerText = "CANTIDAD DE CICLISTAS";
            miFila2.appendChild(miCelda2_1);
            let miCelda2_2 = document.createElement("td");
            miCelda2_2.innerText = reservaFinal[2];
            miFila2.appendChild(miCelda2_2);
            let miFila3= document.createElement("tr");
            let miCelda3_1 = document.createElement("td");
            miCelda3_1.innerText = "DÍA DEL TOUR";
            miFila3.appendChild(miCelda3_1);
            let miCelda3_2 = document.createElement("td");
            miCelda3_2.innerText = reservaFinal[3];
            miFila3.appendChild(miCelda3_2);
                
                
            miReserva.appendChild(miFila);
            miReserva.appendChild(miFila2);
            miReserva.appendChild(miFila3);
            document.getElementById("reserva").appendChild(titulo);
            document.getElementById("reserva").appendChild(miReserva);

            // DETALLE DE LA RESERVA 

            let detalle = document.createElement("h3");
            detalle.innerText = "DETALLE DE LA RESERVA";
            let lista = document.getElementById("detalleReserva");
            lista.appendChild(detalle);
            
            // TIPO DE SERVICIO
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

                    // SEGUN EL SERVICIO ELEGIDO ME TIRA DETALLE DE CADA UNO    
                     if (reservaFinal[8] == "AUTOGUIADO") {
                                let comisionPorPersona = parseFloat(servicioAutoguiado.precio * 0.10);
                                let comisionPorServicioTotal = comisionPorServicio(comisionPorPersona, cantCiclistas);
                                let elemento = document.createElement("li");
                                elemento.innerText = "Tu reserva está a nombre de: " + reservaFinal[4] + " y la fecha del Tour es: " + reservaFinal[3] +". Recuerda que el tour que elegiste para tus huespedes es: " + reservaFinal[8]+ " y el costo del mismo es: $"+ servicioAutoguiado.precio + " por persona. Esperamos a tu reserva y deseamos seguir trabajando con vos!";
                                lista.appendChild(elemento); 
                                let elemento2 = document.createElement("li");
                                elemento2.innerText = servicioAutoguiado.descripcion + ". Es para un total de: " + reservaFinal[2] + " ciclista/s, y tu comisión por esta reserva es: $" + comisionPorServicioTotal+ ".";
                                lista.appendChild(elemento2);
                                let miFila4 = document.createElement("tr");
                                let miCelda4_1 = document.createElement("td");
                                miCelda4_1.innerText = "MONTO COMISIÓN";
                                miFila4.appendChild(miCelda4_1);
                                let miCelda4_2 = document.createElement("td");
                                miCelda4_2.innerText = "$"+comisionPorServicioTotal;
                                miFila4.appendChild(miCelda4_2);
                                miReserva.appendChild(miFila4)
                        
                                  
                            }else if (reservaFinal[8] == "GUIADO"){
                                let comisionPorPersona = parseFloat(servicioGuiado.precio * 0.10);
                                let comisionPorServicioTotal =comisionPorServicio(comisionPorPersona, cantCiclistas);
                                let elemento = document.createElement("li");
                                elemento.innerText = "Tu reserva está a nombre de: " + reservaFinal[4] + " y la fecha del Tour es: " + reservaFinal[3] +". Recuerda que el tour que elegiste para tus huespedes es: " + reservaFinal[8]+ " y el costo del mismo es: $"+ servicioGuiado.precio + " por persona. Esperamos a tu reserva y deseamos seguir trabajando con vos!";
                                lista.appendChild(elemento); 
                                let elemento2 = document.createElement("li");
                                elemento2.innerText =  servicioGuiado.descripcion +". Es para un total de: " + reservaFinal[2] + " ciclista/s, y tu comisión es: $" + comisionPorServicioTotal +".";
                                lista.appendChild(elemento2);
                                let miFila4 = document.createElement("tr");
                                let miCelda4_1 = document.createElement("td");
                                miCelda4_1.innerText = "MONTO COMISIÓN";
                                miFila4.appendChild(miCelda4_1);
                                let miCelda4_2 = document.createElement("td");
                                miCelda4_2.innerText = "$"+comisionPorServicioTotal;
                                miFila4.appendChild(miCelda4_2);
                                miReserva.appendChild(miFila4);
                        
                                
                            }else if (reservaFinal[8] == "E-BIKE"){
                                let comisionPorPersona = parseFloat(servicioEBike.precio * 0.10);
                                let comisionPorServicioTotal = parseFloat(comisionPorServicio(comisionPorPersona, cantCiclistas));
                                let elemento = document.createElement("li");
                                elemento.innerText = "Tu reserva está a nombre de: " + reservaFinal[4] + " y la fecha del Tour es: " + reservaFinal[3] +". Recuerda que el tour que elegiste para tus huespedes es: " + reservaFinal[8]+ " y el costo del mismo es: $"+ servicioEBike.precio + " por persona. Esperamos a tu reserva y deseamos seguir trabajando con vos!";
                                lista.appendChild(elemento); 
                                let elemento2 = document.createElement("li");
                                elemento2.innerText = servicioEBike.descripcion + ". Es para un total de: " + reservaFinal[2] + " ciclista/s, y tu comisión es: $" + comisionPorServicioTotal +".";
                                lista.appendChild(elemento2);
                                let miFila4 = document.createElement("tr");
                                let miCelda4_1 = document.createElement("td");
                                miCelda4_1.innerText = "MONTO COMISIÓN";
                                miFila4.appendChild(miCelda4_1);
                                let miCelda4_2 = document.createElement("td");
                                miCelda4_2.innerText = "$"+comisionPorServicioTotal;
                                miFila4.appendChild(miCelda4_2);
                                miReserva.appendChild(miFila4);
                        
                            } else {
                                let detalle = document.createElement("h3");
                                detalle.innerText = "DETALLE DE LA RESERVA";
                                let lista = document.getElementById("detalleReserva");
                                lista.appendChild(detalle);
                                let elemento = document.createElement("li");
                                elemento.innerText = "El servicio ingresado no es correcto";
                                lista.appendChild(elemento);
                            }
                        

            }
    }
    //EN CASO QUE NO SE INGRESE LA RESERVA DESDE UN HOTEL ME TIRA ERROR
    else {
        let detalle = document.createElement("h3");
        detalle.innerText = "DETALLE DE LA RESERVA";
        let lista = document.getElementById("detalleReserva");
        lista.appendChild(detalle);
        let elemento = document.createElement("li");
        elemento.innerText = "Ésta opción es solo para reservas realizadas por Hoteles o Alojamientos.";
        lista.appendChild(elemento);
        
    }

}



























