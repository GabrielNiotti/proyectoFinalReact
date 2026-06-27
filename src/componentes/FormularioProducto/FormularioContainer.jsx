import React, { useState } from "react";
import FormularioProducto from "./FormularioProducto";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function FormularioContainer() {
  const [loading, setLoading] = useState(false);
  const [datosForm, setDatosForm] = useState({
    id: "",
    nombre: "",
    categoria: "",
    descripcion: "",
    destacado: false, // Inicializamos en falso booleano
    precio: "",
    stock: "",
  });

  // Nuevo estado para el archivo de imagen
  const [imagenFile, setImagenFile] = useState(null);

  const manejarCambio = (evento) => {
    const { name, value, type, checked } = evento.target;

    let valorProcesado = value;

    // 1. CONVERSIÓN A NÚMEROS (id, precio, stock)
    if (
      type === "number" ||
      name === "id" ||
      name === "precio" ||
      name === "stock"
    ) {
      valorProcesado = value === "" ? "" : Number(value);
    }

    // 2. CONVERSIÓN A BOOLEANO (destacado)
    if (name === "destacado") {
      // Si usás select evalúa el string, si usás checkbox usa el atributo checked
      valorProcesado = type === "checkbox" ? checked : value === "true";
    }

    setDatosForm({
      ...datosForm,
      [name]: valorProcesado,
    });
  };

  const manejarCambioImagen = (evento) => {
    // Guardamos el archivo binario real de la imagen
    if (evento.target.files && evento.target.files[0]) {
      setImagenFile(evento.target.files[0]);
    }
  };
//----------------------
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    let imagen = datosForm.imagen;

    if (!imagenFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }

    // Activamos el estado de carga
    setLoading(true);

    const apiKey = "680513a6746db9fd307b7f02ff71c43a";
    const formData = new FormData();
    formData.append("image", imagenFile);

    try {
      console.log("Subiendo imagen a Imgbb...");
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

        // Unimos la URL de la imagen con los datos del formulario ya convertidos
        const productoCompleto = {
          ...datosForm,
          imagen: datosImgbb.data.url,
        };

        console.log("Enviando los productos a Firebase:", productoCompleto);

        const db = getFirestore();
        const productosColeccion = collection(db, "productos");

        // Guardamos en Firestore
        await addDoc(productosColeccion, productoCompleto);

        alert("¡Producto guardado exitosamente en Firebase!");

        // Reseteamos el formulario y la imagen después de un envío exitoso
        setDatosForm({
          id: "",
          nombre: "",
          categoria: "",
          descripcion: "",
          destacado: false,
          precio: "",
          stock: "",
        });
        setImagenFile(null);
        evento.target.reset(); // Limpia el input de tipo file visualmente
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      alert(
        "Hubo un error al procesar el producto. Por favor, intentá de nuevo.",
      );
    } finally {
      // Desactivamos el loading pase lo que pase (éxito o error)
      setLoading(false);
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      loading={loading}
    />
  );
}

export default FormularioContainer;
