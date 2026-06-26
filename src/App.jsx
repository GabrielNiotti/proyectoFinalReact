import { Layout } from "./componentes/layout";
import "./App.css";
import Header from "./componentes/Layout/Header/Header";
import Footer from "./componentes/Layout/Footer/Footer";
import Productos from "./componentes/Productos/Productos";
import TarjetaProducto from "./componentes/Layout/TarjetaProducto/TarjetaProducto";
import FormularioContainer from "./componentes/FormularioProducto/FormularioContainer";
import { Routes, Route } from "react-router-dom";
import Inicio from "./componentes/inicio/Inicio";
import Servicios from "./componentes/Servicios/Servicios";
import ProductoDetalle from "./componentes/ProductoDetalle/ProductoDetalle";
import Carrito from "./componentes/Carrito/Carrito";
import ProductosDb from "./componentes/Productos/ProductosDb/ProductosDb";
import Gestion from "./componentes/GestioProductos/GestionProductos";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route 
        path="/" element={<Inicio />} />
        <Route
          path="/productos"
          element={<Productos Mensaje={"Nuestros productos"} Destacados={false} />} 
        />
        <Route
          path="/productosdb"
          element={<ProductosDb Mensaje={"Nuestros productos"} Destacados={false} />} 
        />


        <Route 
        path="/productos/:id" element={<ProductoDetalle />} />
        <Route
          path="/servicios"
          element={<Servicios Mensaje={"Nuestros Servicios"} />}
        />
        <Route 
        path="/gestion" element={<Gestion/>} />
        <Route path="/carrito" element={<Carrito />} />
      </Route>
      
    </Routes>
  );
}

export default App;
