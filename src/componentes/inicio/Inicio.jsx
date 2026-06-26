import React from "react";
import Productos from "../Productos/Productos";
import styles from "./Inicio.module.css";

function Inicio() {
  return (
    <div className={styles.contenedorInicio}>
      <h1>¡Bienvenido a la Página de Inicio!</h1>
      <p>Aqui encontraras variedad de elemetos en tecnologia</p>
      
      <Productos Mensaje="Nuestras Ofertas" Destacados={true} />
    </div>
  );
}

export default Inicio;
