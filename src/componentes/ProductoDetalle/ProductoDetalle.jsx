import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductoDetalle.module.css";
import { getDoc, doc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  /*useEffect(() => {
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.error('Error al cargar el producto:', error));
    }, [id]);*/
  useEffect(() => {
    /*setCargando(true);
    setError(null);

    //console.log("1.Buscando en Firebase el id de la URL", String(id));

    const docRef = collection(db, "productos");
    //const docRef = doc(db, "productos", )*/



    if(!id) return;
      //creamos la referencia al documento

      //para buscar por id de firestore
      //const docRef = doc(db, "productos", id ) //a doc le pasamos la referencia de base de datos db

      //buscar por id del producto

      const queryId = query(
        //creamos una referencia a la coleccion productos
        collection(db, "productos"),
        //solo los documentos cuyo campo id sea igual al valor recibido
        where("id", "==", Number(id))
      );


      //getDocs usa el query
        getDocs(queryId)
            .then((resp) => {
                if (resp.empty) {
                    console.log("No se encontró el producto");
                    return;
                }

                setProducto({
                    ...resp.docs[0].data(),
                    idFirestore: resp.docs[0].id
                });
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error);
            });
  }, [id]);

  if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    
return (
    <div className={styles.contenedorDetalle}>
      <h2>Detalle del Producto</h2>
      
      <div className={styles.tarjetaDetalle}>
        {producto.imagen && (
          <img 
            src={producto.urlImagen || producto.imagen} 
            alt={producto.nombre} 
            className={styles.imagen}
          />
        )}
        <h3>{producto.nombre}</h3>
        <p className={styles.categoria}>Categoría: {producto.categoria}</p>
        <p className={styles.descripcion}>
          Descripcion:{producto.descripcion}</p>
        <p className={styles.precio}>Precio: ${producto.precio}</p>
        <p className={styles.stock}>Stock disponible: {producto.stock}</p>
      </div>
    </div>
  );
};


    


export default ProductoDetalle;
