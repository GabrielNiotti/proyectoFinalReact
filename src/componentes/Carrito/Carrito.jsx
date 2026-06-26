import React, { useState } from "react";
import { useCarrito } from "../../context/CartContext";
import styles from "./Carrito.module.css";
import { Link } from "react-router-dom";

function Carrito() {
  // 1. Contexto global
  const { carrito, eliminarCarrito, precioTotal, removerDelCarrito } =
    useCarrito();

  // 2. Estado local para los checkboxes
  const [seleccionados, setSeleccionados] = useState([]);

  // 3. Manejador de los checkboxes
  const handleCheckboxChange = (id) => {
    if (seleccionados.includes(String(id))) {
      setSeleccionados(seleccionados.filter((item) => item !== String(id)));
    } else {
      setSeleccionados([...seleccionados, String(id)]);
    }
  };

  // 4. Función de eliminación masiva

  const eliminarSeleccionados = () => {
    seleccionados.forEach((id) => {
      removerDelCarrito(id);
    });
    setSeleccionados([]);
  };

  // 5. ELIF CONDICIONAL DE CARRITO VACÍO (Debe ir AQUÍ, después de declarar todo)
  if (carrito.length === 0) {
    return (
      <div className={styles.contenedorCarrito}>
        <h1>Carrito Vacío</h1>
        <p>Agrega los productos que deseas comprar.</p>
        <Link to="/productos" className={styles.botonVolver}>
          <button className={styles.botonVolver}>Volver a los productos</button>
        </Link>
      </div>
    );
  }

  // 6. Estructura visual del componente activo
  return (
    <div className={styles.contenedorCarrito}>
      <h1>Carrito de Compras</h1>

      {/* El botón ahora lee perfectamente la función declarada arriba */}
      {seleccionados.length > 0 && (
        <div style={{ marginBottom: "15px" }}>
          <button
            onClick={eliminarSeleccionados}
            className={styles.botonVaciar}
            style={{ backgroundColor: "#d9534f" }}
          >
            Eliminar productos seleccionados ({seleccionados.length})
          </button>
        </div>
      )}

      <div className={styles.listaProductos}>
        {carrito.map((item) => (
          <div
            key={item.id}
            className={styles.itemCarrito}
            style={{ display: "flex", alignItems: "center", gap: "15px" }}
          >
            <input
              type="checkbox"
              checked={seleccionados.includes(String(item.id))}
              onChange={() => handleCheckboxChange(item.id)}
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
            />

            <div>
              <img
                src={item.imagen}
                alt={item.nombre}
                className={styles.imagenProducto}
              />
            </div>
            <div className={styles.detallesProducto}>
              <h4>{item.nombre}</h4>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio unitario: ${item.precio.toFixed(2)}</p>
              <p>Subtotal: ${(item.cantidad * item.precio).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className={styles.resumenCompra}>
        <h3>Total a pagar: ${precioTotal().toFixed(2)}</h3>
        <button onClick={eliminarCarrito} className={styles.botonVaciar}>
          Vaciar Carrito Completo
        </button>
        <Link
          to="/"
          className={styles.botonCheckout}
          onClick={() => {
            alert("Gracias por su compra");
            eliminarCarrito();
          }}
          className={styles.botonCheckout}
        >
          Finalizar la compra y Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default Carrito;
