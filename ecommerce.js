const botonBuscar = document.querySelector('.btn-buscar');
const inputBuscar = document.querySelector('.buscar');
const menu = document.querySelector('.menu');
const input = document.querySelector('.input');




botonBuscar.addEventListener('click', () => {

    menu.classList.toggle('buscarActive');
    inputBuscar.classList.toggle('active')
    input.focus();

})