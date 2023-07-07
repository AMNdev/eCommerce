const botonBuscar = document.querySelector('.btn-buscar');
const inputBuscar = document.querySelector('.buscar');
const menu = document.querySelector('.menu');
const input = document.querySelector('.input');
const carrito = document.querySelector('.btn-carrito');
const badge = document.querySelector('.badge');
const iconosDarkMode = document.querySelector('.iconosDarkMode');
const body = document.querySelector('body');
const botonesDarkMode = document.querySelectorAll('.iconoDark')
const botonDesplegar = document.querySelector('.desplegarBoton');
const menuDesplegar = document.querySelector('.menuDesplegado');
const botonCarritoDesplegable = document.querySelector('.btn-carritoDesplegable');
const badgeDesplegable = document.querySelector('.badgeDesplegable');

botonDesplegar.addEventListener('click', () => {
    menuDesplegar.classList.toggle('oculto')
})



//  dark mode
iconosDarkMode.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    botonesDarkMode.forEach((boton) => {
        boton.classList.toggle('oculto')
    })
})



botonBuscar.addEventListener('click', () => {

    menu.classList.toggle('buscarActive');
    inputBuscar.classList.toggle('active')
    input.focus();

})

// funciones solo para desarrollo
carrito.addEventListener('click', () => {
    badge.innerHTML = Math.ceil(Math.random() * 10);
    badge.classList.toggle('oculto');

})
botonCarritoDesplegable.addEventListener('click', () => {
    badgeDesplegable.innerHTML = Math.ceil(Math.random() * 10);
    badgeDesplegable.classList.toggle('oculto');

})

// Boton Arriba
const buttonTop = document.querySelector('#buttonTop');

window.onscroll = () => {
    if (document.documentElement.scrollTop > 100) {
        buttonTop.classList.add('shows')
    } else {
        buttonTop.classList.remove('shows')
    }
    buttonTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}


// Fetch data
// todo mejorar esta parte, sintaxis y llamadas

async function todos() {
    let data = [];
    await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => { data = json })

    // console.log(data);

    mostrarTodos(data);
}

todos();


function mostrarTodos(arr) {
    let contenedor = document.querySelector('.productos-contenedor');

    // evita el error donde no hay que cargar todos. 
    if (contenedor == null) return;


    arr.forEach(item => {
        const { id, title, price, description, image } = item;

        let element = document.createElement('div');
        element.classList = 'items';
        element.id = id;
        element.innerHTML =
            `
        <a href="../html/producto.html?id=${id}">
        <div class="img img1">

        <img
            src="${image}"
            alt="${title}"
        />
        </div>
        <div class="name">${title}</div>
        <div class="price">${price} €</div>
        <div class="info">${description}</div>
        </a>

        `
        contenedor.appendChild(element);

    })
}

// Menú - categorías
obtenerCategorías()

async function obtenerCategorías() {
    let data = [];
    let categoriasLocal = recuperarCategoriasLS();

    if (categoriasLocal) {
        console.log('obteniendo categorias del local storage')
        data = categoriasLocal;
    }
    else {
        console.log('haciendo fetch de categorias');
        await fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => { data = json });
        guardarCategoriasLS(data);
    }
    mostrarCategorías(data);
}

function mostrarCategorías(arr) {
    let categorias = document.querySelectorAll('.categorias-ul');
    categorias.forEach(_categoria => {
        arr.forEach((item, index) => {
            let element = document.createElement('li');
            element.innerHTML =
                `<a href="../html/categoria.html?cat=${item}">${item}</a>`
            _categoria.appendChild(element);
        })
    })
}

function guardarCategoriasLS(data) {
    localStorage.setItem('categorias', data);
}
function recuperarCategoriasLS() {
    try {
        return localStorage.getItem('categorias').split(',');
    } catch (error) {
        return null
    }
}
