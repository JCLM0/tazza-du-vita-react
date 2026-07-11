import ProductForm from "../components/ProductForm/ProductForm";

/**
 * Página principal del módulo de administración.
 *
 * Este componente actúa como contenedor del formulario
 * encargado de gestionar los productos de la aplicación.
 */
function AdminProducts() {

    return (
        <main>
            <h1>Gestión de Productos</h1>

            {/* Componente responsable del registro y administración de productos */}
            <ProductForm />
        </main>
    );
}

export default AdminProducts;