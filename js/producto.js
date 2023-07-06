
const productoUrl = window.location.search;
const urlParams = new URLSearchParams(productoUrl);

//Verificar si existe el parámetro
// si fallan los parámetros, volver a inicio
if (!urlParams.has('id')) location.replace('../index.html')
const id = urlParams.get('id');

getProducto(id);

async function getProducto(_id) {
    let contenedor = document.querySelector('.contenedor');

    let data = [];

    await fetch(`https://fakestoreapi.com/products/${_id}`)
        .then(res => res.json())
        .then(json => { data = json })


    const { id, title, price, description, image, rating, category } = data;


    let element = document.createElement('div');
    element.classList = 'producto-card';
    element.id = id;
    element.innerHTML =
        `
            <div class="producto-img">
            <img
              class="producto-imagen"
              src="${image}"
              alt="${title}"
            />
          </div>
  
          <div class="producto-info">
            <h2 id="nombre">${title}</h2>
            <p id="categoria">${category}</p>
            <p id="precio">${price}€</p>
            <p id="descripcion">
              ${description}
            </p>
            <p id="rating">${rating.rate}&#9734;/${rating.count} ratings</p>
          </div>

        `
    contenedor.appendChild(element);
}

