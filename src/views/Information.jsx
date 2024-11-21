import { NavLink } from 'react-router-dom';
import useAuth from "../hooks/useAuth.jsx";
import Header from '../components/Header.jsx';

export default function Information() {

  const { auth } = useAuth({}); // Se extraen los datos de autenticación.

  return (

    <>
    
      <Header />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">Ver Datos</h1>
        </div>
      </header>

      <div className="mr-2 mt-2 text-sm md:text-base flex justify-end">
        <NavLink
          to="/web-user"
          className=" font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >
          Regresar al Dashboard
        </NavLink>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm p-4">

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Nombre
          </label>
          <p>{auth.name}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Correo Electrónico
          </label>
          <p>{auth.email}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
            Número de Teléfono
          </label>
          <p>{auth.phone}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Dirección
          </label>
          <p>{auth.address}</p>
        </div>

      </div>

    </>

  );

};