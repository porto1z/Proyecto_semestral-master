// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaAlimentos = document.querySelector('#lista-Alimentos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaAlimentos.addEventListener('click', agregarAlm);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarAlm);

    // Muestra los cursos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHTML();
    })


    // Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })
}


// Funciones
function agregarAlm(e) {
    e.preventDefault();


    if( e.target.classList.contains('agregar-carrito') ) {
        const almSeleccionado = e.target.parentElement.parentElement;
        leerDatosAlm(almSeleccionado);
    }
    
}

// Elimina un curso del carrito
function eliminarAlm(e) {
    if(e.target.classList.contains('borrar-alm')) {
        const almId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( alm => alm.id !== almId );

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosAlm(alm) {
    // console.log(alm);

    // Crear un objeto con el contenido del alm actual
    const infoAlm = {
        imagen: alm.querySelector('img').src,
        titulo: alm.querySelector('h4').textContent,
        precio: alm.querySelector('.precio span').textContent, 
        id: alm.querySelector('a').getAttribute('data-id'),
        
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( alm => alm.id === infoAlm.id  );
    if(existe) {
        // Actualizamos la cantidad
        const alm = articulosCarrito.map( alm => {
            if( alm.id === infoAlm.id ) {
                alm.cantidad++;
                return alm; // retorna el objeto actualizado
            } else {
                return alm; // retorna los objetos que no son los duplicados
            }
        } );
        articulosCarrito = [...alm];
    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoAlm];
    }




    console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el Carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();
    

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( alm => {
        const { imagen, titulo, precio, cantidad, id } = alm;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-alm" data-id="${id}" > X </a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';


    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}