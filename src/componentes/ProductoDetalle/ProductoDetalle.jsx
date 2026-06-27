import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductoDetalle.module.css";
import {
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import FormularioProducto from "../FormularioProducto/FormularioProducto";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [esEdicion, setEsEdicion] = useState(false);
  const [datosForm, setDatosForm] = useState({
    id: "",
    nombre: "",
    categoria: "",
    descripcion: "",
    destacado: false,
    precio: "",
    stock: "",
    imagen: null,
  });
  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    setCargando(true);

    const cargarProductoFirebase = async () => {
      try {
        const productosRef = collection(db, "productos");

        // Hacemos consultas en paralelo por tipo (Número y String) por seguridad de tipado
        const qNumero = query(productosRef, where("id", "==", Number(id)));
        const qString = query(productosRef, where("id", "==", String(id)));

        const [snapshotNum, snapshotStr] = await Promise.all([
          getDocs(qNumero),
          getDocs(qString),
        ]);

        // 👈 CORREGIDO: Extraemos explícitamente el PRIMER elemento de la lista (.docs[0])
        let primerDoc = null;
        if (!snapshotNum.empty) primerDoc = snapshotNum.docs[0];
        else if (!snapshotStr.empty) primerDoc = snapshotStr.docs[0];

        if (!primerDoc) {
          console.log("No se encontró el producto con ID manual:", id);
          setProducto(null);
          setCargando(false);
          return;
        }

        const dataProducto = primerDoc.data();
        const idDeFirestore = primerDoc.id; // ID alfanumérico real de Firebase (ej: 2lsEGdub...)

        const productoCompleto = {
          ...dataProducto,
          idFirestore: idDeFirestore,
        };

        setProducto(productoCompleto);

        setDatosForm({
          id: dataProducto.id ?? "",
          nombre: dataProducto.nombre ?? "",
          categoria: dataProducto.categoria ?? "",
          descripcion: dataProducto.descripcion ?? "",
          destacado: dataProducto.destacado ?? false,
          precio: dataProducto.precio ?? "",
          stock: dataProducto.stock ?? "",
          imagen: dataProducto.imagen ?? null,
        });
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarProductoFirebase();
  }, [id]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosForm({
      ...datosForm,
      [name]: name === "destacado" ? value === "true" : value,
    });
  };

  const manejarCambioImagen = (e) => {
    setDatosForm({ ...datosForm, imagenArchivo: e.target.files });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setLoadingForm(true);

    try {
      // Apuntamos al documento exacto usando el id alfanumérico real de Firebase
      const docRef = doc(db, "productos", producto.idFirestore);

      const datosActualizados = {
        nombre: datosForm.nombre,
        categoria: datosForm.categoria,
        descripcion: datosForm.descripcion,
        destacado: datosForm.destacado,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
      };

      await updateDoc(docRef, datosActualizados);

      setProducto({
        ...producto,
        ...datosActualizados,
      });

      alert("¡Producto modificado con éxito!");
      setEsEdicion(false);
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      alert("No se pudieron guardar los cambios.");
    } finally {
      setLoadingForm(false);
    }
  };

  if (cargando) {
    return <h2>Cargando detalle del producto...</h2>;
  }
  if (!producto) {
    return <h2>El producto solicitado no existe.</h2>;
  }

  return (
    <div className={styles.contenedorDetalle}>
      <h2>Detalle de Edición</h2>

      {esEdicion ? (
        <div className={styles.contenedorEdicion}>
          <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            loading={loadingForm}
            esEdicion={true}
          />
          <button
            onClick={() => setEsEdicion(false)}
            className={styles.btnCancelar}
          >
            Cancelar Modificación
          </button>
        </div>
      ) : (
        <div className={styles.tarjetaDetalle}>
          {producto.imagen && (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className={styles.imagen}
            />
          )}
          <h3>{producto.nombre}</h3>
          <p className={styles.categoria}>Categoría: {producto.categoria}</p>
          <p className={styles.descripcion}>
            Descripción: {producto.descripcion}
          </p>
          <p className={styles.precio}>Precio: ${producto.precio}</p>
          <p className={styles.stock}>Stock disponible: {producto.stock}</p>

          <button
            onClick={() => setEsEdicion(true)}
            className={styles.btnEditar}
          >
            Modificar Datos del Producto
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductoDetalle;
