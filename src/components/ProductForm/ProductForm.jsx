import { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import {
    saveProduct,
    getProducts,
    deleteProduct as removeProduct,
    updateProduct
} from "../../services/productService";

/**
 * Componente encargado de administrar el formulario de productos.
 *
 * Permite registrar nuevos productos, validar la información,
 * consultar los productos almacenados y eliminarlos cuando sea necesario.
 */
function ProductForm() {

    // Estados utilizados para controlar cada campo del formulario.
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productStock, setProductStock] = useState("");
    const [productDescription, setProductDescription] = useState("");

    // Estado donde se almacenan los productos recuperados desde LocalStorage.
    const [products, setProducts] = useState([]);

    // Estado utilizado para almacenar el texto escrito en el buscador.
    const [search, setSearch] = useState("");

    // Almacena el producto que se encuentra en edición.
    const [editingProduct, setEditingProduct] = useState(null);

    /**
     * Obtiene los productos almacenados y actualiza
     * el estado para refrescar la interfaz.
     */
    function loadProducts() {
        setProducts(getProducts());
    }

    /**
     * Elimina un producto utilizando su ID y
     * vuelve a cargar la lista actualizada.
     *
     * @param {number} id Identificador del producto.
     */
    function handleDelete(id) {
        removeProduct(id);
        loadProducts();
    }

    // Carga la información del producto seleccionado en el formulario.
    function handleEdit(product) {
        setEditingProduct(product);

        setProductName(product.name);
        setProductCategory(product.category);
        setProductPrice(product.price);
        setProductStock(product.stock);
        setProductDescription(product.description);
    }

    // Carga automáticamente los productos cuando
    // el componente se renderiza por primera vez.
    useEffect(() => {
        loadProducts();
    }, []);

    /**
     * Procesa el envío del formulario.
     *
     * Valida la información ingresada, crea el objeto
     * producto, lo almacena y actualiza la lista.
     *
     * @param {Object} event Evento generado por el formulario.
     */
    function handleSubmit(event) {

        // Evita que el formulario recargue la página.
        event.preventDefault();

        // Si la validación falla se detiene el proceso.
        if (!validateForm()) {
            return;
        }

        // Crear el objeto producto a partir de los datos ingresados.
        const product = {
            id: editingProduct ? editingProduct.id : Date.now(),
            name: productName,
            category: productCategory,
            price: Number(productPrice),
            stock: Number(productStock),
            description: productDescription
        };

        // Si estamos editando, actualizamos el producto.
        // De lo contrario, registramos uno nuevo.
        if (editingProduct) {
            updateProduct(product);
        } else {
            saveProduct(product);
        }

        loadProducts();
        setEditingProduct(null);

        // Mostrar el producto registrado en consola para pruebas.
        console.log("Producto registrado:", product);

        // Reiniciar todos los campos del formulario.
        setProductName("");
        setProductCategory("");
        setProductPrice("");
        setProductStock("");
        setProductDescription("");

        setEditingProduct(null);
    }

    /**
     * Verifica que todos los campos del formulario
     * contengan información válida antes de guardar.
     *
     * @returns {boolean} Retorna true si la validación es correcta.
     */
    function validateForm() {

        if (productName.trim() === "") {
            alert("Debe ingresar el nombre del producto.");
            return false;
        }

        if (productCategory === "") {
            alert("Debe seleccionar una categoría.");
            return false;
        }

        if (Number(productPrice) <= 0) {
            alert("El precio debe ser mayor que cero.");
            return false;
        }

        if (Number(productStock) < 0 || productStock === null) {
            alert("El stock no puede ser negativo.");
            return false;
        }

        if (productDescription.trim().length < 10) {
            alert("La descripción debe tener al menos 10 caracteres.");
            return false;
        }

        return true;
    }

    // Filtra los productos por nombre o categoría según el texto ingresado.
    const filteredProducts = products.filter(product => {
        const searchText = search.toLowerCase();

        return (
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText)
        );
    });

    return (

        <section className="product-form">

            <h2>Registrar Producto</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Ingrese el nombre del producto"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="productCategory">
                        Categoría
                    </label>
                    <select
                        id="productCategory"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                    >

                        <option value="">
                            Seleccione una categoría
                        </option>

                        <option value="plants">
                            Plantas
                        </option>

                        <option value="coffee">
                            Café
                        </option>

                        <option value="chocolate">
                            Chocolate
                        </option>
                    </select>
                </div>

                <div>
                    <label htmlFor="productPrice">
                        Precio
                    </label>
                    <input
                        type="number"
                        id="productPrice"
                        placeholder="Ingrese el precio del producto"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="productStock">
                        Stock
                    </label>
                    <input
                        type="number"
                        id="productStock"
                        placeholder="Ingrese el stock del producto"
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="productDescription">
                        Descripción
                    </label>
                    <textarea
                        id="productDescription"
                        rows="4"
                        placeholder="Ingrese la descripción del producto"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </div>

                <button type="submit">
                    {editingProduct ? "Actualizar producto" : "Guardar producto"}
                </button>
            </form>

            <div className="search">
                <label htmlFor="searchProduct">
                    Buscar producto
                </label>

                <input
                    type="text"
                    id="searchProduct"
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <p className="total-products">
                Total de productos registrados: <strong>{products.length}</strong>  
            </p>

            {/* Componente encargado de mostrar los productos registrados */}
            <ProductList
                products={filteredProducts}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </section>
    );
}

export default ProductForm;