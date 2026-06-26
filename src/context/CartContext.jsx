import { useState, createContext, useContext } from "react";

export const CartContext = createContext();

export const useCarrito = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCarrito debe ser utilizado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    const productoExistente = carrito.find(
      (item) => String(item.id) === String(producto.id),
    );
    if (productoExistente) {
      const nuevoCarrito = carrito.map((item) =>
        String(item.id) === String(producto.id)
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item,
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito((prevCarrito) => [...prevCarrito, { ...producto, cantidad }]);
    }
  };
  const eliminarCarrito = () => {
    setCarrito([]);
  };

  const agregarCantidad = () => {
    return carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  };

  const precioTotal = () => {
    return carrito.reduce(
      (acumulador, item) => acumulador + item.cantidad * item.precio,
      0,
    );
  };
// para recordar cuantos poroductos tenemos cargados
  const agregarCantidadTotal = (productoId) => {
    const producto = carrito.find(
      (item) => String(item.id) === String(productoId),
    );
    return producto ? producto.cantidad : 0;
  };

  const removerDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter(
      (item) => String(item.id) != String(productoId),
    );
    setCarrito(nuevoCarrito);
  };

  const verificarProductoEnCarrito = (productoId) => {
    return carrito.some((item) => String(item.id) === String(productoId));
  };
  const restarCantidad = (productoId) => {
    const productoExistente = carrito.find(
      (item) => String(item.id) === String(productoId),
    );
    
     if (productoExistente) {
    if (productoExistente.cantidad > 1) {
      // Si hay más de 1, restamos una unidad
      const nuevoCarrito = carrito.map((item) =>
        String(item.id) === String(productoId)
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      // Si queda solo 1 unidad, eliminamos el producto completo
      const nuevoCarrito = carrito.filter(item => String(item.id) !== String(productoId));
      setCarrito(nuevoCarrito);
    }
  }
};

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarCarrito,
        agregarCantidad,
        agregarCantidadTotal,
        precioTotal,
        removerDelCarrito,
        verificarProductoEnCarrito,
        restarCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
