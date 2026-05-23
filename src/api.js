const BASE_URL = 'https://fakestoreapi.com';

// Función para traer todos los productos
export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json(); // Transforma la respuesta en un objeto leible
    return data;
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
  }
}

// Función para traer un solo producto usando su ID
export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener el producto ${id}:`, error.message);
  }
}

// Función para enviar datos y simular la creación de un producto
export async function createProduct(title, price, category) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        price: parseFloat(price),
        category,
        description: 'Agregado desde la terminal',
        image: 'https://i.pravatar.cc'
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear el producto:', error.message);
  }
}

// Función para simular que borrar un producto 
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al eliminar el producto ${id}:`, error.message);
  }
}