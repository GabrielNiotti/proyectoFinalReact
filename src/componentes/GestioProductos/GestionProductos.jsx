import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import FormularioContainer from "../FormularioProducto/FormularioContainer";
import { collection, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore"; 
import styles from "./GestionProductos.module.css"

const Gestion = () => {
  const [productos, setProductos] = useState([]);
  
  const estadoInicialForm = {
    id: "",
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    stock: "",
    destacado: "",
    imagen: "",
  };

  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [productoAEditar, setProductoAEditar] = useState(null);

  // Cargar productos al inicio
  useEffect(() => {
    const cargarProductos = async () => {
      const productosRef = collection(db, "productos");
      const resp = await getDocs(productosRef);
      setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    cargarProductos();
  }, []);

  // Función eliminar
  const handleDelete = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de eliminar este producto?");
    if (confirmacion) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      setProductos(productos.filter((prod) => prod.id !== id));
      alert("El producto ha sido eliminado");
    }
  };

  // Al hacer clic en Editar
  const handleEditClick = (producto) => {
    setProductoAEditar(producto);
    setDatosForm({ ...producto }); 
  };

  // Al cancelar
  const handleCancelClick = () => {
    setProductoAEditar(null);
    setDatosForm(estadoInicialForm);
  };

  // 🌟 GUARDAR CAMBIOS EN FIRESTORE (CORREGIDO)
  const handleUpdate = async (e, productoProcesado) => {
    if (e) e.preventDefault(); 
    try {
      // Obtenemos la referencia exacta del documento con el ID de Firebase
      const docRef = doc(db, "productos", productoAEditar.id);
      
      // Separamos el ID para no meterlo dentro del cuerpo del documento en Firebase
      const { id, ...datosAEnviar } = productoProcesado; 

      // Guardamos en la base de datos de Firebase
      await updateDoc(docRef, datosAEnviar);

      // Actualizamos el estado local para que la UI cambie inmediatamente
      setProductos(productos.map((prod) => 
        prod.id === productoAEditar.id ? { ...prod, ...productoProcesado } : prod
      ));

      alert("¡Producto y foto actualizados con éxito!");
      setProductoAEditar(null); 
      setDatosForm(estadoInicialForm);
    } catch (error) {
      console.error("Error al actualizar en Firestore:", error);
      alert("Hubo un error al guardar los cambios en la base de datos.");
    }
  };

  return (
    <div className={styles.contenedorGestion}>
      <h2 className={styles.titulo}>Gestión de Productos</h2>
      <hr className={styles.separador} />
      
      <FormularioContainer 
        key={productoAEditar ? productoAEditar.id : "crear"}
        datosForm={datosForm}
        setDatosForm={setDatosForm}
        isEditing={!!productoAEditar}
        onUpdate={handleUpdate}
        onCancel={handleCancelClick}
        estadoInicialForm={estadoInicialForm}
      />
      
      <hr className={styles.separador} />
      <h3 className={styles.subtitulo}>Lista de Productos</h3>
      
      <ul className={styles.listaProductos}>
        {productos.map((prod) => (
          <li key={prod.id} className={styles.itemProducto}>
            <span className={styles.infoProducto}>
              {prod.nombre} — <strong>${prod.precio}</strong>
            </span>
            <div className={styles.acciones}>
              <button 
                onClick={() => handleEditClick(prod)} 
                className={styles.botonEditar}
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(prod.id)} 
                className={styles.botonEliminar}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gestion;
