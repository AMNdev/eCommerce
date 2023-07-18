let titulo = document.getElementById('titulo');
const categoriaUrl = window.location.search;
const urlParams = new URLSearchParams(categoriaUrl);

const esPaginaCarrito = window.location.pathname.includes('carrito');
//Verificar si existe el parámetro
const categoria = urlParams.get('cat');

if (!esPaginaCarrito) {
    
    // si fallan los parámetros, volver a inicio
    if (!urlParams.has('cat')) location.replace('../index.html')
    titulo.innerText = categoria;
}

getCategoria()

async function getCategoria() {
    let data = []

    await fetch(`https://fakestoreapi.com/products/category/${categoria}`)
        .then(res => res.json())
        .then(json => (data = json));

    let main = document.querySelector('.main');

    // evita el error donde no hay que cargar todos. 
    if (main == null) return;

    data.forEach(item => {
        let { id, title, price, description, image } = item;
        price = price.toFixed(2);

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
        main.appendChild(element);
    })

}




