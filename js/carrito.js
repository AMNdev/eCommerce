let resumenLista = document.querySelector('.resumen-lista');
let carritoLS = localStorage.getItem('carrito')
const acciones = document.querySelector('.resumen-comprar');
const arrayCarrito = JSON.parse(carritoLS)
let productosAlmacenados = []


acciones.addEventListener('click', (e) => {
  const elementoClicado = e.target.classList.toString();
  if (!elementoClicado.includes('comprar-btn')) return;
  if (!elementoClicado.includes('eliminar')) comprar()
  else eliminarTodo()
});


const buscarProducto = async (id) => {

  const response = await fetch((`https://fakestoreapi.com/products/${id}`));
  const data = await response.json()
  return data;
}

// Itera todos los id y devuelve su info completa.
const obtenerProductos = async (productosArray) => {
  if (!productosArray) return
  try {
    const peticiones = productosArray.map((id) => {
      // Función asíncrona que busca la info del producto.
      return buscarProducto(id)
        .then((a) => {
          return a
          // Regresa la info del producto.
        })
    })
    return Promise.all(peticiones)
  } catch (error) {
    console.log(error);
  }

  // Esperando que todas las peticiones se resuelvan.
}

obtenerProductos(arrayCarrito).then(res => {
  try {
    res.forEach(prod => {
      prod.cantidad = 1;
    })
    productosAlmacenados = res;

  } catch (error) {

  }
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

    let { id, title, price, description, cantidad, image } = producto;
    price = price.toFixed(2);
    let element = document.createElement('div');
    const total = (price * cantidad).toFixed(2);
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
    price = +price.toFixed(2);
    let element = document.createElement('div');
    const total = (price * cantidad).toFixed(2);
    sumaTotal += +total;
    element.className = 'resumen-item';
    element.id = 'producto-' + String(id);
    element.innerHTML =
      `<div class="resumen-name">${title}</div>
      <div class="resumen-cantidad">${cantidad}</div>
      <div class="resumen-total">${total}€</div>`
    listado.appendChild(element);
  })

  sumaTotal = sumaTotal.toFixed(2);
  totalFinal.innerHTML = `${sumaTotal} €`
}

// data binding, actualiza las cantidades de cada producto
function cantidades(id, price, value) {
  const idElemento = '#producto-' + id;
  const nuevoTotal = (value * price).toFixed(2);

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

function comprar() {
  console.log('comprando');
  swal({
    title: "Thank you for reaching this point",
    text: '  ',

    buttons: false,
    timer: 1500,
    icon: "success",
  },
  );
}

function eliminarTodo() {
  swal({
    title: "Are you sure?",
    text: 'Are you sure you want to remove all products?',
    icon: "warning",
    buttons: {
      cancel: true,
      confirm: true,
    },
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("Empty cart", {
          buttons: false,
          icon: "success",
          timer: 2000,
        }).then(() => {
          localStorage.removeItem('carrito')
          window.location.replace('../index.html');
        });

      } else {
        swal("You can continue shopping");
      }
    })
}
