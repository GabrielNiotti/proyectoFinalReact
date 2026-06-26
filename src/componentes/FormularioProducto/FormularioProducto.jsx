// En src/componentens/FormularioProducto/FormularioProducto
import React from "react";
import styles from "./FormularioProducto.module.css"

// Por ahora, es un componente súper simple. Solo muestra el HTML.
function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  loading,
}) {
  console.log(datosForm);

    return (
    // 🌟 Aplicamos la clase combinada del formulario
    <form className={styles.formulario} onSubmit={manejarEnvio}>
      <h3>Agregar Nuevo Producto</h3>
      
      <div>
        <label>1 - Id del Producto:</label>
        <input
          className={styles.input} // 🌟 Clase unificada aplicada
          type="number"
          placeholder="Ej: 1"
          name="id"
          value={datosForm.id}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>2 - Nombre del Producto:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>3 - Categoria:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Ej: Audio, Computacion..."
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>4 - Descripción:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Ej: Descripcion del producto"
          name="descripcion"
          value={datosForm.descripcion}
          onChange={manejarCambio}
        />
      </div>

       <div>
        <label>5 - Producto Destacado:</label>
        <select
          className={styles.input}
          name="destacado" 
          value={datosForm.destacado.toString()} 
          onChange={manejarCambio}
        >
          <option value="false">Falso (No)</option>
          <option value="true">Verdadero (Sí)</option>
        </select>
      </div>

      <div>
        <label>6 - Precio:</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 95"
          name="precio"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>7 - Stock:</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 5"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
        />
      </div>

      <div>
        <label>8 - Imagen:</label>
        <input
          className={styles.input}
          type="file"
          accept="image/*"
          onChange={manejarCambioImagen}
        />
      </div>

      {/* 🌟 Clase de CSS Modules del botón con soporte de carga */}
      <button 
        type="submit"
        disabled={loading}
        className={styles.btnGuardar}
      >
        {loading ? "Subiendo Producto..." : "Guardar Producto"}
      </button>
    </form>
  );
}

export default FormularioProducto;
