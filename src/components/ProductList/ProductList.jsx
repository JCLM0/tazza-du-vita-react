/**
 * Componente encargado de mostrar la lista de productos
 * registrados en formato de tabla.
 *
 * @param {Object} props Propiedades recibidas por el componente.
 * @param {Array} props.products Lista de productos.
 * @param {Function} props.onDelete Función para eliminar un producto.
 */
function ProductList({ products, onDelete }) {
    return (
        <section>
            <h2>Productos registrados</h2>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Recorrer todos los productos para generar cada fila de la tabla */}
                    {products.map(product => (

                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button onClick={() => onDelete(product.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default ProductList;