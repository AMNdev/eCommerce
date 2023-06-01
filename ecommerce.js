const botonBuscar = document.querySelector('.btn-buscar');
const inputBuscar = document.querySelector('.buscar');
const menu = document.querySelector('.menu');
const input = document.querySelector('.input');
const carrito = document.querySelector('.btn-carrito');
const badge = document.querySelector('.badge');
const iconosDarkMode = document.querySelector('.iconosDarkMode');
const body = document.querySelector('body');
const botonesDarkMode = document.querySelectorAll('.iconoDark')




//  dark mode
iconosDarkMode.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    botonesDarkMode.forEach((boton) => {
        boton.classList.toggle('oculto')
    })
} )



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