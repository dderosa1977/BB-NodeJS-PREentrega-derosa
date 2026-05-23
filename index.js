import { getAllProducts, getProductById, createProduct, deleteProduct } from './src/api.js';

// process.argv captura lo escrito en terminal.
// Descartamos los primeros 2 elementos porque son rutas internas de Node.
const [, , method, resource, ...args] = process.argv;

async function main() {
  // chequeo de parámetros:
  if (!method || !resource) {
    console.log('⚠️ Ingresar un comando válido. Ejemplo: npm run start GET products');
    return;
  }

  // Evaluamos el método (GET, POST o DELETE)
  switch (method.toUpperCase()) {
    
    case 'GET':
      // Si el recurso tiene una barra "/" (ej: products/15), busca un ID específico
      if (resource.includes('/')) {
        const [path, id] = resource.split('/');
        if (path === 'products' && id) {
          console.log(` Busca producto con ID: ${id}...`);
          const product = await getProductById(id);
          console.log(' Resultado:', product);
        } else {
          console.log('⚠️ Formato incorrecto. Usa: products/<id>');
        }
      } else if (resource === 'products') {
        // Si solo dice "products", trae todos
        console.log(' Obteniendo listado completo de productos...');
        const products = await getAllProducts();
        console.log(' Productos recibidos:', products);
      } else {
        console.log(' Recurso no reconocido. Intenta con "products"');
      }
      break;

    case 'POST':
      if (resource === 'products') {
        // Capturo el título, precio y categoría escrito en consola
        const [title, price, category] = args;
        if (!title || !price || !category) {
          console.log('⚠️ Faltan parámetros. Formato: npm run start POST products <title> <price> <category>');
          return;
        }
        console.log(`Creando nuevo producto: "${title}"...`);
        const newProduct = await createProduct(title, price, category);
        console.log('Respuesta de la API:', newProduct);
      } else {
        console.log('⚠️ El recurso para POST debe ser "products"');
      }
      break;

    case 'DELETE':
      if (resource.includes('/')) {
        const [path, id] = resource.split('/');
        if (path === 'products' && id) {
          console.log(`Eliminando producto con ID: ${id}...`);
          const deletedProduct = await deleteProduct(id);
          console.log('Eliminado con éxito. Datos del objeto borrado:', deletedProduct);
        } else {
          console.log('⚠️ Formato incorrecto. Usa: products/<id>');
        }
      } else {
        console.log('⚠️ Para eliminar debes especificar el id. Ejemplo: DELETE products/7');
      }
      break;

    default:
      console.log(` Método "${method}" no soportado o invalido.`);
  }
}

main();