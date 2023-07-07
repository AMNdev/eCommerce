
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
    .then(json => { data = json });

  guardarProductoLS(data);

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

function guardarProductoLS(prod) {
  let vistos = localStorage.getItem('vistos');

  if (vistos) {
    let arrayVistos = JSON.parse(vistos);
    arrayVistos.unshift(prod)

    let hash = {};
    let arrayUnico = arrayVistos.filter(objeto => hash[objeto.id] ? false : hash[objeto.id] = true);
    if (arrayUnico.length > 6) arrayUnico.length = 6;

    localStorage.setItem('vistos', JSON.stringify(arrayUnico))

  } else {
    console.log('primera vez LS');
    let arrayVistos = []
    arrayVistos.push(prod)
    localStorage.setItem('vistos', JSON.stringify(arrayVistos))
  }

}

