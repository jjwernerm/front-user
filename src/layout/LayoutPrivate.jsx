// Importamos los hooks `useEffect` y `useState` de React, el icono de spinner, 
// y los componentes `Outlet` y `Navigate` de react-router-dom
import { useEffect, useState } from 'react';
import { PiSpinnerGapBold } from "react-icons/pi";  // Icono del spinner de carga
import { Outlet, Navigate } from 'react-router-dom';  // Outlet para renderizar rutas anidadas y Navigate para redirección
import useAuth from "../hooks/useAuth.jsx";  // Hook personalizado para acceder al estado de autenticación

// Definimos el componente funcional LayoutPrivate
export default function LayoutPrivate() {

  // Usamos el hook `useAuth` para obtener el estado de autenticación (auth) y la carga (loading)
  const { auth, loading } = useAuth({});

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

  
  // Si el usuario está autenticado (es decir, si auth?._id existe), se renderiza el componente <Outlet />, que representa el lugar donde se cargan las rutas hijas (páginas privadas). Si el usuario no está autenticado (es decir, si auth?._id no existe), el componente redirige al usuario a la página principal ("/") usando el componente <Navigate />.
  return (
    <>
      {auth?._id ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

// Este componente es un layout que se utiliza para las páginas privadas de la aplicación. Su función es verificar si el usuario está autenticado antes de permitirle acceder a las rutas protegidas. Si el usuario no está autenticado, lo redirige a la página de inicio. Si el usuario está autenticado y los datos se han cargado correctamente, el componente muestra las rutas hijas. Es útil para proteger rutas que solo deberían ser accesibles para usuarios que hayan iniciado sesión.