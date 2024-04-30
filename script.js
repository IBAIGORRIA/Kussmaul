//ELEMENTOS DEL DOM

var greet = document.getElementById('h3-greet');
var prodDiv = document.getElementById('prod-div');
var tituloProd = document.getElementById('titulo-prod');
var spanMarcas = document.getElementById('span-marcas');
var prodDivDesc = document.querySelector('.prod-div-desc');
let productos = [];

let i = 0;
//Carrusel clientes//

const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: true,
  slidesPerView: "3",
  height: "50%",
});

//Funciones seccion productos//

function insertarDatos(productos) {
  console.log(productos);

  // Limpiar el contenido anterior
  prodDivDesc.innerHTML = '';

  // Insertar título del primer producto
  tituloProd.textContent = productos.descripcion.titulo;

  // Insertar marcas del primer producto
  spanMarcas.textContent = "Distribuidores de :" + productos.descripcion.marcas;

  // Insertar secciones de descripción del primer producto
  var secciones = productos.descripcion.secciones; // Secciones del primer producto
  secciones.forEach(function (seccion) {
    var hr= document.createElement('hr');

    var seccionDiv = document.createElement('div');
    seccionDiv.classList.add('seccion');

    var tituloSeccion = document.createElement('h5');
    tituloSeccion.textContent = seccion.titulo;

    var contenidoSeccion = document.createElement('ul');
    seccion.contenido.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      contenidoSeccion.appendChild(li);
    });

    seccionDiv.appendChild(tituloSeccion);
    seccionDiv.appendChild(hr);
    seccionDiv.appendChild(contenidoSeccion);

    prodDivDesc.appendChild(seccionDiv);
  });

}



//Llamada JSON///
// Llamada al archivo JSON y guardado en una variable
fetch('./descProd.json')
  .then(response => {
    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Ocurrió un error al obtener el archivo JSON');
    }

    // Parsear la respuesta JSON
    return response.json();
  })
  .then(data => {
    // Guardar el JSON en una variable
    productos = data;
    // Hacer algo con la variable, como imprimir en la consola
    console.log(productos);

  })
  .catch(error => {
    // Capturar errores de la solicitud o del procesamiento JSON
    console.error('Error:', error);
  });
//FIN Llamada Json


// botones categorias //
document.addEventListener('DOMContentLoaded', function () {
  // Agregar evento click a todos los botones dentro de "services-list"
  var buttons = document.querySelectorAll('.services-list button');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      console.log(greet);
      greet.classList.add('d-none');

      // Obtener el ID del botón clickeado
      var id = button.id;
      // Buscar el objeto en el arreglo de productos con el ID coincidente
      var productoEncontrado = productos.find(function (producto) {
        return producto.id === id;
      });
      // Verificar si se encontró el producto
      if (productoEncontrado) {
        // Llamar a la función insertarDatos con el producto encontrado
        insertarDatos(productoEncontrado);
      } else {
        console.error('No se encontró ningún producto con el ID:', id);
      }
    });
  });
});