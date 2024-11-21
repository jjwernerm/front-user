import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";
import useAuth from "../hooks/useAuth.jsx"; // Hook personalizado para la autenticación.
import Header from '../components/Header.jsx';

export default function DeleteUser() {

  const [email, setEmail] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState({});

// Desestructuración del hook personalizado useAuth para acceder a las funciones auth, deleteUser y logOut.
const { auth, deleteUser, logOut } = useAuth({});

// Función para manejar el cambio de valor en el input de correo electrónico.
const handleEmailValue = (e) => {
  e.preventDefault();
  const value = e.target.value.toLowerCase(); // Convierte el valor ingresado a minúsculas.
  setEmail(value); // Actualiza el estado del correo con el valor ingresado.
};

// Función que maneja el envío del formulario cuando el usuario solicita eliminar su cuenta.
const handleSubmit = async e => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario.

  // Verifica si el correo ingresado coincide con el correo del usuario autenticado.
  if (auth.email === email) {

    // Si el correo es correcto, muestra el spinner indicando que se está procesando la solicitud.
    setSpinner(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula un retraso para la operación.
    setSpinner(false); // Detiene el spinner después del retraso.

    // Llama a la función deleteUser para eliminar la cuenta y guarda la respuesta en resData.
    const resData = await deleteUser();
    setMessage(resData); // Establece el mensaje de respuesta basado en el resultado de la operación.
    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos para mostrar el mensaje.

    // Llama a la función logOut para cerrar sesión después de eliminar la cuenta.
    await logOut();
    
  } else {

    // Si el correo no coincide, muestra un mensaje de error.
    setMessage({
      msg: 'El correo electrónico no coincide con el usuario a eliminar', // Mensaje de error.
      display: true, // Muestra el mensaje de error.
      error: true, // Indica que es un mensaje de error.
    });
    await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos antes de ocultar el mensaje de error.

  };

  // Restablece el estado del mensaje para ocultarlo después de un tiempo.
  setMessage({
    msg: '', // Vacía el mensaje.
    error: '', // Vacía el estado del error.
    display: false, // Oculta el mensaje.
  });

};

  return (

    <>

      <Header />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950">Eliminar Usuario</h1>
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

        <p className="mt-2 text-center text-sm italic bg-yellow-100 rounded-md">
          Haz clic en <NavLink
            to="/web-user"
            className=" font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            Regresar al Dashboard
          </NavLink> si no quieres eliminar tu usuario
        </p>

      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm p-4">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Escribe tu Correo Electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={handleEmailValue}
                className="block w-full rounded-md py-1.5 text-gray-900
                  shadow-sm pl-2 sm:text-sm sm:leading-6
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
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {spinner ? (
                <div className="flex items-center">
                  <PiSpinnerGapBold className="animate-spin h-5 w-5 text-white mr-2" />
                  Eliminando usuario...
                </div>
              ) : (
                'Confirmo Eliminar mi Usuario'
              )}
            </button>
          </div>

          <div className={message.display ? 'block' : 'hidden'}>
              <p
                className={`
            ${message.error ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}
            rounded-md p-2 text-center text-sm md:text-base 
          `}
              >
                {message.msg}
              </p>
            </div>

        </form>
        
      </div>

    </>

  );

};