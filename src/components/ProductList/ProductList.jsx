/**
 * Componente encargado de mostrar la lista de productos
 * registrados en formato de tabla.
 *
 * @param {Object} props Propiedades recibidas por el componente.
 * @param {Array} props.products Lista de productos.
 * @param {Function} props.onDelete Función para eliminar un producto.
 */
function ProductList({ products, onDelete, onEdit }) {
    return (
        <section>
            <h2>Productos registrados</h2>

            {products.length === 0 ? (

            <p>No hay productos registrados.</p>

            ) : (

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>

                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>{product.stock}</td>

                            <td>
                                <button className="edit-btn" type="button" onClick={() => onEdit(product)}> Editar </button>
                            </td>

                            <td>
                                <button className="delete-btn" type="button" onClick={() => onDelete(product.id)}> Eliminar </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </section>
    );
}

export default ProductList;