let titulo = document.getElementById('titulo');

const categoriaUrl = window.location.search;
const urlParams = new URLSearchParams(categoriaUrl);

//Verificar si existe el parámetro
// si fallan los parámetros, volver a inicio
if (!urlParams.has('cat')) location.replace('../index.html')

const categoria = urlParams.get('cat');
titulo.innerText = categoria;



