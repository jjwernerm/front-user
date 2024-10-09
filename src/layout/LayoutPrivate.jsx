import { Outlet, Navigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth.jsx";

export default function LayoutPrivate() {

  const { auth, loading } = useAuth({});
  
  // Si está en estado de carga, muestra un indicador de carga
  if (loading) {
    return <div>Cargando...</div>;
  };

  // el componente espera hasta que loading sea false para determinar si debe mostrar el contenido privado o redirigir al usuario a la página de inicio. 
  // Una vez que se ha completado la carga, revisa si está autenticado
  return (
    <>
      { auth?._id ? <Outlet /> : <Navigate to="/" /> }
    </>
  );
};