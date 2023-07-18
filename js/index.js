// Fetch data
// todo mejorar esta parte, sintaxis y llamadas
// ojo esta funcion se llama siempre siempre y eso ralentiza mucho
// pasar a archivo especifico de index.js
async function todos() {
    let data = [];
    await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => { data = json })

    mostrarTodos(data);
}

todos();


function mostrarTodos(arr) {
    let contenedor = document.querySelector('.productos-contenedor');
    // evita el error donde no hay que cargar todos. 
    if (contenedor == null) return;

    arr.forEach(item => {
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
        contenedor.appendChild(element);

    })
}
