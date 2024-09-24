import { NavLink } from "react-router-dom";

import configAxios from '../config/axios.jsx';

export default function RecoverPasswordEmail() {

  return (

    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Olvidé mi Contraseña
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md py-1.5 text-gray-900
                  shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6
                  border-0 outline-none
                  ring-1 ring-inset ring-gray-300
                  hover:ring-1 hover:ring-inset hover:ring-blue-600
                  focus:ring-2 focus:ring-inset focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Recuperar Contraseña
              </button>
            </div>
          </form>

          <div className="flex justify-around">
            <p className="mt-10 text-center text-sm">
              <NavLink
                to="/"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Iniciar Sesión
              </NavLink>
            </p>
            <p className="mt-10 text-center text-sm">
              <NavLink
                to="/create"
                className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
              >
                Crear Cuenta
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>

  );

};