import React, { useState } from "react";
import styles from "./TarjetaProducto.module.css";
import { Contador } from "../../Contador/Contador";
import { Link } from "react-router-dom";
import { useCarrito } from "../../../context/CartContext"; 

function TarjetaProducto({ producto, esDestacado }) {
  const [esFavorito, setEsFavorito] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  
  const { agregarAlCarrito,agregarCantidadTotal } = useCarrito();
  const cantidadActualEnCarrito = agregarCantidadTotal(producto.id);
  const stockDisponible = producto?.stock ?? 0;

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  const handleAgregarAlCarrito = () => {
    if (cantidad === 0) {
      alert("Por favor, selecciona una cantidad mayor a 0.");
      return;
    }
    if (cantidad > stockDisponible) {
      alert(`No puedes agregar más de ${stockDisponible} unidades.`);
      return;
    }

    // 🚀 Enviamos los datos al contexto en español
    agregarAlCarrito(producto, cantidad);
    alert(`Producto ${producto?.nombre} agregado al carrito con cantidad: ${cantidad}`);
    setCantidad(0);
  };

  return (
    <div className={styles.tarjeta}>
      {esDestacado && <span className={styles.badgeOferta}>¡Oferta Especial!</span>}

      <button
        className={`${styles.botonFavorito} ${esFavorito ? styles.activo : ""}`}
        onClick={toggleFavorito}
        aria-label="Agregar a favoritos"
      >
        {esFavorito ? "⭐" : "☆"}
      </button>

      {/* 🛠️ CORREGIDO: Evita renderizar el atributo 'src' si la cadena está vacía */}
      {producto?.imagen && producto.imagen.trim() !== "" ? (
        <img src={producto.imagen} alt={producto?.nombre} className={styles.imagen} />
      ) : (
        <div className={styles.contenedorSinImagen}>
          <span className={styles.iconoSinImagen}>🖼️</span>
          <p>Sin imagen disponible</p>
        </div>
      )}

      <div className={styles.info}>
        <h3>{producto?.nombre}</h3>
        <p className={styles.precio}>${producto?.precio}</p>
        <p className={styles.stock}>Stock disponible: {stockDisponible}</p>
        <Link to={`/productos/${producto?.id}`} className={styles.enlaceDetalle}>
          Ver detalle
        </Link>
      </div>

      <div className={styles.acciones}>
        <Contador
          cantidad={cantidad}
          onIncrementar={() => setCantidad((prev) => (prev < stockDisponible ? prev + 1 : prev))}
          onDecrementar={() => setCantidad((prev) => (prev > 0 ? prev - 1 : 0))}
        />

        <button className={styles.botonAgregar} onClick={handleAgregarAlCarrito} disabled={stockDisponible === 0}>
          {stockDisponible === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
      <h5  className={styles.cantidadEnCarrito}>Cantidad en carrito: {cantidadActualEnCarrito}</h5>
    </div>
  );
}

export default TarjetaProducto;
