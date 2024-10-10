import { useEffect, useState } from 'react';
import { PiSpinnerGapBold } from "react-icons/pi";
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth.jsx";

export default function LayoutPrivate() {

  const { auth, loading } = useAuth({});
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    // Simula el tiempo de carga de 3 segundos
    const timer = setTimeout(() => {
      setSpinner(false);
    }, 2000); // 2000 milisegundos = 2 segundos

    return () => clearTimeout(timer); // Limpiar el timeout al desmontar el componente
  }, []);

  if (loading || spinner) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PiSpinnerGapBold className="animate-spin text-4xl text-blue-600" />
        <span className="ml-2">Cargando...</span>
      </div>
    );
  };

  return (
    <>
      {auth?._id ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};