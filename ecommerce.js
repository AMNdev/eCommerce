const botonBuscar = document.querySelector('.btn-buscar');
const inputBuscar = document.querySelector('.buscar');
const menu = document.querySelector('.menu');
const input = document.querySelector('.input');
const carrito = document.querySelector('.btn-carrito');
const badge = document.querySelector('.badge');




botonBuscar.addEventListener('click', () => {

    menu.classList.toggle('buscarActive');
    inputBuscar.classList.toggle('active')
    input.focus();

})

// función solo para desarrollo
carrito.addEventListener('click', () => {
    badge.innerHTML = Math.ceil(Math.random() * 10);
    badge.classList.toggle('oculto');

})