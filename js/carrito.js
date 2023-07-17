let resumenLista = document.querySelector('.resumen-lista');
let carritoLS = localStorage.getItem('carrito')
const arrayCarrito = JSON.parse(carritoLS)
let productosAlmacenados = []

const buscarProducto = async (id) => {

  const response = await fetch((`https://fakestoreapi.com/products/${id}`));
  const data = await response.json()
  return data;
}

// Itera todos los id y devuelve su info completa.
const obtenerProductos = async (productosArray) => {
  const peticiones = productosArray.map((id) => {
    // Función asíncrona que busca la info del producto.
    return buscarProducto(id)
      .then((a) => {
        return a
        // Regresa la info del producto.
      })
  })
  return Promise.all(peticiones)
  // Esperando que todas las peticiones se resuelvan.
}

obtenerProductos(arrayCarrito).then(res => {
  res.forEach(prod => {
    prod.cantidad = 1;
  })
  productosAlmacenados = res;
  mostrarProductosDom()
})

function mostrarProductosDom() {
  mostrarRelacion();
  mostrarResumen();
}

// recupera la relacion de productos almacenados en LS, vacía el elemento contenedor del DOM por si acaso y lo llena con la info de los productos del carrito
function mostrarRelacion() {
  let listado = document.querySelector('.relacion-productos');
  let totalProductosDom = document.querySelector('#totalProductosDom')

  // vaciarListado
  while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
  }

  productosAlmacenados.forEach(producto => {

    const { id, title, price, description, cantidad, image } = producto;
    let element = document.createElement('div');
    const total = price * cantidad;
    element.className = 'producto';
    element.id = 'producto-' + String(id);
    element.innerHTML =
      `<div class="imagen-producto">
        <img
          src="${image}"
          alt="${title}"
        />
      </div>

      <div class="info-producto">
        <div class="detalles">
          <div class="name">${title}</div>
          <div class="info">${description}</div>
        </div>
        <div class="numeros">
          <div class="price">${price}€</div>
          <input onchange="cantidades(${id},${price},value)" type="number" name="cantidad" value="${cantidad}" />
          <p>Total</p>
          <div class="total">${total}€</div>
          </div>
          </div>
          `
    listado.appendChild(element);
  })
  totalProductosDom.innerHTML = `${productosAlmacenados.length} productos`
}

// como la anterior, en el resumen de productos
function mostrarResumen() {
  // console.log('Mostrar resumen: Array de productos Almacenados', productosAlmacenados);

  let listado = document.querySelector('.resumen-lista');
  let totalFinal = document.querySelector('.total-final');
  let sumaTotal = 0;

  // vaciarListado
  while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
  }

  productosAlmacenados.forEach(producto => {
    let { id, title, price, cantidad } = producto;
    cantidad = +cantidad;
    price = +price;
    let element = document.createElement('div');
    const total = price * cantidad;
    sumaTotal += total;
    element.className = 'resumen-item';
    element.id = 'producto-' + String(id);
    element.innerHTML =
      `<div class="resumen-name">${title}</div>
      <div class="resumen-cantidad">${cantidad}</div>
      <div class="resumen-total">${total}€</div>`
    listado.appendChild(element);
  })

  totalFinal.innerHTML = `${sumaTotal} €`
}

// data binding, actualiza las cantidades de cada producto
function cantidades(id, price, value) {
  const idElemento = '#producto-' + id;
  const nuevoTotal = value * price;

  let listado = document.querySelector('.relacion-productos');
  let elementoCambiar = listado.querySelector(idElemento)
  let total = elementoCambiar.querySelector('.total')

  total.innerHTML = nuevoTotal + '€'

  if (value == 0) {
    console.log('eliminar este elemento');

    if (window.confirm('Seguro que desea eliminar este elemento?')) {
      console.log('eliminar de verdad');
      
      // con esto lo quito del dom
      elementoCambiar.parentElement.removeChild(elementoCambiar)
      
      // encontrarlo en el array productosAlmacenados
      let eliminar = productosAlmacenados.find((elemento, indice) => {
        return elemento.id == id
      })
      // lo elimino del array
      productosAlmacenados = productosAlmacenados.filter((item) => item !== eliminar)
      // guardo la relación en LS
      let paraGuardar = productosAlmacenados.map(item => item.id)
      localStorage.setItem('carrito', JSON.stringify(paraGuardar))
      badgeCarrito();
    } else {
      console.log('no elimino');
      mostrarRelacion();
    }

  } else {

    productosAlmacenados = productosAlmacenados.map(elemento => {
      if (elemento.id == id) {
        elemento.cantidad = value;
      }
      return elemento
    })
  }

  // console.log(productosAlmacenados);
  mostrarResumen();

}

// todo guardar los productosAlmacenados(lista de la compra con cantidades) en LS

// todo  añadir articulos al resumen y adaptar funcion cantidades para que lo actualice también.