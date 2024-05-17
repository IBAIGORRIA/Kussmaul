//////////////ELEMENTOS DEL DOM////////////////////////////////

var greet = document.getElementById('h3-greet');
var prodDiv = document.getElementById('prod-div');
var tituloProd = document.getElementById('titulo-prod');
var spanMarcas = document.getElementById('span-marcas');
var prodDivDesc = document.querySelector('.prod-div-desc');
var pDist = document.getElementById('p-dis');
var preguntas = document.getElementById('preguntas');
var preguntasMobile = document.querySelector('.preguntas');
var nombreEsp = document.getElementById("nombreEsp");
var nombreEspMobile = document.getElementById("nombreEspMobile");
var telEsp = document.getElementById("telEsp");
var telEspMobile = document.getElementById("telEspMobile");
var mailEsp = document.getElementById("mailEsp");
var mailEspMobile = document.getElementById("mailEspMobile");
var fondoDesc = document.getElementById("fondoDesc");
var mapLinks = document.querySelectorAll('.map-link');
var rosarioMapURL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13394.602027273393!2d-60.6671376!3d-32.9338309!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab53c0b55f25%3A0x55c112cd3fa347bc!2sIng.%20Carlos%20Kussmaul!5e0!3m2!1ses!2sar!4v1714525936134!5m2!1ses!2sar";
var cordobaMapURL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13363.629178996152!2d-64.3535!3d-33.1378!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2001c1422cd29%3A0x223dab466ac661c6!2sIngeniero%20Kussmaul%20SA!5e0!3m2!1ses!2sar!4v1714526172966!5m2!1ses!2sar";

var productos = [];
var i = 0;
var lastButton = null;

////////////////////CARRUSEL CLIENTES//////////////////////

const swiper = new Swiper('.swiper', {
  loop: true,
  lazy: true,
  autoplay: true,
  slidesPerView: "3",
  height: "50%",
});

//Funciones seccion productos//

function insertarDatos(productos) {
  //console.log(productos);

  // Limpiar el contenido anterior
  prodDivDesc.innerHTML = '';

  var imageUrl = productos.img;
  
  //Estilizar fondo
  fondoDesc.classList.remove("d-none");
  fondoDesc.style.backgroundImage = `url(${imageUrl})`;
  fondoDesc.style.height = '200px';
  fondoDesc.style.backgroundPosition = 'center';
  fondoDesc.style.backgroundRepeat = 'no-repeat';
  // Crear una nueva imagen en JavaScript y cargar la imagen de fondo
  var tempImg = new Image();
  tempImg.src = imageUrl;
  // Esperar a que la imagen se cargue para obtener su ancho
  tempImg.onload = function () {
    // Obtener el ancho de la imagen de fondo
    var anchoImagen = tempImg.width;

    // Establecer el ancho del contenedor fondoDesc igual al ancho de la imagen
    fondoDesc.style.width = anchoImagen + 'px';
  }


  // Insertar título del primer producto
  tituloProd.textContent = productos.descripcion.titulo;

  //Mostrar el p
  pDist.classList.remove("d-none");

  // Insertar marcas del primer producto
  spanMarcas.textContent = productos.descripcion.marcas;

  // Insertar secciones de descripción del primer producto
  var secciones = productos.descripcion.secciones; // Secciones del primer producto
  secciones.forEach(function (seccion) {
    var hr = document.createElement('hr');

    // Crear div wrapper de contenido
    var seccionDiv = document.createElement('div');
    seccionDiv.classList.add('seccion');

    //Crear div titulo
    var tituloSeccion = document.createElement('h5');
    tituloSeccion.textContent = seccion.titulo;

    //Crear div lista
    var contenidoSeccion = document.createElement('ul');
    seccion.contenido.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      contenidoSeccion.appendChild(li);
    });
    // Armar esquema de divs creados recien
    seccionDiv.appendChild(tituloSeccion);
    seccionDiv.appendChild(hr);
    seccionDiv.appendChild(contenidoSeccion);
    // Imprimir contenido en pagina
    prodDivDesc.appendChild(seccionDiv);
  });

}



///////////////////////////////Llamada JSON/////////////////////////////////////////////////
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
    //console.log(productos);

  })
  .catch(error => {
    // Capturar errores de la solicitud o del procesamiento JSON
    console.error('Error:', error);
  });
//FIN Llamada Json


/////////////////////////////////BOTONES CATEGORIAS////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  // Variable para mantener registro del último botón presionado


  // Agregar evento click a todos los botones dentro de "services-list"
  var buttons = document.querySelectorAll('#services-list button');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
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
        preguntas.classList.remove('d-none');
        preguntasMobile.classList.remove('d-none');

        // Actualizar la información del especialista
        var especialista = productoEncontrado.especialista;
        nombreEsp.textContent = especialista.nombre;
        nombreEspMobile.textContent = especialista.nombre;
        telEsp.textContent = especialista.tel;
        telEspMobile.textContent = especialista.tel;
        mailEsp.innerHTML = `<a href="mailto:${especialista.email}">${especialista.email}</a>`;
        mailEspMobile.innerHTML = `<a href="mailto:${especialista.email}">${especialista.email}</a>`;
        // Quitar clase
        if (lastButton) {
          console.log(lastButton);
          lastButton.classList.remove('btn-outline-secondary');
        }
        //Agregar clase
        button.classList.add('btn-outline-secondary');
        // Actualizar el último botón presionado
        lastButton = button;
      } else {
        console.error('No se encontró ningún producto con el ID:', id);
      }
    });
  });

});

  // funcion para cambiar el mapa segun dirección
  mapLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que se realice la acción por defecto del enlace
      var mapSrc;
      // Comprobar si es el enlace de Rosario o Córdoba y establece la URL correspondiente
      if (this.textContent.includes('Rosario')) {
        mapSrc = rosarioMapURL;
      } else if (this.textContent.includes('Córdoba')) {
        mapSrc = cordobaMapURL;
      }
      // Actualizar la propiedad 'src' del iframe con la URL correspondiente
      document.getElementById('map').src = mapSrc; 
    });
  });



  /// Menu Hamburguesa para celu
   
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  //Coloca el listener para cada click
  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  //Funcion para mostrar el menu desplegable y ocultar la hamburguesa
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  ///

  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

    //Funcion para agregar la clase "activo" al elemento
    //de la nav correspondiente mientras se scrollea

    let navbarlinks = document.querySelectorAll('#navbar a');
  
    function navbarlinksActive() {
      navbarlinks.forEach(navbarlink => {
  
        if (!navbarlink.hash) return;
  
        let section = document.querySelector(navbarlink.hash);
        if (!section) return;
  
        let position = window.scrollY + 200;
  
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      })
    }
    window.addEventListener('load', navbarlinksActive);
    document.addEventListener('scroll', navbarlinksActive);

   // Función para cargar y generar las cartas
  function cargarCartas() {
    fetch('personal.json')
      .then(response => response.json())
      .then(data => {
        const cartasContainer = document.getElementById('cartas-container');
        
        data.forEach(carta => {
          const cardHTML = `
            <div class="col-xl-4 col-md-4 d-flex justify-content-center">
              <div class="card member col-9">
                <div class="card-body">
                  <h4 class="card-title fw-bold">${carta.nombre}</h4>
                  <p class="card-text">${carta.departamento}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item fw-bold"><a href="tel:${carta.telefono}"><i class="bi bi-phone"></i> ${carta.telefono}</a></li>
                  <li class="list-group-item fw-bold"><a href="mailto:${carta.email}"><i class="bi bi-envelope"></i> ${carta.email}</a></li>
                </ul>
              </div>
            </div>
          `;
          cartasContainer.innerHTML += cardHTML;
        });
      })
      .catch(error => console.error('Error al cargar el JSON de personal:', error));
  }

  // Llamamos a la función para cargar las cartas al cargar la página
  window.onload = cargarCartas;