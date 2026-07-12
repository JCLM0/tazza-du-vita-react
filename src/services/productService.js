// ======================================================
// SERVICIO DE PRODUCTOS
// ======================================================
//
// Este archivo centraliza todas las operaciones relacionadas
// con el almacenamiento de productos.
//
// Actualmente se utiliza LocalStorage como base de datos,
// pero en el futuro podría reemplazarse por una API o una
// base de datos real sin necesidad de modificar los
// componentes de React.
//
// ======================================================

// Clave utilizada para almacenar los productos en LocalStorage.
const STORAGE_KEY = "products";

/**
 * Obtiene todos los productos almacenados.
 *
 * Si no existen productos registrados,
 * retorna un arreglo vacío.
 *
 * @returns {Array} Lista de productos.
 */
export function getProducts() {

    // Obtener la información almacenada.
    const products = localStorage.getItem(STORAGE_KEY);

    // Convertir el texto JSON en un arreglo de objetos.
    return products ? JSON.parse(products) : [];

}

/**
 * Guarda un nuevo producto en LocalStorage.
 *
 * @param {Object} product Información del producto.
 */
export function saveProduct(product) {

    // Obtener la lista actual de productos.
    const products = getProducts();

    // Agregar el nuevo producto al arreglo.
    products.push(product);

    // Guardar nuevamente toda la colección.
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
    );

}

/**
 * Elimina un producto utilizando su identificador.
 *
 * @param {number} id Identificador único del producto.
 */
export function deleteProduct(id) {

    // Obtener todos los productos almacenados.
    const products = getProducts();

    // Crear una nueva lista excluyendo el producto eliminado.
    const updatedProducts = products.filter(product => {
        return product.id !== id;
    });

    // Reemplazar la información almacenada por la lista actualizada.
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedProducts)
    );
}

/**
 * Actualiza un producto existente.
 *
 * @param {Object} updatedProduct
 */
export function updateProduct(updatedProduct) {
    const products = getProducts();

    const updatedProducts = products.map(product => {
        if (product.id === updatedProduct.id) {
            return updatedProduct;
        }

        return product;
    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedProducts)
    );
}