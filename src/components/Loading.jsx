// Importamos los hooks `useEffect` y `useState` de React, así como el icono de spinner
import { useEffect, useState } from 'react';
import { PiSpinnerGapBold } from "react-icons/pi";  // Icono del spinner de carga
import useAuth from "../hooks/useAuth.jsx";  // Hook personalizado para acceder al estado de autenticación

// Definimos el componente funcional Loading
export default function Loading() {

  // Usamos el hook `useAuth` para obtener el estado de carga (`loading`) desde el contexto de autenticación
  const { loading } = useAuth({});

  // Definimos un estado local `spinner` para controlar la visibilidad del spinner de carga
  const [spinner, setSpinner] = useState(true);

  // Usamos `useEffect` para simular un retraso de 2 segundos en la carga
  useEffect(() => {
    // Creamos un temporizador que cambia el estado `spinner` a `false` después de 2 segundos
    const timer = setTimeout(() => {
      setSpinner(false);
    }, 2000); // 2000 milisegundos = 2 segundos

    // Limpiamos el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);  // El efecto solo se ejecuta una vez después del primer renderizado

  // Si el estado `loading` del contexto o el estado `spinner` es `true`, mostramos el spinner de carga
  if (loading || spinner) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Icono de spinner que gira mientras la carga está activa */}
        <PiSpinnerGapBold className="animate-spin text-4xl text-blue-600" />
        <span className="ml-2">Cargando...</span>
      </div>
    );
  };

  // Si no estamos cargando, devolvemos un fragmento vacío, lo que significa que no se muestra nada
  return (
    <>
    </>
  );
};

// Este componente es útil para mejorar la UX, proporcionando un indicador visual de que algo se está cargando en segundo plano mientras se espera la respuesta del servidor.