
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

  let { id, title, price, description, image, rating, category } = data;
  price = price.toFixed(2);

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
            <div class="add-carrito">
            <button onclick="agregarCarrito()" type="button" class="button">
              <span class="button__text">Add to cart</span>
              <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>
            </div>
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

    if (arrayUnico.length > 4) arrayUnico.length = 4;
    localStorage.setItem('vistos', JSON.stringify(arrayUnico))
  } else {
    console.log('primera vez LS');
    let arrayVistos = []
    arrayVistos.push(prod)
    localStorage.setItem('vistos', JSON.stringify(arrayVistos))
  }
}

function agregarCarrito() {
  let carrito = localStorage.getItem('carrito');
  let mensajeCarrito = '';

  if (!carrito) {
    let arrayCarrito = [id]
    localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
    mensajeCarrito = 'Cart created';

  } else {
    let arrayCarrito = JSON.parse(carrito)
    arrayCarrito.push(id)
    arrayCarrito = [...new Set(arrayCarrito)]
    localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
    mensajeCarrito = 'Successfully added'
  }

  swal(mensajeCarrito,
    {
      buttons: false,
      timer: 1500,
      icon: "success",
    },
  );

  badgeCarrito();
}
