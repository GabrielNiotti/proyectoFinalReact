import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";
import logo from "../../../../public/images/logoCyberFull.jpeg";
import { Link } from "react-router-dom";
import Carrito from "../../Carrito/Carrito";
import { useCarrito } from "../../../context/CartContext";

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const { agregarCantidad } = useCarrito();
  const cantidadTotal = agregarCantidad();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  return (
    <div className={styles.contenedorHeader}>
      <img src={logo} alt="Logo de Cyberfull" className={styles.logo} />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h1 className={styles.titulo}> CyberFull</h1>
        <h2 className={styles.subtitulo}>Soluciones en Tecnología</h2>
        <br></br>
      </div>
      <button
        className={styles.menuIcon}
        onClick={toggleMenu}
        aria-label="Menú"
      >
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`${styles.menu} ${menuAbierto ? styles.menuActivo : ""}`}>
        <ul className={styles["lista-grid"]}>
          <li>
            <Link to="/" onClick={() => setMenuAbierto(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" onClick={() => setMenuAbierto(false)}>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/servicios" onClick={() => setMenuAbierto(false)}>
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/gestion" onClick={() => setMenuAbierto(false)}>
              Gestion de Producto
            </Link>
          </li>
          <li>
            <Link
              to="/carrito"
              onClick={() => setMenuAbierto(false)}
              className={styles["link-carrito"]}
            >
              Carrito 🛒 (
              {cantidadTotal > 0 && (
                <span className={styles.burbujaContador}>{cantidadTotal}</span>
              )}
              )
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
